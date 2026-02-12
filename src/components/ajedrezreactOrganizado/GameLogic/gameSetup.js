/**
 * Configuración inicial del juego de ajedrez
 * Este archivo contiene las funciones para inicializar el tablero y el estado del juego
 */

/**
 * Crea el estado inicial del tablero con las piezas en sus posiciones estándar
 * @returns {Array} - Array de 64 elementos representando las casillas del tablero
 */
export const initialBoardSetup = () => {
    return Array(64).fill(null).map((_, index) => {
        const row = 8 - Math.floor(index / 8);
        const column = String.fromCharCode(97 + (index % 8));
        const squareId = column + row;

        // Posiciones iniciales de las piezas
        if (row === 8) { // Fila de piezas negras
            const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
            return createPieceObject(squareId, 'negro', pieces[index % 8]);
        } else if (row === 7) { // Peones negros
            return createPieceObject(squareId, 'negro', 'peon');
        } else if (row === 2) { // Peones blancos
            return createPieceObject(squareId, 'blanco', 'peon');
        } else if (row === 1) { // Fila de piezas blancas
            const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
            return createPieceObject(squareId, 'blanco', pieces[index % 8]);
        } else { // Casillas vacías
            return createEmptySquare(squareId);
        }
    });
};

/**
 * Crea un objeto de pieza de ajedrez
 * @param {string} squareId - Identificador de la casilla (ej: 'a1')
 * @param {string} color - Color de la pieza ('blanco' o 'negro')
 * @param {string} type - Tipo de pieza ('peon', 'torre', etc.)
 * @returns {Object} - Objeto que representa la pieza
 */
const createPieceObject = (squareId, color, type) => {
    return {
        squareId,
        pieceColor: color,
        pieceType: type,
        pieceId: `${type}-${color}-${squareId}`
    };
};

/**
 * Crea un objeto para una casilla vacía
 * @param {string} squareId - Identificador de la casilla
 * @returns {Object} - Objeto que representa una casilla vacía
 */
const createEmptySquare = (squareId) => {
    return {
        squareId,
        pieceColor: 'blank',
        pieceType: 'blank',
        pieceId: 'blank'
    };
};

/**
 * Crea un estado inicial del juego
 * @returns {Object} - Objeto con el estado inicial del juego
 */
export const initialGameState = () => {

     return {
        isWhiteTurn: true,
        castlingAvailability: {
            whiteKingSide: true,
            whiteQueenSide: true,
            blackKingSide: true,
            blackQueenSide: true
        },
        whiteKingSquare: "e1",
        blackKingSquare: "e8",
        selectedPiece: null,
        validMoves: [],
        gameStatus: "playing",
        kingInCheck: { white: false, black: false },
        moveHistory: [],
        capturedPieces: { white: [], black: [] }
    };
};

/**
 * Reinicia el juego al estado inicial
 * @returns {Object} - Objeto con el nuevo estado del tablero y del juego
 */
export const resetGame = () => {
    return {
        board: initialBoardSetup(),
        gameState: initialGameState()
    };
};
