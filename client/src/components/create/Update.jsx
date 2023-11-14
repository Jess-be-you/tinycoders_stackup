import React, { useState, useEffect, useContext } from 'react';
import { Box, styled,TextareaAutosize, FormControl,InputBase, Button} from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container=styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin:0
    }
}))
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}


const Update = () => {

    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const [post,setPost]=useState(initialPost);


    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();

    const url= post.picture ? post.picture : 'https://img.freepik.com/free-vector/business-conference-seminar-auditorium-hall-speaker-podium-giving-presentation-audience-seats-event-forum-convention-modern-center_575670-2280.jpg?size=626&ext=jpg&ga=GA1.1.1344234992.1699601063&semt=ais'

    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])


  

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    const updateBlogPost=async()=>{
        let response = await API.updatePost(post);
        if(response.isSuccess){
            navigate(`/details/${id}`);
        }
    }

  return (
    <Container>
        <Image src={url} alt='post' />

        <StyledFormControl>
        {/* <label htmlFor="fileInput">
            <Add fontSize="large" color='action' />
        </label>
        <input 
            type="file" 
            id="fileInput"
            style={{display:'none'}}
            onChange={(e) => setFile(e.target.files[0])}
        /> */}
        <InputTextField 
            placeholder="Title"
            value={post.title}
            name='title'
            onChange={(e)=>handleChange(e)}
        />
        <Button variant="contained" onClick={()=>updateBlogPost()} color="primary">Update</Button>
      
     
        </StyledFormControl>
        <Textarea  
          rowsMin={5}
          placeholder="Give A Brief Description Of Your Project"
          name='description'
          onChange={(e)=>handleChange(e)}
          value={post.description}
      />
    </Container>
  )
}

export default Update