import logo from "../images/NavbarLogo.jpg";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export const Navbar = ({show}) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"} >
        <div className="contenido-sidenav">
            <img src={logo} alt="Logo" className="logo" />
            <ul>
                <li>
                    <Link to='/'><FaHome /> Home</Link>
                </li>
                <li>
                    <Link to="/about"><IoPerson /> Sobre Nosotros</Link>
                </li>
                <li>
                    <Link to="/Juegos">juegos</Link>
                </li>
                <li>
                    <Link to="/Puntuaciones">Tabla de puntuacion</Link>
                </li>
                <li>
                    <Link to="/Datosuser">Usuarios</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
