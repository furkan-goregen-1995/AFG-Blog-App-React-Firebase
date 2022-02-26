import { Link } from "react-router-dom";
import './Navbar.css';
import SearchBar from "./SearchBar";
import {useTheme} from "../hooks/useTheme";

export default function Navbar() {
    const {bgColor} = useTheme();
    return (
        <div className="navbar" style={{background: bgColor}} > 
            <nav>
            <Link to="/AFG-Blog-App-React-Firebase" className="brand">
                <h1>AFG Blog</h1>
            </Link>
            <SearchBar/>
            <Link to="/AFG-Blog-App-React-Firebase/create">
                Yeni Yazı
            </Link>
            </nav>
        </div>
    )
}