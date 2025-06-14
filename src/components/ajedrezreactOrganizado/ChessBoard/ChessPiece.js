// import { pieceImages } from '../../../images/pieces';
// import './ChessPiece.css';

// export const ChessPiece = ({ square, onDragStart, isDraggable = true }) => {
//     if (square.pieceColor === "blank") return null;

//     const imgKey = `${square.pieceType}-${square.pieceColor}`;
//     const pieceClass = `chess-piece ${square.pieceType} ${square.pieceColor}`;
    
//     // Efecto de drag visual con validación
//     const handleDragStart = (e) => {
//         if (!e.currentTarget) return;
        
//         e.dataTransfer.setData('text/plain', square.squareId);
//         e.currentTarget.classList.add('dragging');
        
//         // Usar requestAnimationFrame para mayor seguridad
//         requestAnimationFrame(() => {
//             if (e.currentTarget) {
//                 e.currentTarget.style.visibility = 'hidden';
//             }
//         });
        
//         if (onDragStart) onDragStart(e, square.squareId);
//     };

//     const handleDragEnd = (e) => {
//         if (!e.currentTarget) return;
        
//         e.currentTarget.classList.remove('dragging');
//         e.currentTarget.style.visibility = 'visible';
//     };

//     return (
//         <div
//             className={pieceClass}
//             data-square={square.squareId}
//             data-piece={square.pieceType}
//             data-color={square.pieceColor}
//             draggable={isDraggable}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//         >
//             <img 
//                 src={pieceImages[imgKey]} 
//                 alt={`${square.pieceColor} ${square.pieceType}`}
//                 className="piece-image"
//                 draggable={false}
//             />
//             <div className="piece-overlay"></div>
//         </div>
//     );
// };


import { pieceImages } from '../../../images/pieces';
import './ChessPiece.css';

export const ChessPiece = ({ square }) => {
  if (square.pieceColor === "blank") return null;

  const imgKey = `${square.pieceType}-${square.pieceColor}`;
  
  return (
    <img 
      src={pieceImages[imgKey]} 
      alt={`${square.pieceColor} ${square.pieceType}`}
      className="chess-piece"
    />
  );
};