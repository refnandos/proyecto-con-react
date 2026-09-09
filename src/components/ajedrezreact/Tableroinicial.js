import /*React,*/ { useState, /*useEffect,*/ useCallback } from "react";
import "./css/chessStyle.css";
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

export const Tableroinicial = () => {
    const [boardSquaresArray, setBoardSquaresArray] = useState(initialBoard);
    const [isWhiteTurn, setIsWhiteTurn] = useState(true);
    const [whiteKingSquare, setWhiteKingSquare] = useState("e1");
    const [blackKingSquare, setBlackKingSquare] = useState("e8");
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [validMoves, setValidMoves] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [gameStatus, setGameStatus] = useState("playing");
    const [kingInCheck, setKingInCheck] = useState({ white: false, black: false });

    const deepCopyArray = useCallback((array) => {
        return array.map(element => ({ ...element }));
    }, []);

    const getPieceAtSquare = useCallback((squareId) => {
        const currentSquare = boardSquaresArray.find(
            (element) => element.squareId === squareId
        );
        return {
            pieceColor: currentSquare.pieceColor,
            pieceType: currentSquare.pieceType,
            pieceId: currentSquare.pieceId
        };
    }, [boardSquaresArray]);




    /************************************************************************************************************************************************************************************************************************** */
    /* CABALLO: Movimiento de captura y de comprovacion*/
    const getKnightMoves = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charCodeAt(0) - 97;
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];

        const moves = [
            [-2, 1], [-1, 2], [1, 2], [2, 1],
            [2, -1], [1, -2], [-1, -2], [-2, -1]
        ];

        moves.forEach((move) => {
            const currentFile = file + move[0];
            const currentRank = rankNumber + move[1];
            if (currentFile >= 0 && currentFile <= 7 && currentRank > 0 && currentRank <= 8) {
                const currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
                const squareContent = getPieceAtSquare(currentSquareId);
                if (squareContent.pieceColor === "blank" || squareContent.pieceColor !== pieceColor) {
                    legalSquares.push(currentSquareId);

                }
            }
        });
        return legalSquares;
    }, [getPieceAtSquare]);


    /************************************************************************************************************************************************************************************************************************** */
    // Funciones de movimiento de piezas
    /* PEON: capturaDiagonal */
    const checkPawnDiagonalCaptures = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charAt(0);
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];
        let currentFile = file;
        let currentRank = rankNumber;

        const direction = pieceColor === "blanco" ? 1 : -1;
        if (!(rank === "8" && direction === 1) && !(rank === "1" && direction === -1)) {
            currentRank += direction;
        }

        for (let i = -1; i <= 1; i += 2) {
            currentFile = String.fromCharCode(file.charCodeAt(0) + i);
            if (currentFile >= "a" && currentFile <= "h" && currentRank <= 8 && currentRank >= 1) {
                const currentSquareId = currentFile + currentRank;
                const squareContent = getPieceAtSquare(currentSquareId);
                if (squareContent.pieceColor !== "blank" && squareContent.pieceColor !== pieceColor) {
                    legalSquares.push(currentSquareId);
                }
            }
        }
        return legalSquares;
    }, [getPieceAtSquare]);

    /*PEON: comprobar movimiento */
    const checkPawnForwardMoves = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charAt(0);
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];

        const direction = pieceColor === "blanco" ? 1 : -1;
        let currentRank = rankNumber + direction;
        const currentSquareId = file + currentRank;
        const squareContent = getPieceAtSquare(currentSquareId);

        if (squareContent.pieceColor !== "blank") return legalSquares;
        legalSquares.push(currentSquareId);

        if ((rankNumber !== 2 && pieceColor === "blanco") && (rankNumber !== 7 && pieceColor === "negro")) return legalSquares;
        currentRank += direction;
        
        const doubleMoveSquareId = file + currentRank;
        const doubleMoveContent = getPieceAtSquare(doubleMoveSquareId);
        if (doubleMoveContent.pieceColor !== "blank") return legalSquares;
        legalSquares.push(doubleMoveSquareId);

        return legalSquares;
    }, [getPieceAtSquare]);



    /************************************************************************************************************************************************************************************************************************** */
    /*ALFIL: MOVIMIENTOS DIAGONALES Y CAPTURAS */
    const getBishopMoves = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charAt(0);
        const fileCode = file.charCodeAt(0);
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];

        // Movimiento diagonal superior derecha
        for (let i = 1; i <= 7; i++) {
            const newFile = String.fromCharCode(fileCode + i);
            const newRank = rankNumber + i;
            if (newFile > 'h' || newRank > 8) break;
            const squareId = newFile + newRank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento diagonal superior izquierda
        for (let i = 1; i <= 7; i++) {
            const newFile = String.fromCharCode(fileCode - i);
            const newRank = rankNumber + i;
            if (newFile < 'a' || newRank > 8) break;
            const squareId = newFile + newRank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento diagonal inferior derecha
        for (let i = 1; i <= 7; i++) {
            const newFile = String.fromCharCode(fileCode + i);
            const newRank = rankNumber - i;
            if (newFile > 'h' || newRank < 1) break;
            const squareId = newFile + newRank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento diagonal inferior izquierda
        for (let i = 1; i <= 7; i++) {
            const newFile = String.fromCharCode(fileCode - i);
            const newRank = rankNumber - i;
            if (newFile < 'a' || newRank < 1) break;
            const squareId = newFile + newRank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        return legalSquares;
    }, [getPieceAtSquare]);


    /************************************************************************************************************************************************************************************************************************** */
    /*Torre: Movimiento y Comporvacion*/
    const getRookMoves = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charAt(0);
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];

        // Movimiento hacia arriba (aumentar rango)
        for (let r = rankNumber + 1; r <= 8; r++) {
            const squareId = file + r;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento hacia abajo (disminuir rango)
        for (let r = rankNumber - 1; r >= 1; r--) {
            const squareId = file + r;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento a la izquierda (disminuir file)
        for (let f = file.charCodeAt(0) - 1; f >= 97; f--) {
            const squareId = String.fromCharCode(f) + rank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        // Movimiento a la derecha (aumentar file)
        for (let f = file.charCodeAt(0) + 1; f <= 104; f++) {
            const squareId = String.fromCharCode(f) + rank;
            const squareContent = getPieceAtSquare(squareId);
            if (squareContent.pieceColor === pieceColor) break;
            legalSquares.push(squareId);
            if (squareContent.pieceColor !== "blank") break;
        }

        return legalSquares;
    }, [getPieceAtSquare]);


    /************************************************************************************************************************************************************************************************************************** */
    /*REYNA: MOVIMIENTO Y CAPTURAS reciclado*/
    const getQueenMoves = useCallback((startingSquareId, pieceColor) => {
        const rookMoves = getRookMoves(startingSquareId, pieceColor);
        const bishopMoves = getBishopMoves(startingSquareId, pieceColor);
        return [...rookMoves, ...bishopMoves];
    }, [getRookMoves, getBishopMoves]);



    /************************************************************************************************************************************************************************************************************************** */
    /*IsKingCheck comprovacion de jake*/
    const isKingInCheck = useCallback((squareId, pieceColor) => {
        const opponentColor = pieceColor === 'blanco' ? 'negro' : 'blanco';

        // Verificar ataques de torres y reinas (filas/columnas)
        const rookDirections = [
            { file: 0, rank: 1 }, { file: 0, rank: -1 },
            { file: 1, rank: 0 }, { file: -1, rank: 0 }
        ];

        for (const dir of rookDirections) {
            let file = squareId.charCodeAt(0) - 97 + dir.file;
            let rank = parseInt(squareId.charAt(1)) + dir.rank;

            while (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
                const currentSquareId = String.fromCharCode(file + 97) + rank;
                const squareContent = getPieceAtSquare(currentSquareId);

                if (squareContent.pieceColor !== 'blank') {
                    if (squareContent.pieceColor === opponentColor &&
                        (squareContent.pieceType === 'torre' || squareContent.pieceType === 'reina')) {
                        // console.trace("jaque en linea"+ squareContent.pieceType + " " + opponentColor + " " + currentSquareId);
                        return (true);
                    }
                    break;
                }

                file += dir.file;
                rank += dir.rank;
            }
        }

        // Verificar ataques de alfiles y reinas (diagonales)
        const bishopDirections = [
            { file: 1, rank: 1 }, { file: 1, rank: -1 },
            { file: -1, rank: 1 }, { file: -1, rank: -1 }
        ];

        for (const dir of bishopDirections) {
            let file = squareId.charCodeAt(0) - 97 + dir.file;
            let rank = parseInt(squareId.charAt(1)) + dir.rank;

            while (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
                const currentSquareId = String.fromCharCode(file + 97) + rank;
                const squareContent = getPieceAtSquare(currentSquareId);

                if (squareContent.pieceColor !== 'blank') {
                    if (squareContent.pieceColor === opponentColor &&
                        (squareContent.pieceType === 'alfil' || squareContent.pieceType === 'reina')) {
                        // console.log("jaque en diagonal"+ squareContent.pieceType+ " " + opponentColor + " " + currentSquareId);
                        return (true);
                    }
                    break;
                }

                file += dir.file;
                rank += dir.rank;
            }
        }

        // Verificar ataques de caballos
        const knightMoves = getKnightMoves(squareId, pieceColor);
        for (const move of knightMoves) {
            const squareContent = getPieceAtSquare(move);
            if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'caballo') {
                // console.trace(new Date().toLocaleTimeString() +  "jaque de caballo"+ squareContent.pieceType+ " " + opponentColor + " " + squareId);

                return (true);
            }
        }

        // Verificar ataques de peones
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
                const squareContent = getPieceAtSquare(currentSquareId);

                if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'peon') {
                    return (true);
                }
            }
        }

        // Verificar ataques del rey contrario
        const kingOffsets = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [fileOffset, rankOffset] of kingOffsets) {
            const file = squareId.charCodeAt(0) - 97 + fileOffset;
            const rank = parseInt(squareId.charAt(1)) + rankOffset;

            if (file >= 0 && file <= 7 && rank >= 1 && rank <= 8) {
                const currentSquareId = String.fromCharCode(file + 97) + rank;
                const squareContent = getPieceAtSquare(currentSquareId);

                if (squareContent.pieceColor === opponentColor && squareContent.pieceType === 'rey') {
                    return true;
                }
            }
        }
        setAlertMessage("");
        return (false);
    }, [getPieceAtSquare, getKnightMoves]);



    /************************************************************************************************************************************************************************************************************************** */
    /*REY: MOVIMIENTOS DIAGONALES Y CAPTURAS DIFICIL */
    const getKingMoves = useCallback((startingSquareId, pieceColor) => {
        const file = startingSquareId.charCodeAt(0) - 97;
        const rank = startingSquareId.charAt(1);
        const rankNumber = parseInt(rank);
        let legalSquares = [];

        const moves = [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];

        moves.forEach(([fileOffset, rankOffset]) => {
            const newFile = file + fileOffset;
            const newRank = rankNumber + rankOffset;

            if (newFile >= 0 && newFile <= 7 && newRank >= 1 && newRank <= 8) {
                const squareId = String.fromCharCode(newFile + 97) + newRank;
                const squareContent = getPieceAtSquare(squareId);
                if (squareContent.pieceColor !== pieceColor) {
                    legalSquares.push(squareId);
                }
            }
        });

        // Enroque (implementación básica)
        if (!isKingInCheck(startingSquareId, pieceColor)) {
            // Enroque corto (lado rey)
            const shortCastleSquare = pieceColor === 'blanco' ? 'h1' : 'h8';
            const shortCastleRook = getPieceAtSquare(shortCastleSquare);
            if (shortCastleRook.pieceType === 'torre' && shortCastleRook.pieceColor === pieceColor) {
                const intermediate1 = pieceColor === 'blanco' ? 'f1' : 'f8';
                const intermediate2 = pieceColor === 'blanco' ? 'g1' : 'g8';

                const square1 = getPieceAtSquare(intermediate1);
                const square2 = getPieceAtSquare(intermediate2);

                if (square1.pieceColor === 'blank' && square2.pieceColor === 'blank') {
                    if (!isKingInCheck(intermediate1, pieceColor) && !isKingInCheck(intermediate2, pieceColor)) {
                        legalSquares.push(pieceColor === 'blanco' ? 'g1' : 'g8');
                    }
                }
            }

            // Enroque largo (lado reina)
            const longCastleSquare = pieceColor === 'blanco' ? 'a1' : 'a8';
            const longCastleRook = getPieceAtSquare(longCastleSquare);
            if (longCastleRook.pieceType === 'torre' && longCastleRook.pieceColor === pieceColor) {
                const intermediate1 = pieceColor === 'blanco' ? 'd1' : 'd8';
                const intermediate2 = pieceColor === 'blanco' ? 'c1' : 'c8';
                const intermediate3 = pieceColor === 'blanco' ? 'b1' : 'b8';

                const square1 = getPieceAtSquare(intermediate1);
                const square2 = getPieceAtSquare(intermediate2);
                const square3 = getPieceAtSquare(intermediate3);

                if (square1.pieceColor === 'blank' && square2.pieceColor === 'blank' && square3.pieceColor === 'blank') {
                    if (!isKingInCheck(intermediate1, pieceColor) && !isKingInCheck(intermediate2, pieceColor)) {
                        legalSquares.push(pieceColor === 'blanco' ? 'c1' : 'c8');
                    }
                }
            }
        }

        return legalSquares;
    }, [getPieceAtSquare, isKingInCheck]);


    /*movimiento en contra de jake  Nuevo*/
    const isMoveValidAgainstCheck = useCallback((legalSquares, startingSquareId, pieceColor, pieceType) => {
        const kingSquare = pieceColor === 'blanco' ? whiteKingSquare : blackKingSquare;
        const filteredMoves = [];

        legalSquares.forEach((destinationId) => {
            const boardCopy = deepCopyArray(boardSquaresArray);
            const currentSquare = boardCopy.find(e => e.squareId === startingSquareId);
            const destinationSquare = boardCopy.find(e => e.squareId === destinationId);

            // Simular movimiento
            destinationSquare.pieceColor = currentSquare.pieceColor;
            destinationSquare.pieceType = currentSquare.pieceType;
            destinationSquare.pieceId = currentSquare.pieceId;
            currentSquare.pieceColor = "blank";
            currentSquare.pieceType = "blank";
            currentSquare.pieceId = "blank";

            let isCheck;
            if (pieceType === "rey") {
                isCheck = isKingInCheck(destinationId, pieceColor);
                console.log("getPossibleMoves: 505 | " + isKingInCheck(destinationSquare.pieceId, destinationSquare.pieceColor));

                // console.trace(new Date().toLocaleTimeString() + " | isMoveValidAgainstCheck:540 | validacion de jaque rey | posicion:"+ destinationId +" | rey en jaque? "+ isCheck);
            } else {
                isCheck = isKingInCheck(kingSquare, pieceColor);
                // console.trace(new Date().toLocaleTimeString() +  " | isMoveValidAgainstCheck:540 | validacion de jaque pieza:" + pieceType + " | posicion:"+ destinationId +" | rey en jaque? "+ isCheck);
            }

            if (!isCheck) {
                filteredMoves.push(destinationId);

            }
        });

        return filteredMoves;
    }, [boardSquaresArray, deepCopyArray, isKingInCheck, whiteKingSquare, blackKingSquare]);



    const getPossibleMoves = useCallback((startingSquareId, piece) => {
        const pieceColor = piece.pieceColor;
        const pieceType = piece.pieceType;

        switch (pieceType) {
            case "peon":
                const diagonal = checkPawnDiagonalCaptures(startingSquareId, pieceColor);
                const forward = checkPawnForwardMoves(startingSquareId, pieceColor);
                return [...diagonal, ...forward];

            case "caballo":
                return getKnightMoves(startingSquareId, pieceColor);

            case "alfil":
                return getBishopMoves(startingSquareId, pieceColor);

            case "torre":
                return getRookMoves(startingSquareId, pieceColor);

            case "reina":
                return getQueenMoves(startingSquareId, pieceColor);

            case "rey":
                return getKingMoves(startingSquareId, pieceColor);

            default:
                console.log("getPossibleMoves: 548 | " + isKingInCheck(piece.pieceId, piece.pieceColor));
                return [];
        }
    }, [
        checkPawnDiagonalCaptures,
        checkPawnForwardMoves,
        getKnightMoves,
        getBishopMoves,
        getRookMoves,
        getQueenMoves,
        getKingMoves
    ]);


    // Implementación de getAllPossibleMoves
    const getAllPossibleMoves = useCallback((color) => {
        return boardSquaresArray
            .filter(square => square.pieceColor === color)
            .flatMap(square => {
                const piece = getPieceAtSquare(square.squareId);
                if (piece.pieceId === "blank") return [];

                let moves = getPossibleMoves(square.squareId, piece);
                moves = isMoveValidAgainstCheck(moves, square.squareId, piece.pieceColor, piece.pieceType);
                return moves.map(move => ({
                    from: square.squareId,
                    to: move
                }));
            });
    }, [boardSquaresArray, getPieceAtSquare, getPossibleMoves, isMoveValidAgainstCheck]);

    // Formas de finalizar el juego
    const checkForGameEnd = useCallback(() => {
        const currentPlayerColor = isWhiteTurn ? 'blanco' : 'negro';
        const kingSquare = currentPlayerColor === 'blanco' ? whiteKingSquare : blackKingSquare;

        // 1. Verificar jaque mate
        const inCheck = isKingInCheck(kingSquare, currentPlayerColor);
        const possibleMoves = getAllPossibleMoves(currentPlayerColor);

        if (inCheck && possibleMoves.length === 0) {
            setGameStatus('checkmate');
            setAlertMessage(`¡Jaque mate! ${isWhiteTurn ? 'Negras' : 'Blancas'} ganan.`);
            setKingInCheck({ white: false, black: false });
            return true;
        }

        // 2. Verificar ahogado (stalemate)
        if (!inCheck && possibleMoves.length === 0) {
            setGameStatus('stalemate');
            setAlertMessage("¡Ahogado! Empate.");
            return true;
        }

        // 3. Verificar material insuficiente
        if (isInsufficientMaterial()) {
            setGameStatus('draw');
            setAlertMessage("Empate por material insuficiente.");
            return true;
        }


        return false;
    }, [isWhiteTurn, whiteKingSquare, blackKingSquare, isKingInCheck, getAllPossibleMoves]);

    const isInsufficientMaterial = useCallback(() => {
        const pieces = boardSquaresArray.filter(sq => sq.pieceColor !== 'blank');

        // Solo reyes
        if (pieces.length === 2) return true;

        // Rey + alfil vs Rey
        // Rey + caballo vs Rey
        if (pieces.length === 3) {
            const bishops = pieces.filter(p => p.pieceType === 'alfil');
            const knights = pieces.filter(p => p.pieceType === 'caballo');
            return bishops.length === 1 || knights.length === 1;
        }

        // Rey + 2 caballos vs Rey (raro, pero técnicamente no es mate forzado)
        // Alfiles del mismo color
        // Implementar más casos según sea necesario

        return false;
    }, [boardSquaresArray]);

    const updateBoardSquaresArray = useCallback((currentSquareId, destinationSquareId) => {
        setBoardSquaresArray(prev => {
            const newArray = deepCopyArray(prev);
            const currentSquare = newArray.find(
                (element) => element.squareId === currentSquareId
            );
            const destinationSquare = newArray.find(
                (element) => element.squareId === destinationSquareId
            );

            destinationSquare.pieceColor = currentSquare.pieceColor;
            destinationSquare.pieceType = currentSquare.pieceType;
            destinationSquare.pieceId = currentSquare.pieceId;

            currentSquare.pieceColor = "blank";
            currentSquare.pieceType = "blank";
            currentSquare.pieceId = "blank";

            return newArray;
        });
    }, [deepCopyArray]);



    const handleSquareDrop = (e, destinationSquareId) => {
        e.preventDefault();
        if (gameStatus !== 'playing') return;
        const startingSquareId = e.dataTransfer.getData("text/plain");

        if (!startingSquareId || !validMoves.includes(destinationSquareId)) return;

        const piece = getPieceAtSquare(startingSquareId);
        const destinationContent = getPieceAtSquare(destinationSquareId);
        const opponentColor = piece.pieceColor === 'blanco' ? 'negro' : 'blanco';
        // Captura al paso
        if (piece.pieceType === 'peon' && destinationContent.pieceColor === 'blank' &&
            startingSquareId.charAt(0) !== destinationSquareId.charAt(0)) {
            // Es una captura al paso, eliminar el peón capturado
            const direction = piece.pieceColor === 'blanco' ? 1 : -1;
            const capturedPawnRank = parseInt(destinationSquareId.charAt(1)) - direction;
            const capturedPawnSquare = destinationSquareId.charAt(0) + capturedPawnRank;

            setBoardSquaresArray(prev => {
                const newArray = deepCopyArray(prev);
                const capturedSquare = newArray.find(sq => sq.squareId === capturedPawnSquare);
                capturedSquare.pieceColor = 'blank';
                capturedSquare.pieceType = 'blank';
                capturedSquare.pieceId = 'blank';
                return newArray;
            });
        }
        // Movimiento del rey (actualizar posición)
        if (piece.pieceType === 'rey') {
            const isCheck = isKingInCheck(destinationSquareId, piece.pieceColor);
            // console.log("handleSquareDrop:723" + isCheck);
            if (isCheck) return;

            // Enroque - mover la torre también
            if (Math.abs(startingSquareId.charCodeAt(0) - destinationSquareId.charCodeAt(0)) === 2) {
                setBoardSquaresArray(prev => {
                    const newArray = deepCopyArray(prev);

                    // Enroque corto (0-0)
                    if (destinationSquareId.charAt(0) === 'g') {
                        const rookSquare = piece.pieceColor === 'blanco' ? 'h1' : 'h8';
                        const newRookSquare = piece.pieceColor === 'blanco' ? 'f1' : 'f8';

                        const rook = newArray.find(sq => sq.squareId === rookSquare);
                        const newRookPos = newArray.find(sq => sq.squareId === newRookSquare);

                        newRookPos.pieceColor = rook.pieceColor;
                        newRookPos.pieceType = rook.pieceType;
                        newRookPos.pieceId = rook.pieceId;

                        rook.pieceColor = 'blank';
                        rook.pieceType = 'blank';
                        rook.pieceId = 'blank';
                    }
                    // Enroque largo (0-0-0)
                    else if (destinationSquareId.charAt(0) === 'c') {
                        const rookSquare = piece.pieceColor === 'blanco' ? 'a1' : 'a8';
                        const newRookSquare = piece.pieceColor === 'blanco' ? 'd1' : 'd8';

                        const rook = newArray.find(sq => sq.squareId === rookSquare);
                        const newRookPos = newArray.find(sq => sq.squareId === newRookSquare);

                        newRookPos.pieceColor = rook.pieceColor;
                        newRookPos.pieceType = rook.pieceType;
                        newRookPos.pieceId = rook.pieceId;

                        rook.pieceColor = 'blank';
                        rook.pieceType = 'blank';
                        rook.pieceId = 'blank';
                    }

                    return newArray;
                });
            }

            piece.pieceColor === 'blanco'
                ? setWhiteKingSquare(destinationSquareId)
                : setBlackKingSquare(destinationSquareId);
        }

        // Promoción de peón
        // let promotedPiece = piece;
        if (piece.pieceType === 'peon' &&
            (destinationSquareId.charAt(1) === '8' || destinationSquareId.charAt(1) === '1')) {
            // Por defecto promueve a reina (podrías añadir un diálogo para elegir)
            promotedPiece = {
                ...piece,
                pieceType: 'reina',
                pieceId: `reina-${piece.pieceColor}-${destinationSquareId}`
            };
        }

        // Actualizar el tablero
        updateBoardSquaresArray(startingSquareId, destinationSquareId);
        //Verificar solo jaque
        const opponentKingSquare = opponentColor === 'blanco' ? whiteKingSquare : blackKingSquare;
        const isOpponentKingInCheck = isKingInCheck(opponentKingSquare, opponentColor);
        console.log("rey oponente en jaque" + isOpponentKingInCheck);
        if (isOpponentKingInCheck) {
            setAlertMessage(`¡Jaque! El rey ${opponentColor} en ${opponentKingSquare} está en peligro`);
            setKingInCheck(prev => ({
                ...prev,
                [opponentColor]: true
            }));
        } else {
            setAlertMessage("");
            setKingInCheck(prev => ({
                ...prev,
                [opponentColor]: false
            }));
        }

        setIsWhiteTurn(!isWhiteTurn);
        setSelectedPiece(null);
        setValidMoves([]);


        // Verificar jaque mate
        checkForGameEnd();

    };


    const handlePieceDragStart = (e, squareId) => {
        const piece = getPieceAtSquare(squareId);
        if ((isWhiteTurn && piece.pieceColor === "blanco") || (!isWhiteTurn && piece.pieceColor === "negro")) {
            setSelectedPiece({ ...piece, squareId });
            let legalSquares = getPossibleMoves(squareId, piece);

            legalSquares = isMoveValidAgainstCheck(legalSquares, squareId, piece.pieceColor, piece.pieceType);
            setValidMoves(legalSquares);
            console.log("handlePieceDragStart:772 | pieza: " + piece.pieceType + "| movimientos disponibles |" + legalSquares);
            e.dataTransfer.setData("text/plain", squareId);
        } else {
            e.preventDefault();
        }
        // if (piece.pieceType === 'rey') {
        //     const isCheck = isKingInCheck(squareId, piece.pieceColor);
        // }
    };


    const renderSquare = (square, index) => {
        const isLight = (Math.floor(index / 8) + (index % 8)) % 2 === 0;
        const squareClass = isLight ? "Cuadrado Blanco" : "Cuadrado Negro";
        const isSelected = selectedPiece?.squareId === square.squareId;
        const isValidMove = validMoves.includes(square.squareId);

        const isKingInCheckSquare =
            (square.pieceType === 'rey' && square.pieceColor === 'blanco' && kingInCheck.white) ||
            (square.pieceType === 'rey' && square.pieceColor === 'negro' && kingInCheck.black);


        const rank = square.squareId.charAt(1);
        const file = square.squareId.charAt(0);
        const showRank = index % 8 === 0;
        const showFile = index >= 56;

        const renderPiece = () => {
            if (square.pieceColor === "blank") return null;

            const pieceImages = {
                'torre-blanco': torreBlanco,
                'caballo-blanco': CaballoBlanco,
                'alfil-blanco': AlfilBlanco,
                'rey-blanco': ReyBlanco,
                'reina-blanco': ReinaBlanco,
                'peon-blanco': PeonBlanco,
                'torre-negro': torreNegro,
                'caballo-negro': CaballoNegro,
                'alfil-negro': AlfilNegro,
                'rey-negro': ReyNegro,
                'reina-negro': ReinaNegro,
                'peon-negro': PeonNegro
            };

            const imgKey = `${square.pieceType}-${square.pieceColor}`;
            return (
                <div
                    className={`pieza ${square.pieceType}`}
                    color={square.pieceColor}
                    draggable
                    onDragStart={(e) => handlePieceDragStart(e, square.squareId)}
                >
                    <img src={pieceImages[imgKey]} alt={square.pieceType} draggable={false} />
                </div>
            );
        };

        return (
            <div
                key={square.squareId}
                className={`${squareClass} ${isSelected ? "selected" : ""} ${isValidMove ? "valid-move" : ""} ${isKingInCheckSquare ? "king-in-check" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleSquareDrop(e, square.squareId)}
            >
                {showRank && <div className={`coordenada rango ${isLight ? "textoBlanco" : "textoNegro"}`}>{rank}</div>}
                {showFile && <div className={`coordenada ${isLight ? "textoBlanco" : "textoNegro"}`}>{file}</div>}
                {renderPiece()}
            </div>
        );
    };

    return (
        <div className="contenedor-comun">
            {gameStatus !== 'playing' && (
                <div className="game-over-modal">
                    <h2>{alertMessage}</h2>
                    <button onClick={() => {
                        setBoardSquaresArray(initialBoard);
                        setIsWhiteTurn(true);
                        setWhiteKingSquare("e1");
                        setBlackKingSquare("e8");
                        setGameStatus("playing");
                        setAlertMessage("");
                    }}>
                        Jugar otra vez
                    </button>
                </div>
            )}
            <div className="mensajePartida">
                <h2>{alertMessage}</h2>
            </div>
            <div className={`Tablero ${gameStatus !== 'playing' ? 'game-over' : ''}`}>
                {boardSquaresArray.map((square, index) => renderSquare(square, index))}
            </div>
        </div>
    );
};