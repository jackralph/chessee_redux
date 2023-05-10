import { calculateLegalMoves, calculateAllMoves } from '../move/move.js'
import { 
    boardAlgebraicArray,
    boardOctalArray,
    startingPositionPieceArray,
    startingPositionPieceArrayTest,
    pieceRef
} from "./board.const.js";
import {
    placePiece,
    setPieceColor
} from './board.shared.js'

export function setBoardState() {
    let boardState = {};

    boardOctalArray.map(function(octalSquare, i) {
        const hasPiece = startingPositionPieceArray[i] !== null;
        if (hasPiece) {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare,
                piece: {
                    hasMoved: false,
                    legalMoves: [],
                    pieceColor: setPieceColor(startingPositionPieceArray[i]),
                    pieceName: placePiece(startingPositionPieceArray[i], octalSquare)
                },
                piecesAttackingThisSquare: []
            };
        } else {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare,
                piecesAttackingThisSquare: []
            };
        }
    });

    for (const square in boardState) {
        const hasPiece = !!boardState[square].piece;

        if (hasPiece) {
            const pieceColor = boardState[square].piece.pieceColor;
            const pieceName = boardState[square].piece.pieceName;
            const legalMoves = calculateLegalMoves(boardOctalArray, boardState, pieceColor, pieceName, square);
            const allMoves = calculateAllMoves(boardOctalArray, boardState, pieceColor, pieceName, square);

            console.group(`${pieceName} on square ${square}`);
            console.log(`legalMoves: ${legalMoves}`);
            console.log(`allMoves: ${allMoves}`);
            console.groupEnd();
            
            allMoves.map(function(legalMove) {
                return boardState[legalMove].piecesAttackingThisSquare.push(square);
            });

            boardState[square].piece.legalMoves = legalMoves;
        }
    }

    return boardState;
}

export function updateBoardState(boardState, originSquare, targetSquare) {
    let boardStateCopy = { ...boardState };

    const originSquareState = boardStateCopy[originSquare];
    const targetSquareState = boardStateCopy[targetSquare];

    boardStateCopy[targetSquare] = {
        ...targetSquareState,
        piece: {
            ...originSquareState.piece,
            hasMoved: true
        }
    }

    boardStateCopy[originSquare] = {
        algebraicNotation: originSquareState.algebraicNotation,
        octalNotation: originSquareState.octalNotation
    }

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const legalMoves = calculateLegalMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);

            boardStateCopy[square] = {
                ...boardStateCopy[square],
                piece: {
                    ...boardStateCopy[square].piece,
                    legalMoves: legalMoves
                },
            };
        };
    };

    let piecesAttackingThisSquare = {};

    boardOctalArray.map(function(octalSquare) {
        return piecesAttackingThisSquare[octalSquare] = []
    });

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const allMoves = calculateAllMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);

            allMoves.map(function(move) {
                return piecesAttackingThisSquare[move].push(square);
            });
        };
    };

    for (const square in boardStateCopy) {
        boardStateCopy[square] = {
            ...boardStateCopy[square],
            piecesAttackingThisSquare: piecesAttackingThisSquare[square]
        };
    }

    return boardStateCopy;
}