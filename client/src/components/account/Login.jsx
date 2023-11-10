import {useState,useEffect , useContext} from "react";
import {Box,TextField,Button,styled,Typography} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import logo from '../../assets/logo.png'
import { API } from "../../service/api";
const Component=styled(Box)`
    width: 400px;
    margin:auto;
    box-shadow:5px 2px 7px 2px rgb(0 0 0/0.6);

`;
const Image=styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding:'50px 0 20px 0 '
});

const Wrapper=styled(Box)`
    padding:10px 35px;
    display:flex;
    flex:1;
    flex-direction:column;   
    & >div, & > button, & > p{
        margin-top:10px
    }
`;

const LoginButton=styled(Button)`
    text-transform:none;
    background:#fb6418;
    height:48px;
    border-radius:2px;
`;

const SignupButton=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#fb6418;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`;
const Text=styled(Typography)`
    color:#878787;
    font-size:16px;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};
const Login=(isUserAuthenticated)=>{

    const [login, setLogin] = useState(loginInitialValues);
    const[account,toggleAccount]=useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const navigate=useNavigate();
    
    useEffect(() => {
        showError(false);
    }, [login])

    const {setAccount} = useState(DataContext)

    const toggleSignup=()=>{
        toggleAccount(!account);
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }

    const signupUser=async()=>{
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            console.log("success");
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const loginUser=async()=>{
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    return(
        <Component>
        <Box>
            <Image src= {logo} alt="image" />
            <h1 style={{textAlign:'center'}}>EVENTO</h1>
            {account===true?
            <Wrapper> 
                <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name='username' label="Enter username"/>
                <TextField variant="standard" values={login.password} onChange={(e)=>onValueChange(e)} name='password' label="Enter password"/>

                {error && <Error>{error}</Error>}

                <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton> 
                <Text style={{textAlign:'center'}}>OR</Text>
                <SignupButton onClick={()=>toggleSignup()}>Create an account</SignupButton>
            </Wrapper>
            :
            <Wrapper> 
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter Username"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter password"/>
                
                {error && <Error>{error}</Error>}
                <SignupButton onClick={()=>{signupUser()}}>Signup</SignupButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account?</LoginButton> 
            </Wrapper>
            }
        </Box>
        </Component>
    )
}
export default Login;

// setAccount({username:response.data.username,name:response.data.name}) in login user
// isUserAuthenticated(true);
//navigate('/'); in login user