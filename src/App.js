
import './App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import { useEffect } from "react";

/*componentes */
import { Juegos } from './components/Juegos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Datosuser } from './components/conectphp/Datosuser';
import { Puntuaciones } from './components/conectphp/Puntuaciones';
import { ContSnake } from './components/contenedorjuegos/ContSnake';
/*consultas */
import Login from './components/login/Login';
import Register from './components/register/Register';


function App() {
  const [showNav, setShowNav] = useState(true);
  const [islogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if(user){ setIsLoggedIn(true)}else{setIsLoggedIn(false)}
  }, []);


  return (
    <>
      
      <Router>

        <Header show={islogged}>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        </Header>

        
        


        {/* <Sidebar /> */}
        <Navbar show={showNav} />

        <div className='contenedor-comun'>
        {/* botones registro */}
        <Routes>
            <Route path='/Register' exact={true} Component={Register} />
            <Route path='/Login' exact={true} Component={Login} />
        

        {/* Sidebar links */}
          
              <Route path='/' exact={true} Component={Home} />
              <Route path='/about' exact={true} Component={About} />
              <Route path='/Juegos' exact={true} Component={Juegos} />
              <Route path='/Puntuaciones' exact={true} Component={Puntuaciones} />
              <Route path='/Datosuser' exact={true} Component={Datosuser} />
              <Route path='/ContSnake' exact={true} Component={ContSnake} />
          

        {/* Sidebar links */}
        
            <Route path='/about' exact={true} Component={About} />
            <Route path='/Contact' exact={true} Component={Contact} />
        </Routes>
        </div>




        <Footer/>

      </Router>


    </>
  );
}

export default App;
