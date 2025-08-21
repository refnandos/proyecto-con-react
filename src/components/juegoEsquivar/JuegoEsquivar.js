import { useEffect, useRef, useState } from 'react';


export const JuegoEsquivar = () => {

    const [id_usuario, setId_usuario] = useState('');
    const id_juego = 2;
    const [puntaje_partida, setPuntos] = useState(0);


    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('usuario'));
      if(user){ 
        setId_usuario(JSON.parse(localStorage.getItem('usuario')).id)
      };
    }, []);


const canvasRef = useRef(null);
  const jugadorRef = useRef({
    x: 50,
    y: 50,
    tamaño: 30,
    velocidad: 5,
  });

  const [gameOver, setGameOver] = useState(false);
  const [keysPressed, setKeysPressed] = useState({});
  const [puntaje, setPuntaje] = useState(0);
  const obstaculosRef = useRef([]);

  // Configuración de obstáculos
  const generarObstaculo = () => {
    const lado = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
    let x, y, velocidadX, velocidadY;

    const canvas = canvasRef.current;
    const tamañoObstaculo = 20;

    switch (lado) {
      case 0: // Arriba
        x = Math.random() * (canvas.width - tamañoObstaculo);
        y = -tamañoObstaculo;
        velocidadX = (Math.random() - 0.5) * 2; // Movimiento diagonal
        velocidadY = Math.random() * 2 + 1; // Hacia abajo
        break;
      case 1: // Derecha
        x = canvas.width;
        y = Math.random() * (canvas.height - tamañoObstaculo);
        velocidadX = -(Math.random() * 2 + 1); // Hacia izquierda
        velocidadY = (Math.random() - 0.5) * 2;
        break;
      case 2: // Abajo
        x = Math.random() * (canvas.width - tamañoObstaculo);
        y = canvas.height;
        velocidadX = (Math.random() - 0.5) * 2;
        velocidadY = -(Math.random() * 2 + 1); // Hacia arriba
        break;
      case 3: // Izquierda
        x = -tamañoObstaculo;
        y = Math.random() * (canvas.height - tamañoObstaculo);
        velocidadX = Math.random() * 2 + 1; // Hacia derecha
        velocidadY = (Math.random() - 0.5) * 2;
        break;
      default:
        break;
    }

    obstaculosRef.current.push({
      x,
      y,
      tamaño: tamañoObstaculo,
      velocidadX,
      velocidadY,
    });
  };

  // Dibujar obstáculos
  const dibujarObstaculos = (ctx) => {
    ctx.fillStyle = '#ff0000'; // Rojo
    obstaculosRef.current.forEach((obstaculo) => {
      ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.tamaño, obstaculo.tamaño);
    });
  };

  // Actualizar posición de obstáculos
  const actualizarObstaculos = () => {
    obstaculosRef.current = obstaculosRef.current.map((obstaculo) => ({
      ...obstaculo,
      x: obstaculo.x + obstaculo.velocidadX,
      y: obstaculo.y + obstaculo.velocidadY,
    }));

    // Eliminar obstáculos fuera del canvas
    obstaculosRef.current = obstaculosRef.current.filter(
      (obstaculo) =>
        obstaculo.x > -50 &&
        obstaculo.x < canvasRef.current.width + 50 &&
        obstaculo.y > -50 &&
        obstaculo.y < canvasRef.current.height + 50
    );
  };

  // Detectar colisiones
  const detectarColisiones = () => {
    const jugador = jugadorRef.current;
    const colision = obstaculosRef.current.some((obstaculo) => {
      return (
        jugador.x < obstaculo.x + obstaculo.tamaño &&
        jugador.x + jugador.tamaño > obstaculo.x &&
        jugador.y < obstaculo.y + obstaculo.tamaño &&
        jugador.y + jugador.tamaño > obstaculo.y
      );
    });

    if (colision) {
      setGameOver(true);
    }
  };

  // Bucle JUEGO
  useEffect(() => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frameCount = 0;

    const actualizarJuego = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      if (frameCount % 10 === 0) {
        setPuntaje((prev) => prev + 10);
        setPuntos ((prev) => prev + 10);
      }

      const jugador = jugadorRef.current;
      const { velocidad } = jugador;

      if (keysPressed['ArrowUp'] || keysPressed['w']) jugador.y -= velocidad;
      if (keysPressed['ArrowDown'] || keysPressed['s']) jugador.y += velocidad;
      if (keysPressed['ArrowLeft'] || keysPressed['a']) jugador.x -= velocidad;
      if (keysPressed['ArrowRight'] || keysPressed['d']) jugador.x += velocidad;

      jugador.x = Math.max(0, Math.min(canvas.width - jugador.tamaño, jugador.x));
      jugador.y = Math.max(0, Math.min(canvas.height - jugador.tamaño, jugador.y));
      

      // Generar obstáculos aleatorios
      if (Math.random() < 0.03) {
        generarObstaculo();
      }

      dibujarObstaculos(ctx);
      actualizarObstaculos();
      detectarColisiones();

      // Dibujar jugador
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(jugador.x, jugador.y, jugador.tamaño, jugador.tamaño);

      

      animationFrameId = requestAnimationFrame(actualizarJuego);
    };

    canvas.width = 600;
    canvas.height = 400;
    actualizarJuego();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameOver, keysPressed]);



  useEffect(() => {
  if (gameOver) {
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
}, [gameOver]);

  // Reiniciar juego
  const reiniciarJuego = () => {
    jugadorRef.current = { x: 50, y: 50, tamaño: 30, velocidad: 5 };
    obstaculosRef.current = [];
    setKeysPressed({});
    setPuntaje(0);  
    setGameOver(false);
  };

  // MOVIMIENTO  JUGADOR
  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
    setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

     return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver]);



  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Esquiva los Obstáculos</h1>
      <h2>Puntaje: {puntaje}</h2>
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid #000',
          background: '#111',
        }}
      />
      <p>Usa WASD o flechas para moverte.</p>
      {gameOver && (
        <div>
          <h2 style={{ color: 'red' }}>¡Game Over!</h2>
          <button onClick={reiniciarJuego}>Reiniciar</button>
        </div>
      )}
    </div>
  );

  }