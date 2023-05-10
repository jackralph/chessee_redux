import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalHorizontalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalHorizontalMovesArray = [];
    const squareNumber = Number(square);

    for (let i = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            legalHorizontalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalHorizontalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return legalHorizontalMovesArray;
}

export function legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "east" moves
    const legalHorizontalEastMovesArray = calculateLegalHorizontalMoves(1, boardOctalArray, boardState, limiter, pieceColor, square);

    // "west" moves
    const legalHorizontalWestMovesArray = calculateLegalHorizontalMoves(-1, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalHorizontalEastMovesArray,
        ...legalHorizontalWestMovesArray
    ];
}

// all

function calculateAllHorizontalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allHorizontalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            allHorizontalMovesArray.push(currentSquare);
            break;
        } else {
            allHorizontalMovesArray.push(currentSquare);
            continue;
        }
    }

    return allHorizontalMovesArray;
}

export function allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "east" moves
    const allHorizontalEastMovesArray = calculateAllHorizontalMoves(1, boardOctalArray, boardState, limiter, pieceColor, square);

    // "west" moves
    const allHorizontalWestMovesArray = calculateAllHorizontalMoves(-1, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...allHorizontalEastMovesArray,
        ...allHorizontalWestMovesArray
    ];
}