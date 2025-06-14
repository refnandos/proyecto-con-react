import { useState } from 'react';
import { initialBoardSetup } from './GameLogic/gameSetup';
import { calculateMoves } from './GameLogic/moveCalculations';

export const TestChessMoves = () => {
  const [board] = useState(initialBoardSetup());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquareClick = (squareId) => {
    const piece = board.find(sq => sq.squareId === squareId);
    
    if (piece.pieceColor !== 'blank') {
      const moves = calculateMoves(
        squareId,
        { pieceType: piece.pieceType, pieceColor: piece.pieceColor },
        board
      );
      setSelectedPiece(squareId);
      setValidMoves(moves);
      console.log(`Movimientos para ${piece.pieceType} en ${squareId}:`, moves);
    }
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 50px)' }}>
        {board.map((square, index) => (
          <div
            key={square.squareId}
            onClick={() => handleSquareClick(square.squareId)}
            style={{
              backgroundColor: validMoves.includes(square.squareId) 
                ? 'lightgreen' 
                : (index + Math.floor(index / 8)) % 2 === 0 ? 'white' : 'gray',
              border: selectedPiece === square.squareId ? '2px solid blue' : 'none',
              cursor: 'pointer'
            }}
          >
            {square.pieceType !== 'blank' && (
              <span>{square.pieceColor === 'blanco' ? '♙♘♗♖♕♔' : '♟♞♝♜♛♚'}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};