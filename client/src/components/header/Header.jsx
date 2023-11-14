import {AppBar, Toolbar,Typography,styled} from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect,useState, useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

const Component=styled(AppBar)`
    background:#572ed1;
    color:#000;
`;
const Container=styled(Toolbar)`
    justify-content:center;
    & > a {
        padding:20px;
        color:#ffffff;
        text-decoration:none;
    }
`;

const Header =()=>{
    const {account}=useContext(DataContext);

    return(
        <Component>
            <Container>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/login'>Logout</Link>
                <div style={{position:'absolute',right:'2px',color:'white'}}>
                    <h4>Welcome {account.name} ! </h4>
                </div>
            </Container>
        </Component>
    )
}
export default Header;