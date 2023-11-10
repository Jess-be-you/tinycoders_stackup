import { Box, Typography, styled } from "@mui/material";

const Image=styled(Box)`
    background:url('https://img.freepik.com/free-vector/computer-task-management-composition_1284-73039.jpg?w=1380&t=st=1699601216~exp=1699601816~hmac=088e9698abcddb2dc444c074faa3c7a35eb2fc3672f473765a12cbe549ca6af9') center/55% repeat-x #000;
    width:100%;
    height:50vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;


const  Banner =()=>{
    return(
        <Box>
            <Heading>EVENTS</Heading>
            <SubHeading>TINYCODERS</SubHeading>
        </Box>
    );
}
export default Banner; 