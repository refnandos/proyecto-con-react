// import { useState } from 'react';
// import { ChessSquare } from './ChessSquare';
// import { 
//     initialBoardSetup, 
//     initialGameState, 
//     resetGame 
// } from '../GameLogic/gameSetup'; // Importaciones agregadas
// import { handleSquareDrop, handlePieceDragStart } from '../GameLogic/moveLogic';
// import { GameStatus } from '../GameControls/GameStatus';

// export const ChessBoard = () => {
//     const [boardState, setBoardState] = useState(initialBoardSetup());
//     const [gameState, setGameState] = useState(initialGameState()); // Ahora funciona

//     // Función para reiniciar el juego
//     const handleResetGame = () => {
//         const { board, gameState: newGameState } = resetGame();
//         setBoardState(board);
//         setGameState(newGameState);
//     };




//     const renderSquare = (square, index) => (
//         <ChessSquare
//             key={square.squareId}
//             square={square}
//             index={index}
//             gameState={gameState}
//             onDrop={(e) => handleSquareDrop(e, gameState, setGameState, setBoardState)}
//             onDragStart={(e) => handlePieceDragStart(e, square.squareId, gameState, setGameState, boardState)}
//         />
//     );

//     return (
//         <div className="chess-container">
//             <GameStatus 
//                 gameState={gameState} 
//                 onResetGame={handleResetGame} 
//             />
//             <div className={`chess-board ${gameState.gameStatus !== 'playing' ? 'game-over' : ''}`}>
//                 {boardState.map((square, index) => renderSquare(square, index))}
//             </div>
//         </div>
//     );
// };

// segunda version
// import { useState } from 'react';
// import { initialBoardSetup } from '../GameLogic/gameSetup';
// import { movePiece, handlePieceDragStart, getPieceAtSquare } from '../GameLogic/moveLogic';
// import {ChessSquare} from './ChessSquare';
// import {GameStatus} from '../GameControls/GameStatus';

// export const ChessBoard = () => {
//     const [boardState, setBoardState] = useState(initialBoardSetup());
//     const [isWhiteTurn, setIsWhiteTurn] = useState(true);
//     const [selectedPiece, setSelectedPiece] = useState(null);
//     const [validMoves, setValidMoves] = useState([]);
//     const [gameState, setGameState] = useState({
//         isWhiteTurn: true,
//         gameStatus: 'playing',
//         kingInCheck: { white: false, black: false }
//     });


//   // Manejador de drag start
//   const handleDragStart = (e, squareId) => {
//     const canDrag = handlePieceDragStart(e, squareId, boardState, isWhiteTurn);
//     if (canDrag) {
//       // Calcular movimientos válidos aquí si es necesario
//       setSelectedPiece(getPieceAtSquare(squareId, boardState));
//     } else {
//       e.preventDefault();
//     }
//   };

//   // Manejador de drop
//   const handleDrop = (e, destinationSquareId) => {
//     e.preventDefault();
//     const startingSquareId = e.dataTransfer.getData("text/plain");

//     if (validMoves.includes(destinationSquareId)) {
//       const newBoard = movePiece(startingSquareId, destinationSquareId, boardState);
//       setBoardState(newBoard);
//       setIsWhiteTurn(!isWhiteTurn);
//     }

//     setSelectedPiece(null);
//     setValidMoves([]);
//   };

//   // Renderizado
//   return (
//     <div className="chess-container">
//       <GameStatus 
//         gameState={gameState}
//         onResetGame={() => {
//           setBoardState(initialBoardSetup());
//           setIsWhiteTurn(true);
//           setGameState('playing');
//         }}/>
//       <div className="chess-board">
//         {boardState.map((square, index) => (
//           <ChessSquare
//             key={square.squareId}
//             square={square}
//             onDragStart={handleDragStart}
//             gameState={{
//                 selectedPiece,  // Asegúrate de que esto esté definido
//                 validMoves,    // Esto debe ser un array (inicializado como [])
//                 isWhiteTurn,
//                 kingInCheck: { white: false, black: false }
//             }}
//             onDrop={handleDrop}
//             isSelected={selectedPiece?.squareId === square.squareId}
//             isValidMove={validMoves.includes(square.squareId)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { initialBoardSetup } from '../GameLogic/gameSetup';
import { movePiece, getPossibleMoves } from '../GameLogic/moveLogic';
import { getPieceAtSquare } from '../GameLogic/checkLogic';
import { ChessSquare } from './ChessSquare';
import { initialGameState } from '../GameLogic/gameSetup';

import './styles.css';

export const ChessBoard = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [validMoves, setValidMoves] = useState([]);
    const [boardState, setBoardState] = useState(initialBoardSetup());
    const [isWhiteTurn, setIsWhiteTurn] = useState(true);
    const [gameState, setGameState] = useState({
        ...initialGameState()
    });


    const handlePieceMove = (fromSquareId, toSquareId) => {
        // Copia profunda del tablero
        const newBoard = boardState.map(square => ({ ...square }));

        // Lógica de movimiento (simplificada)
        const fromSquare = newBoard.find(sq => sq.squareId === fromSquareId);
        const toSquare = newBoard.find(sq => sq.squareId === toSquareId);

        toSquare.pieceColor = fromSquare.pieceColor;
        toSquare.pieceType = fromSquare.pieceType;
        // ... (resto de la lógica de movimiento)

        setBoardState(newBoard);
        setIsWhiteTurn(!isWhiteTurn); // Cambia el turno
    };

    const handleSquareClick = (squareId) => {

        const piece = boardState.find(sq => sq.squareId === squareId);

        // Seleccionar solo piezas del turno actual
        if (piece.pieceColor !== 'blank') {
            const moves = getPossibleMoves(
                squareId,
                { pieceType: piece.pieceType, pieceColor: piece.pieceColor },
                boardState,
                gameState.castlingAvailability
            );
            setGameState(prev => ({ ...prev, selectedPiece: squareId, validMoves: moves }));
            console.log("movimientos validos handlesquareclick " + moves);
        } else if (gameState.selectedPiece && gameState.validMoves.includes(squareId)) {
            // Mover si hay una pieza seleccionada
            const newBoard = movePiece(
                gameState.selectedPiece,
                squareId,
                boardState,
                gameState.castlingAvailability
            );

            setBoardState(newBoard);
            setGameState(prev => ({
                ...prev,
                isWhiteTurn: !prev.isWhiteTurn,
                selectedPiece: null,
                validMoves: []
            }));
        }
    };


    return (
        <div className='chess-container'>
            <div className="chess-board">
                {boardState.map((square, index) => (
                    <ChessSquare
                        key={square.squareId}
                        square={square}
                        index={index}
                        isSelected={selectedPiece === square.squareId}
                        isValidMove={validMoves.includes(square.squareId)}
                        onClick={() => handleSquareClick(square.squareId)}
                    />
                ))}
            </div>
        </div>
    );
};
