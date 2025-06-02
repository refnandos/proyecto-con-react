
export const Header = ({children}) => {

  return (
    <header>
        {children}
        <h1>CasualGame</h1>
        <div className ="auth-buttons">
        <button className ="btn-register">REGÍSTRATE</button>
        <button className ="btn-login">INICIAR</button>
        </div>
    </header>
  )
}
