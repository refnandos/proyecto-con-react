// import './GameStatus.css'; // Archivo de estilos específico

// export const GameStatus = ({isWhiteTurn, gameState, onResetGame }) => {
//     // Determina el turno actual y el estado del juego
//     const currentPlayer = gameState.isWhiteTurn ? 'blanco' : 'negro';
//     const opponentPlayer = gameState.isWhiteTurn ? 'negro' : 'blanco';
    
//     // Mensaje de estado del juego
//     const getStatusMessage = () => {
//         if (gameState.gameStatus === 'checkmate') {
//             return `¡Jaque mate! Ganaron las ${opponentPlayer}s`;
//         }
//         if (gameState.gameStatus === 'stalemate') {
//             return '¡Ahogado! Empate';
//         }
//         if (gameState.gameStatus === 'draw') {
//             return gameState.alertMessage || 'Empate';
//         }
//         if (gameState.kingInCheck.white || gameState.kingInCheck.black) {
//             return `¡Jaque! Turno de las ${currentPlayer}s`;
//         }
//         return `Turno de las ${currentPlayer}s`;
//     };

//     return (
//         <div className="game-status-container">
//             {/* Modal de fin de juego */}
//             {gameState.gameStatus !== 'playing' && (
//                 <div className="game-over-modal">
//                     <div className="modal-content">
//                         <h2>{getStatusMessage()}</h2>
//                         <button 
//                             className="reset-button"
//                             onClick={onResetGame}
//                         >
//                             Jugar otra vez
//                         </button>
//                     </div>
//                 </div>
//             )}
            
//             {/* Barra de estado durante el juego */}
//             <div className={`status-bar ${gameState.gameStatus !== 'playing' ? 'game-ended' : ''}`}>
//                 <div className="player-turn">
//                     <span className={`turn-indicator ${currentPlayer}`}></span>
//                     <p>{getStatusMessage()}</p>
//                 </div>
                
//                 <div className="game-info">
//                     {gameState.kingInCheck.white && (
//                         <div className="check-warning white-check">Rey blanco en jaque</div>
//                     )}
//                     {gameState.kingInCheck.black && (
//                         <div className="check-warning black-check">Rey negro en jaque</div>
//                     )}
//                 </div>
                
//                 <button 
//                     className="restart-button"
//                     onClick={onResetGame}
//                 >
//                     Reiniciar
//                 </button>
//             </div>
//         </div>
//     );
// };

export const GameStatus = ({ isWhiteTurn }) => {
  const currentPlayer = isWhiteTurn ? 'blanco' : 'negro';
  
  return (
    <div className="status-bar">
      <div className="player-turn">
        <span className={`turn-indicator ${currentPlayer}`}></span>
        <p>Turno de las {currentPlayer}s</p>
      </div>
    </div>
  );
};