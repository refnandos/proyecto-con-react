import {JuegoSnake} from "../snake/JuegoSnake";
import "../snake/snake.css";
import { PuntuacionesLaterl } from "../conectphp/PuntuacionesLaterl";


export const ContSnake = () => {
  return (
    <div className="contenedor-juego">
        <div className="juego-contenido">
        <JuegoSnake />
        </div>
        <div className="juego-puntuaciones">
        <PuntuacionesLaterl />
        </div>
    </div>
  )
}
