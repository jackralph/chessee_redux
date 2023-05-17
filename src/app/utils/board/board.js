import { calculateLegalMoves, calculateAllMoves } from '../move/move.js'
import { 
    boardAlgebraicArray,
    boardOctalArray,
    startingPositionPieceArray,
    startingPositionPieceArrayTest,
} from "./board.const.js";
import {
    placePiece,
    setPieceColor
} from './board.shared.js'

// set

function initialiseBoardState() {
    let boardState = {}

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

    return boardState
}

function calculateMovesForInitialBoardState(boardState) {
    let boardStateCopy = {...boardState};

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const legalMoves = calculateLegalMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);
            const allMoves = calculateAllMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);

            console.group(`${pieceName} on square ${square}`);
            console.log(`legalMoves: ${legalMoves}`);
            console.log(`allMoves: ${allMoves}`);
            console.groupEnd();
            
            allMoves.map(function(legalMove) {
                return boardStateCopy[legalMove].piecesAttackingThisSquare.push(square);
            });

            boardStateCopy[square].piece.legalMoves = legalMoves;
        }
    }

    return boardStateCopy;
}

export function setBoardState() {
    let boardState = initialiseBoardState();
    boardState = calculateMovesForInitialBoardState(boardState);

    return boardState;
}

// update

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