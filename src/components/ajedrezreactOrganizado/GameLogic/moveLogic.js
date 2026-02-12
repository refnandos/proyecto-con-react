import { 
    getKnightMoves, 
    getBishopMoves, 
    getRookMoves, 
    getQueenMoves, 
    getKingMoves,
    checkPawnDiagonalCaptures,
    checkPawnForwardMoves
} from './moveCalculations';



import { calculateMoves } from './moveCalculations';
import { isKingInCheck } from './checkLogic';
import { deepCopyArray } from '../utils/helpers';



const isMoveSafe = (board, fromSquareId, toSquareId, pieceColor) => {
  const boardCopy = deepCopyArray(board);
  const fromSquare = boardCopy.find(sq => sq.squareId === fromSquareId);
  const toSquare = boardCopy.find(sq => sq.squareId === toSquareId);

  // Simular movimiento
  toSquare.pieceColor = fromSquare.pieceColor;
  toSquare.pieceType = fromSquare.pieceType;
  fromSquare.pieceColor = 'blank';
  fromSquare.pieceType = 'blank';

  // Encontrar la posición del rey (puede haber cambiado si es el rey quien se mueve)
  const kingSquare = pieceColor === 'blanco' 
    ? boardCopy.find(sq => sq.pieceType === 'rey' && sq.pieceColor === 'blanco').squareId
    : boardCopy.find(sq => sq.pieceType === 'rey' && sq.pieceColor === 'negro').squareId;

  return !isKingInCheck(kingSquare, pieceColor, boardCopy);
};



















export const movePiece = (from, to, boardState) => {
  const newBoard = deepCopyArray(boardState);
  const fromSquare = newBoard.find(sq => sq.squareId === from);
  const toSquare = newBoard.find(sq => sq.squareId === to);
  
  // Mover la pieza
  toSquare.pieceColor = fromSquare.pieceColor;
  toSquare.pieceType = fromSquare.pieceType;
  toSquare.pieceId = fromSquare.pieceId;
  
  // Limpiar casilla de origen
  fromSquare.pieceColor = "blank";
  fromSquare.pieceType = "blank";
  fromSquare.pieceId = "blank";
  
  return newBoard;
};



const isKingInCheckAfterMove = (board, fromSquareId, toSquareId, piece) => {
  const boardCopy = deepCopyArray(board);
  const fromSquare = boardCopy.find(sq => sq.squareId === fromSquareId);
  const toSquare = boardCopy.find(sq => sq.squareId === toSquareId);

  // Simular movimiento
  toSquare.pieceColor = fromSquare.pieceColor;
  toSquare.pieceType = fromSquare.pieceType;
  fromSquare.pieceColor = 'blank';
  fromSquare.pieceType = 'blank';

  // Verificar jaque
  const kingSquare = boardCopy.find(
    sq => sq.pieceType === 'rey' && sq.pieceColor === piece.pieceColor
  ).squareId;
  
  return isKingInCheck(kingSquare, piece.pieceColor, boardCopy);
};


// Función principal para obtener movimientos válidos
// export const getPossibleMoves = (startingSquareId, piece, boardState) => {
//     const { pieceColor, pieceType } = piece;

//     switch (pieceType) {
//         case "peon":
//             const diagonal = checkPawnDiagonalCaptures(startingSquareId, pieceColor, boardState);
//             const forward = checkPawnForwardMoves(startingSquareId, pieceColor, boardState);
//             return [...diagonal, ...forward];

//         case "caballo":
//             return getKnightMoves(startingSquareId, pieceColor, boardState);

//         case "alfil":
//             return getBishopMoves(startingSquareId, pieceColor, boardState);

//         case "torre":
//             return getRookMoves(startingSquareId, pieceColor, boardState);

//         case "reina":
//             return getQueenMoves(startingSquareId, pieceColor, boardState);

//         case "rey":
//             return getKingMoves(startingSquareId, pieceColor, boardState);

//         default:
//             return [];
//     }
// };

export const getPossibleMoves = (fromSquareId, piece, board) => {
  const moves = calculateMoves(fromSquareId, piece, board);
  console.log(moves);
  return moves.filter(move => 
    !isKingInCheckAfterMove(board, fromSquareId, move, piece)
  );
};

