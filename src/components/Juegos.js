import { Link } from "react-router-dom";
import serpiente from "./snake/serpienteimg/snakephoto.png";
import tresRaya from "./tresRaya/tresRayaimg/tres-raya.png";
import juegoesquivar from "./juegoEsquivar/juegoEsquivarimg/juegoEsquivar.png"
import tableroinicial from "./ajedrezreact/tableroInicialimg/tableroInicialimg.png";
import ContenedorChessordenado from "./ajedrezreactOrganizado/ajedrezReactOrganizadoimg/ajedrezReactOrganizadoimg.png";
import { useState } from 'react';
import { useEffect } from "react";

export const Juegos = () => {

  
const [islogged, setloged] = useState(false);

  useEffect(() => {
      const user = localStorage.getItem('usuario');
      if(user){ setloged(true)}
    }, []);


  return (
    <div className="contenedor-comun">
        <h1 className="juegos-titulo">Nuestros Juegos</h1>
        <div className="juegos-container">
          
          <div className="juego1">
          <Link to={islogged ? "/ContSnake" : "/Login"}>
            <div className="imagen">
              <img src={serpiente} alt="imgserpiente" />
            </div>
            <div className="texto">
              <p>Clasico juego de la serpiente, consigue la mayor cantidad de puntos posibles o haz que la serpiente ocupe todo el tablero sin que se muerda la cola</p>
            </div>
            <div >
              <button className="jugar">Jugar!</button>
            </div>
          </Link> 
          </div>

          <div className="juego2">
          <Link to={islogged ? "/ContTresRaya" : "/Login"}>
            <div className="imagen">
              <img src={tresRaya} alt="imgtresRaya" />
            </div>
            <div className="texto">
              <p>Un tres en raya en el que juugaras contra la maquina para conseguir una gran cantidad de puntos</p>
            </div>
            <div >
              <button className="jugar">Jugar!</button>
            </div>
            </Link> 
          </div>

          <div className="juego3">
            <Link to={islogged ? "/ContJuegoEsquivar" : "/Login"}>
              <div className="imagen">
                <img src={juegoesquivar} alt="imgjuegoEsquviar" />
              </div>
              <div className="texto">
                <p>Esquiva los obstaculos que llegan de todas las direcciones, el puntaje que consigues aumenta con el tiempo que te mantienes vivo.</p>
              </div>
              <div >
              <button className="jugar">Jugar!</button>
            </div>
            </Link>
          </div>
          
          <div className="juego3">
            <Link to={islogged ? "/Tableroinicial" : "/Login"}>
              <div className="imagen">
                <img src={tableroinicial} alt="tableroinicial" />
              </div>
              <div className="texto">
                <p>Esquiva los obstaculos que llegan de todas las direcciones, el puntaje que consigues aumenta con el tiempo que te mantienes vivo.</p>
              </div>
              <div >
              <button className="jugar">Jugar!</button>
            </div>
            </Link>
          </div>

          <div className="juego3">
            <Link to={islogged ? "/ContenedorChessordenado" : "/Login"}>
              <div className="imagen">
                <img src={ContenedorChessordenado} alt="ContenedorChessordenado" />
              </div>
              <div className="texto">
                <p>Esquiva los obstaculos que llegan de todas las direcciones, el puntaje que consigues aumenta con el tiempo que te mantienes vivo.</p>
              </div>
              <div >
              <button className="jugar">Jugar!</button>
            </div>
            </Link>
          </div>
          
          <div className="juego3">
            <Link to={islogged ? "/ContenedorChessComprender" : "/Login"}>
              <div className="imagen">
                <img src={juegoesquivar} alt="imgjuegoEsquviar" />
              </div>
              <div className="texto">
                <p>Esquiva los obstaculos que llegan de todas las direcciones, el puntaje que consigues aumenta con el tiempo que te mantienes vivo.</p>
              </div>
              <div >
              <button className="jugar">Jugar!</button>
            </div>
            </Link>
          </div>

        </div>  
    </div>
  )
}
