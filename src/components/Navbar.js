import logo from "../images/NavbarLogo.jpg";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export const Navbar = ({show, logged}) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"} >
        <div className="contenido-sidenav">
            <img src={logo} alt="Logo" className="logo" />
            <ul>
                <li>
                    <Link to='/'><FaHome /> Menu principal</Link>
                </li>

                <li className={!logged ? "hidden" : ""}>
                    <Link to="/Juegos">juegos</Link>
                </li>

                <li className={!logged ? "hidden" : ""}>
                    <Link to="/Puntuaciones">Tabla de puntuacion</Link>
                </li>
                <li className={!logged ? "hidden" : ""}>
                    <Link to="/Datosuser">Usuarios</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
