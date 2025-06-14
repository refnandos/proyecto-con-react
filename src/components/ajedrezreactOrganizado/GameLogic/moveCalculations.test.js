import { calculateMoves } from './moveCalculations';
import { initialBoardSetup } from './gameSetup';

const board = initialBoardSetup();

// const pawnMoves = calculateMoves('a2', 
//   { pieceType: 'peon', pieceColor: 'blanco' }, 
//   board
// );
// console.log('Movimientos peón a2:', pawnMoves); 

// const knightMoves = calculateMoves('g8', 
//   { pieceType: 'caballo', pieceColor: 'negro' }, 
//   board
// );
// console.log('Movimientos caballo g8:', knightMoves); 

const kingMoves = getPossibleMoves(
  'e1', 
  { pieceType: 'rey', pieceColor: 'blanco' }, 
  boardConAmenaza
);
console.log(kingMoves); // No debe incluir casillas bajo ataque

// 2. Peón no puede avanzar si bloqueado
const pawnMoves = getPossibleMoves(
  'e2', 
  { pieceType: 'peon', pieceColor: 'blanco' }, 
  boardConPiezaEnE3
);
console.log(pawnMoves); // Debe ser [] (vacío)