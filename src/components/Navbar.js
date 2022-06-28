import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme";
//import css
import "./Navbar.css"
// components
import Searchbar from "./Searchbar";

export default function Navbar ()
{
    const { color } = useTheme();

    return (
        <div className="navbar" style={ { background: color } }>
            <nav>
                <Link to="/" className="brand">
                    <h1>React Cooking Recipes</h1>
                </Link>
                <Searchbar />
                <Link to="/create">Create Recipe</Link>
            </nav>
        </div>
    );
}