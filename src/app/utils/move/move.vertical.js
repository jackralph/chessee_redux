import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalVerticalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalVerticalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalVerticalMovesArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalVerticalMovesArray.push(currentSquare);
            break;
        } else {
            break;
        }
    }

    return legalVerticalMovesArray;
}

export function legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north" moves
    const legalVerticalNorthMovesArray = calculateLegalVerticalMoves(10, boardOctalArray, boardState, limiter, pieceColor, square);

    // "south" moves
    const legalVerticalSouthMovesArray = calculateLegalVerticalMoves(-10, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalVerticalNorthMovesArray,
        ...legalVerticalSouthMovesArray
    ];
}

// all

function calculateAllVerticalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allVerticalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            allVerticalMovesArray.push(currentSquare);
            break;
        } else {
            allVerticalMovesArray.push(currentSquare);
            continue;
        }
    }

    return allVerticalMovesArray;
}

export function allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north" moves
    const allVerticalNorthMovesArray = calculateAllVerticalMoves(10, boardOctalArray, boardState, limiter, pieceColor, square);

    // "south" moves
    const allVerticalSouthMovesArray = calculateAllVerticalMoves(-10, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...allVerticalNorthMovesArray,
        ...allVerticalSouthMovesArray
    ];
}