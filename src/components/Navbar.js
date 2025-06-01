import logo from "../images/NavbarLogo.jpg";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export const Navbar = ({show}) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"} >
        <img src={logo} alt="Logo" className="logo" />
        <ul>
            <li>
                <Link to='/'><FaHome /> Home</Link>
            </li>
            <li>
                <Link to="/about"><IoPerson /> Sobre Nosotros</Link>
            </li>
            <li>
                <Link href="/">Contactanos</Link>
            </li>
        </ul>
    </div>
  )
}
