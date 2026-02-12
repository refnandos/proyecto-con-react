import './App.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { useEffect } from "react";

/*componentes */
import { Juegos } from './components/Juegos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Datosuser } from './components/conectphp/Datosuser';
import { Puntuaciones } from './components/conectphp/Puntuaciones';

/* jUEGOS */
import { ContSnake } from './components/contenedorjuegos/ContSnake';
import { ContTresRaya } from './components/contenedorjuegos/ContTresRaya';
import { ContJuegoEsquivar } from "./components/contenedorjuegos/ContJuegoEsquivar";
import { Tableroinicial } from './components/ajedrezreact/Tableroinicial';
import { ChessBoard } from './components/ajedrezreactOrganizado/ChessBoard/ChessBoard';
import { ContenedorChessordenado } from './components/contenedorjuegos/ContenedorChessordenado';
import { ContenedorChessComprender } from './components/contenedorjuegos/ContenedorChessComprender';

/*consultas */
import Login from './components/login/Login';
import Register from './components/register/Register';


function App() {
  const [showNav, setShowNav] = useState(true);
  const [islogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) { setIsLoggedIn(true) } else { setIsLoggedIn(false) }
  }, []);


  return (
    <>

      <Router>

        <Header logged={islogged}>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        </Header>


        {/* <Sidebar /> */}
        <Navbar show={showNav} logged={islogged} />

        <div className='contenedor-comun'>
          {/* botones registro */}
          <Routes>
            <Route path='/Register' exact={true} Component={Register} />
            <Route path='/Login' exact={true} Component={Login} />


            {/* Sidebar links */}

            <Route path='/' exact={true} Component={Home} />
            <Route path='/Juegos' exact={true} Component={Juegos} />
            <Route path='/Puntuaciones' exact={true} Component={Puntuaciones} />
            <Route path='/Datosuser' exact={true} Component={Datosuser} />

            {/* contenedores juegos */}
            <Route path='/ContSnake' exact={true} Component={ContSnake} />
            <Route path='/ContTresRaya' exact={true} Component={ContTresRaya} />
            <Route path='/ContJuegoEsquivar' exact={true} Component={ContJuegoEsquivar} />
            <Route path='/Tableroinicial' exact={true} Component={Tableroinicial} />
            <Route path='/ContenedorChessordenado' exact={true} Component={ContenedorChessordenado} />
            <Route path='/ContenedorChessComprender' exact={true} Component={ContenedorChessComprender} />


            {/* Sidebar links */}

            <Route path='/' exact={true} Component={Home} />
          </Routes>
        </div>




        <Footer logged={islogged} />

      </Router>


    </>
  );
}

export default App;
