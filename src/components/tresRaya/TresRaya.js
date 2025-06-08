import { useState, useEffect } from 'react';


export const TresRaya = () => {

  const [id_usuario, setId_usuario] = useState('');
    const id_juego = 1;
    const [puntaje_partida, setPuntos] = useState(0);


    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('usuario'));
      if(user){ 
        setId_usuario(JSON.parse(localStorage.getItem('usuario')).id)
      };
    }, []);




  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [esJugadorX, setEsJugadorX] = useState(true);
  const [ganador, setGanador] = useState(null);


  //determinar el ganador

  const buscarGanador = () => {

    const ganadorCalculado = calcularGanador(tablero);

    if (ganadorCalculado) {
      if (ganadorCalculado === 'X') {
        setPuntos(puntaje_partida + 300);
      }
      setGanador(ganadorCalculado);
    }
  };



  // Función para calcular el ganador
  const calcularGanador = (cuadros) => {
    const lineasGanadoras = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let linea of lineasGanadoras) {
      const [a, b, c] = linea;
      if (cuadros[a] && cuadros[a] === cuadros[b] && cuadros[a] === cuadros[c]) {
        return cuadros[a]; 
      }
    }
    return null;
  };

  // detecta el click del jugador
  const manejarClic = (indice) => {
    buscarGanador();
    // Si ya está lleno o hay ganador, evita poner mas clicks
    if (tablero[indice] || ganador) return; 

    const nuevoTablero = [...tablero];
    nuevoTablero[indice] = esJugadorX ? 'X' : 'O';
    setTablero(nuevoTablero);
    setEsJugadorX(!esJugadorX);
    

  };

  // un bot para rellenar el resto de casillas, si fuera a turnos no puedo manejar el puntaje
  const jugadaComputadora = () => {
    buscarGanador();
    if (!esJugadorX && !ganador) {
      const cuadrosDisponibles = tablero
        .map((valor, indice) => (valor === null ? indice : null))
        .filter((val) => val !== null);

      if (cuadrosDisponibles.length > 0) {
        const indiceAleatorio = cuadrosDisponibles[Math.floor(Math.random() * cuadrosDisponibles.length)];
        setTimeout(() => {
          const nuevoTablero = [...tablero];
          nuevoTablero[indiceAleatorio] = 'O';
          setTablero(nuevoTablero);
          setEsJugadorX(true);
        }, 0); 
      }
    }
  };

  // lama a la jugada del bot
  useEffect(() => {
    if(!ganador){
      jugadaComputadora();
    }
  }, [esJugadorX, ganador]);


  useEffect(() => {
  if (ganador && (ganador !== 'X')) {
    
    const enviarResultado = async () => {
      try {
        const response = await fetch('http://localhost/backend/insertar/insertarPartidas.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_usuario, id_juego, puntaje_partida }), 
        
        });

        const result = await response.json();
        console.log("datos enviados a php?");
        console.log('Resultado guardado:', result);
      } catch (error) {
        console.log("error con datos enviados?");
        console.error('Error al enviar los datos:', error);
      }
    };

    enviarResultado();
  }
}, [ganador, tablero]);



  // Reiniciar el juego desde cero
  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null));
    setEsJugadorX(true);
    setPuntos(0);
    setGanador(null);
  };

  const Continuar = () => {
    setTablero(Array(9).fill(null));
    setEsJugadorX(true);
    setGanador(null);
  };




  // Crea el tablero, iba a ser un raya n pero se complico
  const renderizarCuadro = (indice) => {
    return (
      <button className="cuadro" onClick={() => manejarClic(indice)}>
        {tablero[indice]}
      </button>
    );
  };

  return (
    <div className="juego">
      <div>
        <div className="marcador">
          <p>Jugador X: {puntaje_partida}</p>
        </div>
        <div className="tablero">
          {Array(9).fill(null).map((_, indice) => (
            <div key={indice} className="fila">
              {renderizarCuadro(indice)}
            </div>
          ))}
        </div>
        <div className="estado">
          <div>
            {ganador ? `Ganador: ${ganador}` : `Turno: ${esJugadorX ? 'X (Jugador)' : 'O (Computadora)'}`}
          </div>
          <div>
          <button onClick={reiniciarJuego}>Reiniciar</button>
          </div>
          <div className={ganador === 'X' ? "" : "hidden"}>
          <button onClick={Continuar} >Continuar</button>
          </div>

        </div>
      </div>
    </div>
  );
};


