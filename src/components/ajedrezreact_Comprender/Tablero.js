
// importacion de las imagenes de las piezas
import torreNegro from "./piezas/Torre-Negro.png";
import torreBlanco from "./piezas/Torre-Blanco.png";
import CaballoNegro from "./piezas/Caballo-Negro.png";
import CaballoBlanco from "./piezas/Caballo-Blanco.png";
import AlfilNegro from "./piezas/Alfil-Negro.png";
import AlfilBlanco from "./piezas/Alfil-Blanco.png";
import ReyNegro from "./piezas/Rey-Negro.png";
import ReyBlanco from "./piezas/Rey-Blanco.png";
import ReinaNegro from "./piezas/Reina-Negro.png";
import ReinaBlanco from "./piezas/Reina-Blanco.png";
import PeonNegro from "./piezas/Peon-Negro.png";
import PeonBlanco from "./piezas/Peon-Blanco.png";

// Herramientas a usar
import React, { useState, useEffect, useCallback } from "react";

// Estilo css
// import "./css/chessStyle.css";

// Comprencion de anterior tablero creado:

const initialBoard = Array(64).fill(null).map((_, index) => {
    const row = 8 - Math.floor(index / 8);
    const column = String.fromCharCode(97 + (index % 8));
    const squareId = column + row;

    // Posiciones iniciales de las piezas
    if (row === 8) {
        const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
        return {
            squareId,
            pieceColor: 'negro',
            pieceType: pieces[index % 8],
            pieceId: `${pieces[index % 8]}-negro-${squareId}`
        };
    } else if (row === 7) {
        return {
            squareId,
            pieceColor: 'negro',
            pieceType: 'peon',
            pieceId: `peon-negro-${squareId}`
        };
    } else if (row === 2) {
        return {
            squareId,
            pieceColor: 'blanco',
            pieceType: 'peon',
            pieceId: `peon-blanco-${squareId}`
        };
    } else if (row === 1) {
        const pieces = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];
        return {
            squareId,
            pieceColor: 'blanco',
            pieceType: pieces[index % 8],
            pieceId: `${pieces[index % 8]}-blanco-${squareId}`
        };
    } else {
        return {
            squareId,
            pieceColor: 'blank',
            pieceType: 'blank',
            pieceId: 'blank'
        };
    }
});


export const Tablero = () => {





  
  return (
    <div>
        
    </div>
  )
}
