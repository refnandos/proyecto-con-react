import { Link } from "react-router-dom";

export const Header = ({children}) => {

  return (
    <header>
        {children}
        <h1>CasualGame</h1>
        <div className ="auth-buttons">
        <button className ="btn-register"><Link to="/Register">REGISTRARSE</Link></button>
        <button className ="btn-login"><Link to="/Login">INICIAR</Link></button>
        </div>
    </header>
  )
}
