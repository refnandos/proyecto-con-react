// import { getPieceAtSquare } from './checkLogic';

// /**
//  * Movimientos posibles para el caballo
//  */
// export const getKnightMoves = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charCodeAt(0) - 97;
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const moves = [
//         [-2, 1], [-1, 2], [1, 2], [2, 1],
//         [2, -1], [1, -2], [-1, -2], [-2, -1]
//     ];

//     moves.forEach(([fileOffset, rankOffset]) => {
//         const currentFile = file + fileOffset;
//         const currentRank = rank + rankOffset;
        
//         if (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
//             const currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
//             const squareContent = getPieceAtSquare(currentSquareId, board);
            
//             if (squareContent.pieceColor === "blank" || squareContent.pieceColor !== pieceColor) {
//                 legalSquares.push(currentSquareId);
//             }
//         }
//     });
    
//     return legalSquares;
// };

// /**
//  * Movimientos posibles para el alfil
//  */
// export const getBishopMoves = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charAt(0);
//     const fileCode = file.charCodeAt(0);
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const directions = [
//         { file: 1, rank: 1 },    // Diagonal superior derecha
//         { file: 1, rank: -1 },   // Diagonal inferior derecha
//         { file: -1, rank: 1 },   // Diagonal superior izquierda
//         { file: -1, rank: -1 }   // Diagonal inferior izquierda
//     ];

//     directions.forEach(dir => {
//         for (let i = 1; i <= 7; i++) {
//             const newFile = String.fromCharCode(fileCode + (dir.file * i));
//             const newRank = rank + (dir.rank * i);
            
//             if (newFile < 'a' || newFile > 'h' || newRank < 1 || newRank > 8) break;
            
//             const squareId = newFile + newRank;
//             const squareContent = getPieceAtSquare(squareId, board);
            
//             if (squareContent.pieceColor === pieceColor) break;
            
//             legalSquares.push(squareId);
//             if (squareContent.pieceColor !== "blank") break;
//         }
//     });

//     return legalSquares;
// };

// /**
//  * Movimientos posibles para la torre
//  */
// export const getRookMoves = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charAt(0);
//     const fileCode = file.charCodeAt(0);
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const directions = [
//         { file: 0, rank: 1 },    // Arriba
//         { file: 0, rank: -1 },   // Abajo
//         { file: 1, rank: 0 },    // Derecha
//         { file: -1, rank: 0 }    // Izquierda
//     ];

//     directions.forEach(dir => {
//         for (let i = 1; i <= 7; i++) {
//             const newFile = String.fromCharCode(fileCode + (dir.file * i));
//             const newRank = rank + (dir.rank * i);
            
//             if (newFile < 'a' || newFile > 'h' || newRank < 1 || newRank > 8) break;
            
//             const squareId = newFile + newRank;
//             const squareContent = getPieceAtSquare(squareId, board);
            
//             if (squareContent.pieceColor === pieceColor) break;
            
//             legalSquares.push(squareId);
//             if (squareContent.pieceColor !== "blank") break;
//         }
//     });

//     return legalSquares;
// };

// /**
//  * Movimientos posibles para la reina (combinación de torre y alfil)
//  */
// export const getQueenMoves = (startingSquareId, pieceColor, board) => {
//     const rookMoves = getRookMoves(startingSquareId, pieceColor, board);
//     const bishopMoves = getBishopMoves(startingSquareId, pieceColor, board);
//     return [...rookMoves, ...bishopMoves];
// };

// /**
//  * Movimientos posibles para el rey
//  */
// export const getKingMoves = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charCodeAt(0) - 97;
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const moves = [
//         [0, 1], [1, 1], [1, 0], [1, -1],
//         [0, -1], [-1, -1], [-1, 0], [-1, 1]
//     ];

//     moves.forEach(([fileOffset, rankOffset]) => {
//         const newFile = file + fileOffset;
//         const newRank = rank + rankOffset;

//         if (newFile >= 0 && newFile <= 7 && newRank >= 1 && newRank <= 8) {
//             const squareId = String.fromCharCode(newFile + 97) + newRank;
//             const squareContent = getPieceAtSquare(squareId, board);
//             if (squareContent.pieceColor !== pieceColor) {
//                 legalSquares.push(squareId);
//             }
//         }
//     });

//     return legalSquares;
// };

// /**
//  * Capturas diagonales posibles para el peón
//  */
// export const checkPawnDiagonalCaptures = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charAt(0);
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const direction = pieceColor === "blanco" ? 1 : -1;
//     const currentRank = rank + direction;

//     for (let i = -1; i <= 1; i += 2) {
//         const currentFile = String.fromCharCode(file.charCodeAt(0) + i);
//         if (currentFile >= "a" && currentFile <= "h" && currentRank <= 8 && currentRank >= 1) {
//             const currentSquareId = currentFile + currentRank;
//             const squareContent = getPieceAtSquare(currentSquareId, board);
//             if (squareContent.pieceColor !== "blank" && squareContent.pieceColor !== pieceColor) {
//                 legalSquares.push(currentSquareId);
//             }
//         }
//     }
    
//     return legalSquares;
// };

// /**
//  * Movimientos hacia adelante posibles para el peón
//  */
// export const checkPawnForwardMoves = (startingSquareId, pieceColor, board) => {
//     const file = startingSquareId.charAt(0);
//     const rank = parseInt(startingSquareId.charAt(1));
//     let legalSquares = [];

//     const direction = pieceColor === "blanco" ? 1 : -1;
//     let currentRank = rank + direction;
    
//     // Movimiento de una casilla
//     const currentSquareId = file + currentRank;
//     const squareContent = getPieceAtSquare(currentSquareId, board);
    
//     if (squareContent.pieceColor === "blank") {
//         legalSquares.push(currentSquareId);
        
//         // Movimiento de dos casillas (solo desde posición inicial)
//         if ((rank === 2 && pieceColor === "blanco") || (rank === 7 && pieceColor === "negro")) {
//             currentRank += direction;
//             const doubleMoveSquareId = file + currentRank;
//             const doubleMoveContent = getPieceAtSquare(doubleMoveSquareId, board);
            
//             if (doubleMoveContent.pieceColor === "blank") {
//                 legalSquares.push(doubleMoveSquareId);
//             }
//         }
//     }
    
//     return legalSquares;
// };
/* Antiguos movimientos */



import { getPieceAtSquare } from './checkLogic';

/**
 * Calcula todos los movimientos posibles para una pieza en una posición dada,
 * sin considerar jaque (eso se manejará en moveLogic.js).
 */
export const calculateMoves = (startingSquareId, piece, board) => {
  const { pieceType, pieceColor } = piece;

  switch (pieceType) {
    case 'peon':
      return getPawnMoves(startingSquareId, pieceColor, board);
    case 'caballo':
      return getKnightMoves(startingSquareId, pieceColor, board);
    case 'alfil':
      return getBishopMoves(startingSquareId, pieceColor, board);
    case 'torre':
      return getRookMoves(startingSquareId, pieceColor, board);
    case 'reina':
      return getQueenMoves(startingSquareId, pieceColor, board);
    case 'rey':
      return getKingMoves(startingSquareId, pieceColor, board);
    default:
      return [];
  }
};

// -- Movimientos específicos por pieza --

/**
 * Movimientos del PEÓN (incluye capturas diagonales y avance)
 */
export const getPawnMoves = (squareId, pieceColor, board) => {
  const [file, rank] = [squareId[0], parseInt(squareId[1])];
  const direction = pieceColor === 'blanco' ? 1 : -1;
  const moves = [];

  // Movimiento hacia adelante (1 casilla)
  const forwardSquare = `${file}${rank + direction}`;
  if (isSquareEmpty(forwardSquare, board)) {
    moves.push(forwardSquare);

    // Movimiento inicial (2 casillas)
    const isInitialPosition = (pieceColor === 'blanco' && rank === 2) || (pieceColor === 'negro' && rank === 7);
    const doubleForwardSquare = `${file}${rank + 2 * direction}`;
    if (isInitialPosition && isSquareEmpty(doubleForwardSquare, board)) {
      moves.push(doubleForwardSquare);
    }
  }

  // Capturas diagonales
  const captureOffsets = [-1, 1];
  captureOffsets.forEach(offset => {
    const captureFile = String.fromCharCode(file.charCodeAt(0) + offset);
    const captureSquare = `${captureFile}${rank + direction}`;
    if (isValidSquare(captureSquare) && isOpponentPiece(captureSquare, pieceColor, board)) {
      moves.push(captureSquare);
    }
  });

  return moves;
};

/**
 * Movimientos del CABALLO (en "L")
 */
export const getKnightMoves = (squareId, pieceColor, board) => {
  const [file, rank] = [squareId[0], parseInt(squareId[1])];
  const moves = [];
  const knightOffsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2],  [1, 2],  [2, -1],  [2, 1]
  ];

  knightOffsets.forEach(([fileOffset, rankOffset]) => {
    const newFile = String.fromCharCode(file.charCodeAt(0) + fileOffset);
    const newRank = rank + rankOffset;
    const newSquare = `${newFile}${newRank}`;

    if (isValidSquare(newSquare) && !isAllyPiece(newSquare, pieceColor, board)) {
      moves.push(newSquare);
    }
  });

  return moves;
};

/**
 * Movimientos del ALFIL (diagonales)
 */
export const getBishopMoves = (squareId, pieceColor, board) => {
  return getDirectionalMoves(squareId, pieceColor, board, [
    { file: 1, rank: 1 },   // Diagonal superior derecha
    { file: 1, rank: -1 },  // Diagonal inferior derecha
    { file: -1, rank: 1 },  // Diagonal superior izquierda
    { file: -1, rank: -1 }  // Diagonal inferior izquierda
  ]);
};

/**
 * Movimientos de la TORRE (horizontales/verticales)
 */
export const getRookMoves = (squareId, pieceColor, board) => {
  return getDirectionalMoves(squareId, pieceColor, board, [
    { file: 0, rank: 1 },   // Arriba
    { file: 0, rank: -1 },  // Abajo
    { file: 1, rank: 0 },   // Derecha
    { file: -1, rank: 0 }   // Izquierda
  ]);
};

/**
 * Movimientos de la REINA (combinación de torre y alfil)
 */
export const getQueenMoves = (squareId, pieceColor, board) => {
  return [
    ...getRookMoves(squareId, pieceColor, board),
    ...getBishopMoves(squareId, pieceColor, board)
  ];
};

/**
 * Movimientos del REY (1 casilla en cualquier dirección)
 */
export const getKingMoves = (squareId, pieceColor, board) => {
  const [file, rank] = [squareId[0], parseInt(squareId[1])];
  const moves = [];

  for (let fileOffset = -1; fileOffset <= 1; fileOffset++) {
    for (let rankOffset = -1; rankOffset <= 1; rankOffset++) {
      if (fileOffset === 0 && rankOffset === 0) continue; // Ignorar posición actual

      const newFile = String.fromCharCode(file.charCodeAt(0) + fileOffset);
      const newRank = rank + rankOffset;
      const newSquare = `${newFile}${newRank}`;

      if (isValidSquare(newSquare) && !isAllyPiece(newSquare, pieceColor, board)) {
        moves.push(newSquare);
      }
    }
  }
  console.log(moves);
  return moves;
};

// -- Funciones auxiliares --

/**
 * Movimientos en dirección continua (para torre/alfil/reina)
 */
export const getDirectionalMoves = (squareId, pieceColor, board, directions) => {
  const moves = [];
  const [file, rank] = [squareId[0], parseInt(squareId[1])];

  directions.forEach(({ file: fileStep, rank: rankStep }) => {
    for (let i = 1; i <= 7; i++) {
      const newFile = String.fromCharCode(file.charCodeAt(0) + i * fileStep);
      const newRank = rank + i * rankStep;
      const newSquare = `${newFile}${newRank}`;

      if (!isValidSquare(newSquare)) break;

      if (isSquareEmpty(newSquare, board)) {
        moves.push(newSquare);
      } else {
        if (isOpponentPiece(newSquare, pieceColor, board)) {
          moves.push(newSquare); // Captura
        }
        break; // Pieza bloquea el camino
      }
    }
  });

  return moves;
};

/**
 * Verifica si una casilla está dentro del tablero (a-h, 1-8)
 */
export const isValidSquare = (squareId) => {
  const [file, rank] = [squareId[0], parseInt(squareId.slice(1))];
  return file >= 'a' && file <= 'h' && rank >= 1 && rank <= 8;
};

/**
 * Verifica si una casilla está vacía
 */
export const isSquareEmpty = (squareId, board) => {
  const square = board.find(sq => sq.squareId === squareId);
  return square?.pieceColor === 'blank';
};

/**
 * Verifica si una casilla contiene una pieza del oponente
 */
const isOpponentPiece = (squareId, pieceColor, board) => {
  const square = board.find(sq => sq.squareId === squareId);
  return square?.pieceColor !== 'blank' && square?.pieceColor !== pieceColor;
};


export const isPathClear = (kingSquareId, rookSquareId, board) => {
  const [kFile, kRank] = [kingSquareId[0], kingSquareId[1]];
  const [rFile, rRank] = [rookSquareId[0], rookSquareId[1]];
  const fileStep = kFile < rFile ? 1 : -1;

  for (let file = kFile.charCodeAt(0) + fileStep; file !== rFile.charCodeAt(0); file += fileStep) {
    const square = `${String.fromCharCode(file)}${kRank}`;
    if (!isSquareEmpty(square, board)) return false;
  }
  return true;
};

/**
 * Verifica si una casilla contiene una pieza aliada
 */
const isAllyPiece = (squareId, pieceColor, board) => {
  const square = board.find(sq => sq.squareId === squareId);
  return square?.pieceColor === pieceColor;
};