// Filtra movimientos que dejarían al rey en jaque
export const isMoveValidAgainstCheck = (legalSquares, startingSquareId, pieceColor, pieceType, boardState, kingSquare) => {
    const filteredMoves = [];
    
    legalSquares.forEach((destinationId) => {
        const boardCopy = deepCopyArray(boardState);
        const currentSquare = boardCopy.find(e => e.squareId === startingSquareId);
        const destinationSquare = boardCopy.find(e => e.squareId === destinationId);
        
        // Simular movimiento
        destinationSquare.pieceColor = currentSquare.pieceColor;
        destinationSquare.pieceType = currentSquare.pieceType;
        destinationSquare.pieceId = currentSquare.pieceId;
        currentSquare.pieceColor = "blank";
        currentSquare.pieceType = "blank";
        currentSquare.pieceId = "blank";
        
        let isCheck;
        if (pieceType === "rey") {
            isCheck = isKingInCheck(destinationId, pieceColor, boardCopy);
        } else {
            isCheck = isKingInCheck(kingSquare, pieceColor, boardCopy);
        }
        
        if (!isCheck) {
            filteredMoves.push(destinationId);
        }
    });
    
    return filteredMoves;
};

// Maneja el evento de arrastrar una pieza antiguo
// export const handlePieceDragStart = (e, squareId, gameState, setGameState, boardState) => {
//      if (!boardState) {
//         console.error("Board state is undefined");
//         e.preventDefault();
//         return;
//     }
    
    
//     const piece = getPieceAtSquare(squareId, boardState);
    
//     if ((gameState.isWhiteTurn && piece.pieceColor === "blanco") || 
//         (!gameState.isWhiteTurn && piece.pieceColor === "negro")) {
        
//         const kingSquare = piece.pieceColor === 'blanco' ? gameState.whiteKingSquare : gameState.blackKingSquare;
//         const legalSquares = getPossibleMoves(squareId, piece, boardState);
//         const validMoves = isMoveValidAgainstCheck(
//             legalSquares, 
//             squareId, 
//             piece.pieceColor, 
//             piece.pieceType, 
//             boardState, 
//             kingSquare
//         );

//         setGameState(prev => ({
//             ...prev,
//             selectedPiece: { ...piece, squareId },
//             validMoves
//         }));

//         e.dataTransfer.setData("text/plain", squareId);
//     } else {
//         e.preventDefault();
//     }
// };
export const handlePieceDragStart = (e, squareId, boardState, isWhiteTurn) => {
  const piece = getPieceAtSquare(squareId, boardState);
  
  if ((isWhiteTurn && piece.pieceColor === "blanco") || 
      (!isWhiteTurn && piece.pieceColor === "negro")) {
    e.dataTransfer.setData("text/plain", squareId);
    e.dataTransfer.effectAllowed = "move";
    return true; // Indica que el drag es válido
  }
  return false;
};


// Maneja el evento de soltar una pieza
export const handleSquareDrop = (e, destinationSquareId, gameState, setGameState, setBoardState) => {
    e.preventDefault();
    if (gameState.gameStatus !== 'playing') return;
    
    const startingSquareId = e.dataTransfer.getData("text/plain");
    if (!startingSquareId || !gameState.validMoves.includes(destinationSquareId)) return;

    setBoardState(prev => {
        const newBoard = deepCopyArray(prev);
        const currentSquare = newBoard.find(sq => sq.squareId === startingSquareId);
        const destinationSquare = newBoard.find(sq => sq.squareId === destinationSquareId);
        const piece = { ...currentSquare };

        // Lógica de captura al paso
        if (piece.pieceType === 'peon' && destinationSquare.pieceColor === 'blank' &&
            startingSquareId.charAt(0) !== destinationSquareId.charAt(0)) {
            handleEnPassant(newBoard, startingSquareId, destinationSquareId, piece.pieceColor);
        }

        // Lógica de enroque
        if (piece.pieceType === 'rey' && 
            Math.abs(startingSquareId.charCodeAt(0) - destinationSquareId.charCodeAt(0)) === 2) {
            handleCastling(newBoard, startingSquareId, destinationSquareId, piece.pieceColor);
        }

        // Mover la pieza
        destinationSquare.pieceColor = piece.pieceColor;
        destinationSquare.pieceType = piece.pieceType;
        destinationSquare.pieceId = piece.pieceId;
        
        // Promoción de peón
        if (piece.pieceType === 'peon' && 
            (destinationSquareId.charAt(1) === '8' || destinationSquareId.charAt(1) === '1')) {
            destinationSquare.pieceType = 'reina';
            destinationSquare.pieceId = `reina-${piece.pieceColor}-${destinationSquareId}`;
        }

        // Limpiar casilla de origen
        currentSquare.pieceColor = "blank";
        currentSquare.pieceType = "blank";
        currentSquare.pieceId = "blank";

        updateGameStateAfterMove(startingSquareId, destinationSquareId, gameState, setGameState, newBoard);

        return newBoard;
    });

    // Actualizar estado del juego
    
};



