import { 
    getKnightMoves,
    getBishopMoves,
    getRookMoves,
    getQueenMoves,
    getKingMoves,
    checkPawnDiagonalCaptures,
    checkPawnForwardMoves
} from './moveCalculations';
import { getPieceAtSquare } from './checkLogic';
import { isKingInCheck } from './checkLogic';
import { getAllPossibleMoves } from './moveLogic';
import { deepCopyArray } from '../utils/helpers';

/**
 * Configuración inicial del tablero de ajedrez
 * @returns {Array} - Array con las piezas en sus posiciones iniciales
 */
export const initialBoardSetup = () => {
    return Array(64).fill(null).map((_, index) => {
        const row = 8 - Math.floor(index / 8);
        const column = String.fromCharCode(97 + (index % 8));
        const squareId = column + row;

        // Posiciones iniciales de las piezas
        if (row === 8) { // Piezas negras
            const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
            return {
                squareId,
                pieceColor: 'negro',
                pieceType: pieces[index % 8],
                pieceId: `${pieces[index % 8]}-negro-${squareId}`
            };
        } else if (row === 7) { // Peones negros
            return {
                squareId,
                pieceColor: 'negro',
                pieceType: 'peon',
                pieceId: `peon-negro-${squareId}`
            };
        } else if (row === 2) { // Peones blancos
            return {
                squareId,
                pieceColor: 'blanco',
                pieceType: 'peon',
                pieceId: `peon-blanco-${squareId}`
            };
        } else if (row === 1) { // Piezas blancas
            const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
            return {
                squareId,
                pieceColor: 'blanco',
                pieceType: pieces[index % 8],
                pieceId: `${pieces[index % 8]}-blanco-${squareId}`
            };
        } else { // Casillas vacías
            return {
                squareId,
                pieceColor: 'blank',
                pieceType: 'blank',
                pieceId: 'blank'
            };
        }
    });
};

/**
 * Reinicia el juego al estado inicial
 * @returns {Object} - Nuevo estado inicial del juego
 */
export const resetGameState = () => ({
    board: initialBoardSetup(),
    isWhiteTurn: true,
    whiteKingSquare: "e1",
    blackKingSquare: "e8",
    selectedPiece: null,
    validMoves: [],
    gameStatus: "playing",
    kingInCheck: { white: false, black: false },
    alertMessage: "",
    moveHistory: []
});

/**
 * Verifica todas las condiciones de fin de juego
 * @param {Object} gameState - Estado actual del juego
 * @param {Function} setGameState - Función para actualizar el estado
 * @param {Array} board - Estado actual del tablero
 * @returns {boolean} - True si el juego ha terminado, false si continúa
 */
export const checkForGameEnd = (gameState, setGameState, board) => {
    const currentPlayerColor = gameState.isWhiteTurn ? 'blanco' : 'negro';
    const kingSquare = currentPlayerColor === 'blanco' ? gameState.whiteKingSquare : gameState.blackKingSquare;
    
    // 1. Verificar jaque mate
    const inCheck = isKingInCheck(kingSquare, currentPlayerColor, board);
    const possibleMoves = getAllPossibleMoves(currentPlayerColor, board, gameState);
    
    if (inCheck && possibleMoves.length === 0) {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'checkmate',
            alertMessage: `¡Jaque mate! ${currentPlayerColor === 'blanco' ? 'Negras' : 'Blancas'} ganan.`,
            kingInCheck: { white: false, black: false }
        }));
        return true;
    }
    
    // 2. Verificar ahogado (stalemate)
    if (!inCheck && possibleMoves.length === 0) {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'stalemate',
            alertMessage: "¡Ahogado! Empate.",
            kingInCheck: { white: false, black: false }
        }));
        return true;
    }
    
    // 3. Verificar material insuficiente
    if (isInsufficientMaterial(board)) {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'draw',
            alertMessage: "Empate por material insuficiente.",
            kingInCheck: { white: false, black: false }
        }));
        return true;
    }

    // 4. Verificar empate por repetición (opcional)
    // 5. Verificar regla de los 50 movimientos (opcional)

    return false;
};



