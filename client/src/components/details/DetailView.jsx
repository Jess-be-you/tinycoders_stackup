import {Box, Typography,styled} from '@mui/material'
import { useParams,Link,useNavigate } from 'react-router-dom';
import { useEffect,useState, useContext } from 'react';
import { API } from '../../service/api';
import { Height } from '@mui/icons-material';
import { Edit,Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const Container=styled(Box)(({theme})=>({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin:0
    }
}))

const Image = styled('img')({
    padding: '10px',
    width: '98%',
    height: '50vh',
    objectFit: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the start (top)
  });
const Heading=styled(Typography)`
font-size: 40px;
font-weight: 600;
text-align: center;
word-break: break-word;
color: #333;
`;
const Description=styled(Typography)`
    word-break:break-word;
`;
const EditIcon=styled(Edit)`
    margin: 5 px;
    padding:5px;
    border: 1px solid #878787;
    border-radius:10px;

`;
const DeleteIcon=styled(Delete)`
    margin: 5 px;
    padding:5px;
    border: 1px solid #878787;
    border-radius:10px;

`;
const Author=styled(Box)`
    color:#878787;
    margin :20px 0;
    display:flex;
`;

const DetailView=()=>{
    
    const [post,setPost]=useState({});
    const {id}=useParams();
    const navigate=useNavigate();
    const {account}=useContext(DataContext);
    const url=post.picture? post.picture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkv81N-86R4H2H40vJYhZ9xgJ-L2nqaeyow&usqp=CAU';
    
    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    const deleteBlog=async(id)=>{
        let response= await API.deletePost(id);
        if(response.isSuccess){
            navigate('/');
        }
    }

    return(
        <Container>
            <Image src={url} alt="image" />
            <Typography style={{marginLeft:'auto'}}>Event posted on: {new Date(post.createdDate).toDateString()}</Typography>
            <Heading><Box component='span' style={ {fontWeight:600} }>{post.title}</Box></Heading>

            
            <Box style={{float:'right',padding:'30px'}}>
                {
                    account.username=== post.username &&
                    <div>
                        <Link to={`/update/${post._id}`}><EditIcon color='primary' style={{padding:'10px'}}/></Link>
                        <DeleteIcon onClick={()=>deleteBlog(post._id)} color='error' style={{padding:'10px'}} />
                    </div>
                }
            </Box>
            {/* <Box> */}
                <h2>Event Coordinator: <Box component='span' style={ {fontWeight:400} }>{post.username}</Box></h2>
            {/* </Box> */}
            <h3>Event Description </h3>
            <Description>{post.description}</Description>
        </Container>

    );
}
export default DetailView;