// Función auxiliar: captura al paso
const handleEnPassant = (board, startingSquareId, destinationSquareId, pieceColor) => {
    const direction = pieceColor === 'blanco' ? 1 : -1;
    const capturedPawnRank = parseInt(destinationSquareId.charAt(1)) - direction;
    const capturedPawnSquare = destinationSquareId.charAt(0) + capturedPawnRank;
    const capturedSquare = board.find(sq => sq.squareId === capturedPawnSquare);
    
    capturedSquare.pieceColor = "blank";
    capturedSquare.pieceType = "blank";
    capturedSquare.pieceId = "blank";
};

// Función auxiliar: enroque
const handleCastling = (board, startingSquareId, destinationSquareId, pieceColor) => {
    const isKingSide = destinationSquareId.charAt(0) === 'g';
    const rank = pieceColor === 'blanco' ? '1' : '8';
    
    const rookStartFile = isKingSide ? 'h' : 'a';
    const rookEndFile = isKingSide ? 'f' : 'd';
    
    const rookStartSquare = board.find(sq => sq.squareId === `${rookStartFile}${rank}`);
    const rookEndSquare = board.find(sq => sq.squareId === `${rookEndFile}${rank}`);
    
    rookEndSquare.pieceColor = rookStartSquare.pieceColor;
    rookEndSquare.pieceType = rookStartSquare.pieceType;
    rookEndSquare.pieceId = rookStartSquare.pieceId;
    
    rookStartSquare.pieceColor = "blank";
    rookStartSquare.pieceType = "blank";
    rookStartSquare.pieceId = "blank";
};

// Función auxiliar: actualizar estado después de mover
const updateGameStateAfterMove = (
    startingSquareId, 
    destinationSquareId, 
    gameState, 
    setGameState,
    boardState
) => {
    const piece = getPieceAtSquare(destinationSquareId, boardState);
    const opponentColor = piece.pieceColor === 'blanco' ? 'negro' : 'blanco';
    const opponentKingSquare = opponentColor === 'blanco' ? gameState.whiteKingSquare : gameState.blackKingSquare;
    // Actualizar posición del rey si es necesario
    if (piece.pieceType === 'rey') {
        piece.pieceColor === 'blanco' 
            ? setGameState(prev => ({ ...prev, whiteKingSquare: destinationSquareId }))
            : setGameState(prev => ({ ...prev, blackKingSquare: destinationSquareId }));
    }

    // Verificar jaque
    const isOpponentKingInCheck = isKingInCheck(opponentKingSquare, opponentColor, boardState);
    
    setGameState(prev => ({
        ...prev,
        isWhiteTurn: !prev.isWhiteTurn,
        selectedPiece: null,
        validMoves: [],
        alertMessage: isOpponentKingInCheck 
            ? `¡Jaque! El rey ${opponentColor} está en peligro` 
            : "",
        kingInCheck: {
            white: opponentColor === 'blanco' ? isOpponentKingInCheck : prev.kingInCheck.white,
            black: opponentColor === 'negro' ? isOpponentKingInCheck : prev.kingInCheck.black
        }
    }));
};

// Función auxiliar: obtener pieza en casilla 
export const getPieceAtSquare = (squareId, board) => {
    try {
        if (!board || !Array.isArray(board)) {
            throw new Error("Invalid board state");
        }
        
        const square = board.find(sq => sq?.squareId === squareId) || {};
        
        return {
            pieceColor: square.pieceColor || 'blank',
            pieceType: square.pieceType || 'blank',
            pieceId: square.pieceId || 'blank'
        };
    } catch (error) {
        console.error("Error in getPieceAtSquare:", error);
        return {
            pieceColor: 'blank',
            pieceType: 'blank',
            pieceId: 'blank'
        };
    }
};

