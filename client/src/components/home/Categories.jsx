import { Link } from "react-router-dom";
import { Button,Table,TableHead,TableRow,TableCell,TableBody ,styled} from "@mui/material";
import { categories } from "../../constants/data";

const StyledTable=styled(Table)`
    border: 1px solid rgba(224, 224, 224, 0.8);
`;
const StyleButton=styled(Button)`
    margin:15px;
    width:85%;
    background:#8860d1;
    color:#fff;
`;

const Categories=()=>{
    return(
        <>
            <Link to='/create' style={{textDecoration:'none'}} >
                <StyleButton variant="contained">Host an Event</StyleButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category=>(
                        <TableRow key={category.id}>
                        <TableCell>
                            {category.type}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    )
}
export default Categories;