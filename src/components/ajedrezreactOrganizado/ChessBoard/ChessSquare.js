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

import {ChessPiece} from './ChessPiece';
import './styles.css';

export const ChessSquare = ({ square, index, isSelected, isValidMove, onClick }) => {
    const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
    const squareClass = `
    square 
    ${isLight ? 'light-square' : 'dark-square'}
    ${isSelected ? 'selected' : ''}
    ${isValidMove ? 'valid-move' : ''}
  `;

  return (
    <div className={squareClass} onClick={onClick}>
      <ChessPiece square={square} />
    </div>
  );
};