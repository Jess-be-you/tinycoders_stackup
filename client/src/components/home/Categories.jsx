import { Link , useSearchParams} from "react-router-dom";
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories=()=>{

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return(
        <>
            <Link to={`/create?category=${category || ''}`} style={{textDecoration:'none'}} >
                <StyleButton variant="contained">Host an Event</StyleButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category=>(
                        <TableRow key={category.id}>
                        <TableCell>
                            <StyledLink to={`/?category=${category.type}`}>
                                {category.type}
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    )
}
export default Categories;