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

const Image=styled('img')({
    width:'65%',
    Height:'50vh',
    objectFit:'cover'
});
const Heading=styled(Typography)`
    font-size:38px;
    font-weight:600;
    text-align:center;
    margin:50px 0 10px 0;
    word-break:break-word;
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
    const account=useContext(DataContext);
    const url=post.picture? post.picture:'https://img.freepik.com/free-vector/happy-people-having-fun-rock-concert-flat-illustration_74855-5266.jpg?size=626&ext=jpg&ga=GA1.1.1687454602.1685034731&semt=ais';
    
    useEffect(()=>{
        const fetchData=async()=>{
            let response=await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[])

    const deleteBlog=async()=>{
        let response= await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/');
        }
    }

    return(
        <Container>
            <Image src={url} alt="image" />
            <Box style={{float:'right'}}>
                {
                    account.username=== post.uesername &&
                    <>
                        <Link to={`/update/${post._id}`}><EditIcon color='primary'/></Link>
                        <DeleteIcon onClick={()=>deleteBlog()} color='error'/>
                    </>
                }
                
            </Box>
            <Box>
                <Heading>Author: <Box component='span' style={ {fontWeight:600} }>{post.username}</Box></Heading>
                <Typography style={{marginLeft:'auto'}}>Event posted on: {new Date(post.createdDate).toDateString()}</Typography>
            </Box>
            <Typography>Event Description: </Typography>
            <Description>{post.description}</Description>
        </Container>

    );
}
export default DetailView;