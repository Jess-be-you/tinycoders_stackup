import { Box, Typography, styled } from "@mui/material";

const Image=styled(Box)`
    background:url(https://img.freepik.com/free-vector/isometric-time-management-concept_23-2148832036.jpg?w=996&t=st=1699613800~exp=1699614400~hmac=03c5a75892a5c9f40dffe102b8b14b9ca07f56d066f5b44015d1eabbcc45a159) center/100% ;
    // opacity:0.7;
    width:100%;
    height:50vh;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color:white ;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 17px;
    color:white;
    // background: #FFFFFF;
`;


const  Banner =()=>{
    return(
        <Image>
            <Heading>EVENTO</Heading>
            <SubHeading>AN EVENT MANAGEMENT PLATFORM</SubHeading>
        </Image>
    );
}
export default Banner; 