
import "./css/chessStyle.css";
import torreNegro from "./piezas/Torre-Negro.png";
import torreBlanco from "./piezas/Torre-Blanco.png";
import CaballoNegro from "./piezas/Caballo-Negro.png";
import CaballoBlanco from "./piezas/Caballo-Blanco.png";
import AlfilNegro from "./piezas/Alfil-Negro.png";
import AlfilBlanco from "./piezas/Alfil-Blanco.png";
import ReyNegro from "./piezas/Rey-Negro.png";
import ReyBlanco from "./piezas/Rey-Blanco.png";
import ReinaNegro from "./piezas/Reina-Negro.png";
import ReinaBlanco from "./piezas/Reina-Blanco.png";
import PeonNegro from "./piezas/Peon-Negro.png";
import PeonBlanco from "./piezas/Peon-Blanco.png";


export const Tablero = () => {
  return (
    <div className="Tablero">
        <div className="Cuadrado Blanco">
          <div className="coordenada rango textoBlanco">8</div>
          <div className="pieza torre" color="Blanco">
                <img src={torreBlanco} alt="torre" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Caballo" color="Blanco">
                <img src={CaballoBlanco} alt="Caballo" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Alfil" color="Blanco">
                <img src={AlfilBlanco} alt="Alfil" />
            </div>
        </div>
        <div className="Cuadrado Negro">
            <div className="pieza Rey" color="Blanco">
                <img src={ReyBlanco} alt="Rey" />
            </div>
          
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Reina" color="Blanco">
                <img src={ReinaBlanco} alt="Reina" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Alfil" color="Blanco">
                <img src={AlfilBlanco} alt="Alfil" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Caballo" color="Blanco">
                <img src={CaballoBlanco} alt="Caballo" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza torre" color="Blanco">
                <img src={torreBlanco} alt="torre" />
            </div>
        </div>



        <div className="Cuadrado Negro">
          <div className="coordenada rango textoNegro">7</div>
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonBlanco} alt="Peon" />
            </div>
        </div>



        <div className="Cuadrado Blanco">
          <div className="coordenada rango textoBlanco">6</div>
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>



        <div className="Cuadrado Negro">
          <div className="coordenada rango textoNegro">5</div>
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>



        <div className="Cuadrado Blanco">
          <div className="coordenada rango textoBlanco">4</div>
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>



        <div className="Cuadrado Negro">
          <div className="coordenada rango textoNegro">3</div>
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>
        <div className="Cuadrado Negro">
          
        </div>
        <div className="Cuadrado Blanco">
          
        </div>



        <div className="Cuadrado Blanco">
          <div className="coordenada rango textoBlanco">2</div>
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="pieza Peon" color="Blanco">
                <img src={PeonNegro} alt="Peon" />
            </div>
        </div>



        <div className="Cuadrado Negro">
            <div className="coordenada rango textoNegro">1</div>
          <div className="coordenada textoNegro">a</div>
          <div className="pieza torre" color="Blanco">
                <img src={torreNegro} alt="torre" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="coordenada textoBlanco">b</div>
          <div className="pieza Caballo" color="Blanco">
                <img src={CaballoNegro} alt="Caballo" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="coordenada textoNegro">c</div>
          <div className="pieza Alfil" color="Blanco">
                <img src={AlfilNegro} alt="Alfil" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="coordenada textoBlanco">d</div>
          <div className="pieza Rey" color="Blanco">
                <img src={ReyNegro} alt="Rey" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="coordenada textoNegro">e</div>
          <div className="pieza Reina" color="Blanco">
                <img src={ReinaNegro} alt="Reina" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="coordenada textoBlanco">f</div>
          <div className="pieza Alfil" color="Blanco">
                <img src={AlfilNegro} alt="Alfil" />
            </div>
        </div>
        <div className="Cuadrado Negro">
          <div className="coordenada textoNegro">g</div>
          <div className="pieza Caballo" color="Blanco">
                <img src={CaballoNegro} alt="Caballo" />
            </div>
        </div>
        <div className="Cuadrado Blanco">
          <div className="coordenada textoBlanco">h</div>
            
            <div className="pieza torre" color="Blanco">
                <img src={torreNegro} alt="torre" />
            </div>
        </div>
    </div>
  )
}
