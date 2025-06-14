import { useState } from "react";
import { ChessBoard } from "../ajedrezreactOrganizado/ChessBoard/ChessBoard";
import { GameStatus } from "../ajedrezreactOrganizado/GameControls/GameStatus";

// import { TestChessMoves } from '../ajedrezreactOrganizado/TestChessMoves';


export const ContenedorChessordenado = () => {

const [isWhiteTurn, setIsWhiteTurn] = useState(true);
    
  return (
    <div className="chess-game">
      <GameStatus isWhiteTurn={isWhiteTurn} />
      <ChessBoard 
        isWhiteTurn={isWhiteTurn}
        onPieceMoved={() => setIsWhiteTurn(!isWhiteTurn)} 
      />
    </div>
  );

//     return (
//     <div>
//       <TestChessMoves />
//     </div>
//   );

};

