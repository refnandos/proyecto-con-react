//estilo de enlaces y enlaces funcionales
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

//usado para redirigir al usuario a otra pagina
import { useNavigate } from 'react-router-dom';

export const Footer = ({logged}) => {

  
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem('usuario');
      navigate('/login');
      window.location.reload();
    };




  return (
    <footer>
      <div className="lista-footer">
        <ul>
          <li>
              <Link to='/'><FaHome /> Menu principal</Link>
          </li>
        </ul>
      </div>
      <div className={!logged ? "cerrar-sesion hidden" : "cerrar-sesion"}> 
        <button onClick={logout}>Cerrar sesión</button>
      </div>

    </footer>
  )
}
