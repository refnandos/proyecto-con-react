import "./snake.css";
import { useEffect, useRef, useState, useCallback } from 'react';

export const JuegoSnake = () => {
   const canvasRef = useRef(null);
   /*tamaño de la serpiente al empezar el juego */
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);

  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const cellSize = 20;
  const gridSize = 20;

  // Generar comida ALEATORIAMENTE
  const generarComida = useCallback(() => {

    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    
    // la comida aparecia sobre la serpiente a veces
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );

    //recursividad
    return isOnSnake ? generarComida() : newFood;
  }, [snake]);




  // SERPIENTE, REGLAS PARA PERDER Y AUMENTAR TAMAÑO  
  useEffect(() => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const moveSnake = () => {
      setSnake(prevSnake => {
          const head = { 
            x: prevSnake[0].x + (direction.x),
            y: prevSnake[0].y + (direction.y)
          };

        

        
        // limites mapa
        if (head.x >= gridSize || head.x < 0 || head.y >= gridSize || head.y < 0) {
          setGameOver(true);
          return prevSnake;
        }

        // morderse la cola
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }
        //... sirve para desempaquetar el arrar prevSnake
        const newSnake = new Array(prevSnake.length + 1);
        newSnake[0] = head;

        for (let i = 0; i < prevSnake.length; i++) {
          newSnake[i + 1] = prevSnake[i];
        }
        
        // comprueba si a comido algo, si no no aumenta tamaño
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 100);
          setFood(generarComida());

        } else {

          newSnake.pop();
        }

        return newSnake;
      });
    };

    

    // Bucle del juego
    const gameLoop = setInterval(moveSnake, 100);
    setDirection(nextDirection);
    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, generarComida]);

  // canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // actualizar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // comida 
    ctx.fillStyle = '#FF5252';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize/2,
      food.y * cellSize + cellSize/2,
      cellSize/2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Dibujar serpiente
    ctx.fillStyle = '#4CAF50';
    snake.forEach((segment, index) => {
      // Cabeza más oscura
      if (index === 0) ctx.fillStyle = '#388E3C';
      else ctx.fillStyle = '#4CAF50';
      
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      );
    });

  }, [snake, food]);

  // Controles con teclado
  useEffect(() => {
    console.log({direction});
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setNextDirection({ x: -1,y: 0});
          break;
        case 'ArrowRight':
          if (direction.x === 0) setNextDirection({ x: 1,y: 0});
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);


  // Reiniciar juego
  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]);
    setNextDirection({ x: 1, y: 0 });
    setFood(generarComida());
    setScore(0);
    setGameOver(false);
  };
  
/*Meter punteje en base de datos */
  useEffect(() => {
  if (gameOver) {
    const enviarResultado = async () => {
      try {
        const response = await fetch('https://localhost/ruta/guardar_partida.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario: 'nombre_de_usuario',      // reemplázalo con el nombre del usuario real
            juego: 'snake',
            fecha: new Date().toISOString(),  // formato estándar
            puntuacion: score
          }),
        });

        const result = await response.json();
        console.log('Resultado guardado:', result);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    };

    enviarResultado();
  }
}, [gameOver]);

  return (
    <div className="juegoSerpiente" >
      <h1>Snake Game 🐍 | Puntuación: {score}</h1>
      <canvas className="tableroSerpiente" ref={canvasRef} width={400} height={400} />

      {/* BOTON PARA REINICIAR */}
      {gameOver && (
        <div style={{ marginTop: '20px' }}>
          <h2>¡Game Over!</h2>
          <button className="reiniciar" onClick={resetGame} > 
            Reiniciar Juego
          </button>
        </div>
      )}
      <div>
        <p>Controles: Teclas de flecha ↑ ↓ ← →</p>
      </div>
    </div>
  );
}
