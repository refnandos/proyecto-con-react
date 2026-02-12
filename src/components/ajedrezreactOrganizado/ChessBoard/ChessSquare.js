// import { ChessPiece } from './ChessPiece';
// import './styles.css';

// export const ChessSquare = ({ square, index, gameState = {}, onDrop, onDragStart }) => {
//     const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
//     const squareClass = isLight ? "light-square" : "dark-square";
//     const isSelected = gameState.selectedPiece?.squareId === square.squareId;
//     const isValidMove = gameState.validMoves?.includes(square.squareId) || false;
//     const isDraggable = gameState.isWhiteTurn === (square.pieceColor === 'blanco');
//     const isKingInCheckSquare = 
//         (square.pieceType === 'rey' && square.pieceColor === 'blanco' && gameState.kingInCheck.white) ||
//         (square.pieceType === 'rey' && square.pieceColor === 'negro' && gameState.kingInCheck.black);

//     const rank = square.squareId.charAt(1);
//     const file = square.squareId.charAt(0);
//     const showRank = index % 8 === 0;
//     const showFile = index >= 56;

    // viejoreturn
    // return (
    //     <div
    //         className={`${squareClass} ${isSelected ? "selected" : ""} ${isValidMove ? "valid-move" : ""} ${isKingInCheckSquare ? "king-in-check" : ""}`}
    //         onDragOver={(e) => e.preventDefault()}
    //         onDrop={onDrop}
    //     >
    //         {showRank && <div className={`coordinate rank ${isLight ? "light-text" : "dark-text"}`}>{rank}</div>}
    //         {showFile && <div className={`coordinate file ${isLight ? "light-text" : "dark-text"}`}>{file}</div>}
    //         <ChessPiece 
    //             square={square} 
    //             onDragStart={onDragStart}
    //             isDraggable={gameState.isWhiteTurn === (square.pieceColor === 'blanco')}
    //         />
    //     </div>
    // );

//     return (
//     <div
//       className={`square ${squareClass} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
//       onDragOver={(e) => {
//         e.preventDefault();
//         e.dataTransfer.dropEffect = isValidMove ? "move" : "none";
//       }}
//       onDrop={(e) => onDrop(e, square.squareId)}
//     >
//       <ChessPiece 
//         square={square} 
//         onDragStart={(e) => onDragStart(e, square.squareId)}
//         isDraggable={isDraggable}
//       />
//     </div>
//   );
// };

// import {ChessPiece} from './ChessPiece';
// import './styles.css';

// export const ChessSquare = ({ square, index, isSelected, isValidMove, onClick }) => {
//     const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
//     const squareClass = `
//     square 
//     ${isLight ? 'light-square' : 'dark-square'}
//     ${isSelected ? 'selected' : ''}
//     ${isValidMove ? 'valid-move' : ''}
//   `;

//     console.log("Props recibidas:", { isSelected, isValidMove });

//   return (
//     <div className={squareClass} onClick={onClick}>
//       <ChessPiece square={square} />
//     </div>
//   );
// };

import { ChessPiece } from './ChessPiece';
import './styles.css';

export const ChessSquare = ({ 
  square, 
  index, 
  isSelected, 
  isValidMove, 
  isKingInCheck,
  onClick,
  onDragStart,
  onDrop,
  isDraggable
}) => {
  const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
  const squareClass = isLight ? "light-square" : "dark-square";
  
  // Determinar clases adicionales
  const additionalClasses = [
    isSelected ? "selected" : "",
    isValidMove ? "valid-move" : "",
    isKingInCheck ? "king-in-check" : ""
  ].filter(Boolean).join(' ');

  // Coordenadas del tablero
  const rank = square.squareId.charAt(1);
  const file = square.squareId.charAt(0);
  const showRank = index % 8 === 0;
  const showFile = index >= 56;

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isValidMove) {
      e.dataTransfer.dropEffect = "move";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isValidMove && onDrop) {
      onDrop(e, square.squareId);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(square.squareId);
    }
  };

  return (
    <div
      className={`${squareClass} ${additionalClasses}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-testid={`square-${square.squareId}`}
    >
      {showRank && (
        <div className={`coordinate rank ${isLight ? "dark-text" : "light-text"}`}>
          {rank}
        </div>
      )}
      {showFile && (
        <div className={`coordinate file ${isLight ? "dark-text" : "light-text"}`}>
          {file}
        </div>
      )}
      
      <ChessPiece 
        square={square} 
        onDragStart={onDragStart}
        isDraggable={isDraggable}
      />
      
      {/* Indicador de movimiento válido */}
      {isValidMove && !square.pieceColor !== 'blank' && (
        <div className="move-indicator"></div>
      )}
    </div>
  );
};