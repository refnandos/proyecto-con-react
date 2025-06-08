
import {Juegos} from "./Juegos";
import image from "./recursos/image.png";


export const Home = () => {

  return (
    
      <>
        
        <section className='main'>
          <div className="introduccion">
            <img src={image} alt="Home-Imagen"  />
              <div className="textoimg" >
              <div>
                  <h2>Bienvenido a la Zona de juegos para competir por puntajes en los diferentes juegos disponibles</h2>
              </div>
          </div>
          
</div>


        </section>
        <div className='main'>
          <Juegos/>
        </div>
      </>
  )
}
