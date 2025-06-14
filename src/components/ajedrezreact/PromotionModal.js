import './css/PromotionModal.css';



export const PromotionModal = ({ color, onSelectPiece, onClose }) => {
  const pieces = ['reina', 'torre', 'alfil', 'caballo'];
  
  return (
    <div className="promotion-modal-overlay">
      <div className="promotion-modal">
        <h2>Selecciona una pieza para promocionar</h2>
        <div className="promotion-options">
          {pieces.map(piece => (
            <button 
              key={piece}
              onClick={() => onSelectPiece(piece)}
              className={`promotion-option ${color}`}
            >
              <img 
                src={require(`./piezas/${piece}-${color}.png`)} 
                alt={piece} 
              />
              <span>{piece.charAt(0).toUpperCase() + piece.slice(1)}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="close-button">
          Cerrar
        </button>
      </div>
    </div>
  );
};