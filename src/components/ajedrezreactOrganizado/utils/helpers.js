/**
 * Crea una copia profunda de un array de objetos
 */
export const deepCopyArray = (array) => {
    return array.map(element => ({ ...element }));
};

/**
 * Obtiene información de una pieza en el tablero
 */
export const getPieceAtSquare = (squareId, board) => {
    const square = board.find(sq => sq.squareId === squareId);
    return {
        pieceColor: square.pieceColor,
        pieceType: square.pieceType,
        pieceId: square.pieceId
    };
};