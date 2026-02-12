import { useEffect, useState } from 'react';
import "./puntuacioneslateral.css";

export const PuntuacionesLaterl = () => {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPuntuaciones = async () => {
    try {
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

  useEffect(() => {
    fetchPuntuaciones();
  }, []);

  // Ordenar por puntuación descendente
  const puntuacionesOrdenadas = [...puntuaciones].sort(
    (a, b) => b.puntaje_partida - a.puntaje_partida
  );

  return (
    <div className="container_puntuaciones">
      <div className="tablaWrapper">
        <h2 className="titulo">Puntuaciones</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <table className="tabla">
            <thead>
              <tr>
                <th className="th">Jugador</th>
                <th className="th">Puntuación</th>
              </tr>
            </thead>
            <tbody>
              {puntuacionesOrdenadas.map((p, index) => (
                <tr key={index}>
                  <td className="td">{p.nombre_usuario}</td>
                  <td className="td">{p.puntaje_partida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

