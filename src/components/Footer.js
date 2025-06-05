//estilo de enlaces y enlaces funcionales
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

//usado para redirigir al usuario a otra pagina
import { useNavigate } from 'react-router-dom';

export const Footer = () => {

  
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('usuario');
      navigate('/login');
      window.location.reload();
    };




  return (
    <footer>
      <div className="lista-footer">
        <ul>
          <li>
              <Link to='/About'><FaHome />sobre nosotros</Link>
          </li>
          <li>
              <Link to="/Contact"><IoPerson />contactanos</Link>
          </li>
        </ul>
      </div>
      <div className="cerrar-sesion"> 
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

    </footer>
  )
}
