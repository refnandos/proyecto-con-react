import { Link } from "react-router-dom";

export const Header = ({children, show}) => {
  
  return (
    <header>
        {children}
        <h1>CasualGames</h1>
        <div className={show ? "auth-buttons hidden" : "auth-buttons"} >
        <button className ="btn-register"><Link to="/Register">REGISTRARSE</Link></button>
        <button className ="btn-login"><Link to="/Login">LOGIN</Link></button>
        </div>
    </header>
  )
}