/**
 * Verifica si hay suficiente material para dar jaque mate
 * @param {Array} board - Estado actual del tablero
 * @returns {boolean} - True si no hay suficiente material, false en caso contrario
 */
const isInsufficientMaterial = (board) => {
    const pieces = board.filter(sq => sq.pieceColor !== 'blank');
    
    // Solo reyes
    if (pieces.length === 2) return true;
    
    // Rey + alfil vs Rey
    // Rey + caballo vs Rey
    if (pieces.length === 3) {
        const bishops = pieces.filter(p => p.pieceType === 'alfil');
        const knights = pieces.filter(p => p.pieceType === 'caballo');
        return bishops.length === 1 || knights.length === 1;
    }
    
    // Rey + 2 caballos vs Rey (raro, pero técnicamente no es mate forzado)
    if (pieces.length === 4) {
        const knights = pieces.filter(p => p.pieceType === 'caballo');
        return knights.length === 2;
    }
    
    // Alfiles del mismo color (no se puede dar mate)
    const bishops = pieces.filter(p => p.pieceType === 'alfil');
    if (bishops.length === 2) {
        const firstBishop = bishops[0];
        const secondBishop = bishops[1];
        const firstSquareColor = (firstBishop.squareId.charCodeAt(0) + parseInt(firstBishop.squareId.charAt(1))) % 2 === 0;
        const secondSquareColor = (secondBishop.squareId.charCodeAt(0) + parseInt(secondBishop.squareId.charAt(1))) % 2 === 0;
        
        if (firstBishop.pieceColor === secondBishop.pieceColor && firstSquareColor === secondSquareColor) {
            return true;
        }
    }
    
    return false;
};

/**
 * Obtiene todos los movimientos posibles para un color
 * @param {string} color - Color ('blanco' o 'negro')
 * @param {Array} board - Estado del tablero
 * @param {Object} gameState - Estado del juego
 * @returns {Array} - Array de objetos {from, to} con movimientos posibles
 */
const getAllPossibleMoves = (color, board, gameState) => {
    return board
        .filter(square => square.pieceColor === color)
        .flatMap(square => {
            const piece = getPieceAtSquare(square.squareId, board);
            if (piece.pieceId === "blank") return [];
            
            let moves = getPossibleMovesForPiece(square.squareId, piece, board);
            const kingSquare = color === 'blanco' ? gameState.whiteKingSquare : gameState.blackKingSquare;
            
            moves = isMoveValidAgainstCheck(
                moves, 
                square.squareId, 
                piece.pieceColor, 
                piece.pieceType, 
                board, 
                kingSquare
            );
            
            return moves.map(move => ({
                from: square.squareId,
                to: move
            }));
        });
};

/**
 * Obtiene movimientos posibles para una pieza específica
 * (Esta función sería un wrapper que llama a las funciones específicas de cada pieza)
 */
const getPossibleMovesForPiece = (squareId, piece, board) => {
    const { pieceType, pieceColor } = piece;
    
    switch (pieceType) {
        case 'peon':
            const diagonal = checkPawnDiagonalCaptures(squareId, pieceColor, board);
            const forward = checkPawnForwardMoves(squareId, pieceColor, board);
            return [...diagonal, ...forward];
            
        case 'caballo':
            return getKnightMoves(squareId, pieceColor, board);
            
        case 'alfil':
            return getBishopMoves(squareId, pieceColor, board);
            
        case 'torre':
            return getRookMoves(squareId, pieceColor, board);
            
        case 'reina':
            return getQueenMoves(squareId, pieceColor, board);
            
        case 'rey':
            return getKingMoves(squareId, pieceColor, board);
            
        default:
            return [];
    }
};

/**
 * Obtiene información de la pieza en una casilla
 */
const getPieceAtSquare = (squareId, board) => {
    const square = board.find(sq => sq.squareId === squareId);
    return {
        pieceColor: square.pieceColor,
        pieceType: square.pieceType,
        pieceId: square.pieceId
    };
};
