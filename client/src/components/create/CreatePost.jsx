import { Box, styled } from '@mui/material';

const container=styled(Box)`
    margin:50px 100px;
`

const Image=styled('img')`
    center/100% 
    width:100%;
    height:50vh;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:center;
`;


const CreatePost = () => {

    const url='https://img.freepik.com/free-vector/office-presentation-with-chart-board-flat-set_1284-49633.jpg?size=626&ext=jpg&ga=GA1.1.1344234992.1699601063&semt=ais'

  return (
    <container>
        <img src={url} alt='banner' />
    </container>
  )
}

export default CreatePost