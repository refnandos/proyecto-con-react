import { Link } from "react-router-dom";
import serpiente from "./snake/serpienteimg/snakephoto.png";




export const Juegos = () => {
  return (
    <div className="contenedor-comun">
        <h1 className="juegos-titulo">Juegos Recomendados</h1>
        <div className="juegos-container">
          
          <Link to="/ContSnake">
          <div className="juego1">
            <img src={serpiente} alt="" />
            <p>Clasico juego de la serpiente, consigue la mayor cantidad de puntos posibles o haz que la serpiente ocupe todo el tablero sin que se muerda la cola</p>
            <button className="jugar">Jugar!</button>
          </div>
          </Link> 
          <div className="juego2">
              <img src="" alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis doloribus, dignissimos quas aliquam tenetur quidem nihil laboriosam quasi amet qui. Quam omnis saepe incidunt. Aliquid dolore corrupti porro laborum blanditiis.</p>
          </div>
          <div className="juego3">
              <img src="" alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis doloribus, dignissimos quas aliquam tenetur quidem nihil laboriosam quasi amet qui. Quam omnis saepe incidunt. Aliquid dolore corrupti porro laborum blanditiis.</p>
          </div>
          <div className="juego4">
              <img src="" alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis doloribus, dignissimos quas aliquam tenetur quidem nihil laboriosam quasi amet qui. Quam omnis saepe incidunt. Aliquid dolore corrupti porro laborum blanditiis.</p>
          </div>
        </div>  
    </div>
  )
}
