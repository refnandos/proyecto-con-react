import { useState, useEffect } from 'react';
import './puntuaciones.css';

export const Puntuaciones = () => {

  const [puntuaciones, setPuntuaciones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    //Todos, Tres en Raya, Buscaminas, Snake, Ajedrez
  const [juegoSeleccionado, setJuegoSeleccionado] = useState('Todos');

    // 'ascendente' o 'descendiente'
  const [orden, setOrden] = useState('desc'); 


  useEffect(() => {

    // conseguir datos de la base de datos usando fetch
    const fetchPuntuaciones = async () => {
      try {
        // const response = await fetch('http://localhost/backend/archivos/puntuaciones.php');
        const response = await fetch('http://localhost/backend/archivos/puntuaciones.php');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al cargar puntuaciones');
        }

        setPuntuaciones(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };



    fetchPuntuaciones();
  }, []);

  //Filtros para mostrar un juego en especifico en la tabla
  const juegos = ['Todos', 'Tres en Raya', 'Buscaminas', 'Snake', 'Ajedrez'];
  const puntuacionesFiltradas = juegoSeleccionado === 'Todos' ? puntuaciones 
    : 
    puntuaciones.filter(p => p.nombre_juego === juegoSeleccionado);


    //Ordena la puntuacion dependiendo de la constante orden
    //los tres puntos son importantes para tambien tomar en cuenta los filtros de juegos
  const puntuacionesOrdenadas = [...puntuacionesFiltradas].sort((a, b) => {
    return orden === 'desc' ? b.puntaje_partida - a.puntaje_partida 
      :
       a.puntaje_partida - b.puntaje_partida;
  });

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    
    <div className="contenedor-puntuaciones">
      <h1>Puntuaciones de Jugadores</h1>

        <div className="filtros">

            <select value={juegoSeleccionado} onChange={(e) => setJuegoSeleccionado(e.target.value)}>
                {juegos.map(juego => (
                    <option key={juego} value={juego}>{juego}</option>
                ))}
            </select>

                {/* para no confundirte, si, el set orden podia usar tru o false pero quedaba mejor con asc y desc, ademas fue una comida de cabeza, la linea de onclick funciona como un interruptor, el valor cambia cada vez que se le de click  */}
            <button onClick={() => setOrden(orden === 'desc' ? 'asc' : 'desc')}>
                Orden: {orden === 'desc' ? 'Mayor a Menor' : 'Menor a Mayor'}
            </button>

            
        </div>

      <table className="tabla-puntuaciones">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Juego</th>
            <th>Puntuación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {puntuacionesOrdenadas.map((puntuacion, index) => (
            <tr key={index}>
              <td>{puntuacion.nombre_usuario}</td>
              <td>{puntuacion.nombre_juego}</td>
              <td>{puntuacion.puntaje_partida}</td>
              <td>{new Date(puntuacion.fecha_partida).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
