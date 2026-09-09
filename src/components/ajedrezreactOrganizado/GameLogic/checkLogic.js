import { 
    getKnightMoves,
    // checkPawnDiagonalCaptures,
    // checkPawnForwardMoves,
    // getBishopMoves,
    // getRookMoves,
    // getQueenMoves
} from './moveCalculations';
import { deepCopyArray } from '../utils/helpers';

/**
 * Verifica si el rey en la posición dada está en jaque
 * @param {string} squareId - ID de la casilla del rey (ej: 'e1')
 * @param {string} pieceColor - Color del rey ('blanco' o 'negro')
 * @param {Array} board - Estado actual del tablero
 * @returns {boolean} - True si el rey está en jaque, false en caso contrario
 */
export const isKingInCheck = (squareId, pieceColor, board) => {
    const opponentColor = pieceColor === 'blanco' ? 'negro' : 'blanco';

    // Verificar ataques de caballos
    const knightMoves = getKnightMoves(squareId, pieceColor, board);
    for (const move of knightMoves) {
        const squareContent = getPieceAtSquare(move, board);
        if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'caballo') {
            return true;
        }
    }

    // Verificar ataques de peones (captura diagonal)
    const pawnDirection = pieceColor === 'blanco' ? 1 : -1;
    const pawnAttacks = [
        { file: -1, rank: pawnDirection },
        { file: 1, rank: pawnDirection }
    ];

    for (const attack of pawnAttacks) {
        const file = squareId.charCodeAt(0) - 97 + attack.file;
        const rank = parseInt(squareId.charAt(1)) + attack.rank;

        if (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
            const currentSquareId = String.fromCharCode(file + 97) + rank;
            const squareContent = getPieceAtSquare(currentSquareId, board);

            if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'peon') {
                return true;
            }
        }
    }

    // Verificar ataques en línea recta (torres y reinas)
    const rookDirections = [
        { file: 0, rank: 1 }, { file: 0, rank: -1 },  // Vertical
        { file: 1, rank: 0 }, { file: -1, rank: 0 }    // Horizontal
    ];

    for (const dir of rookDirections) {
        if (checkDirectionalAttack(squareId, dir, opponentColor, ['torre', 'reina'], board)) {
            return true;
        }
    }

    // Verificar ataques diagonales (alfiles y reinas)
    const bishopDirections = [
        { file: 1, rank: 1 }, { file: 1, rank: -1 },
        { file: -1, rank: 1 }, { file: -1, rank: -1 }
    ];

    for (const dir of bishopDirections) {
        if (checkDirectionalAttack(squareId, dir, opponentColor, ['alfil', 'reina'], board)) {
            return true;
        }
    }

    // Verificar ataques del rey contrario
    const kingOffsets = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [fileOffset, rankOffset] of kingOffsets) {
        const file = squareId.charCodeAt(0) - 97 + fileOffset;
        const rank = parseInt(squareId.charAt(1)) + rankOffset;

        if (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
            const currentSquareId = String.fromCharCode(file + 97) + rank;
            const squareContent = getPieceAtSquare(currentSquareId, board);

            if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'rey') {
                return true;
            }
        }
    }

    return false;
};

/**
 * Filtra movimientos que dejarían al rey en jaque
 * @param {Array} legalSquares - Array de casillas legales para mover
 * @param {string} startingSquareId - Casilla de origen
 * @param {string} pieceColor - Color de la pieza
 * @param {string} pieceType - Tipo de pieza
 * @param {Object} gameState - Estado actual del juego
 * @param {Array} board - Estado del tablero
 * @returns {Array} - Array de movimientos válidos que no dejan al rey en jaque
 */
export const isMoveValidAgainstCheck = (legalSquares, startingSquareId, pieceColor, pieceType, board, kingSquare) => {
    const filteredMoves = [];
    
    legalSquares.forEach((destinationId) => {
        const boardCopy = deepCopyArray(board);
        const currentSquare = boardCopy.find(e => e.squareId === startingSquareId);
        const destinationSquare = boardCopy.find(e => e.squareId === destinationId);
        
        // Simular movimiento
        destinationSquare.pieceColor = currentSquare.pieceColor;
        destinationSquare.pieceType = currentSquare.pieceType;
        destinationSquare.pieceId = currentSquare.pieceId;
        currentSquare.pieceColor = "blank";
        currentSquare.pieceType = "blank";
        currentSquare.pieceId = "blank";
        
        // Verificar si el movimiento deja al rey en jaque
        const isCheck = pieceType === "rey" 
            ? isKingInCheck(destinationId, pieceColor, boardCopy)
            : isKingInCheck(kingSquare, pieceColor, boardCopy);
        
        if (!isCheck) {
            filteredMoves.push(destinationId);
        }
    });
    
    return filteredMoves;
};

/**
 * Verifica ataques en una dirección específica
 * @param {string} squareId - Casilla de origen
 * @param {Object} direction - Dirección a verificar {file, rank}
 * @param {string} opponentColor - Color del oponente
 * @param {Array} pieceTypes - Tipos de pieza que pueden atacar
 * @param {Array} board - Estado del tablero
 * @returns {boolean} - True si hay un ataque en esta dirección
 */
const checkDirectionalAttack = (squareId, direction, opponentColor, pieceTypes, board) => {
    let file = squareId.charCodeAt(0) - 97 + direction.file;
    let rank = parseInt(squareId.charAt(1)) + direction.rank;

    while (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
        const currentSquareId = String.fromCharCode(file + 97) + rank;
        const squareContent = getPieceAtSquare(currentSquareId, board);

        if (squareContent.pieceColor !== 'blank') {
            return squareContent.pieceColor === opponentColor && 
                   pieceTypes.includes(squareContent.pieceType);
        }

        file += direction.file;
        rank += direction.rank;
    }

    return false;
};

/**
 * Obtiene la pieza en una casilla específica
 * @param {string} squareId - ID de la casilla
 * @param {Array} board - Estado del tablero
 * @returns {Object} - Objeto con información de la pieza
 */
export const getPieceAtSquare = (squareId, board) => {
    const square = board.find(sq => sq.squareId === squareId);
    return {
        pieceColor: square.pieceColor,
        pieceType: square.pieceType,
        pieceId: square.pieceId
    };
};

