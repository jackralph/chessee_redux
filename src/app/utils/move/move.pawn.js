import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal diagonal

function calculateLegalDiagonalPawnMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let legalPawnMovesArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            break;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalPawnMovesArray.push(currentSquare);
            continue;
        }
    }

    return legalPawnMovesArray;
}

export function legalDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastPawnMovesArray = calculateLegalDiagonalPawnMoves(9 * pawnDirection, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "north-west" moves
    const legalNorthWestPawnMovesArray = calculateLegalDiagonalPawnMoves(11 * pawnDirection, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...legalNorthEastPawnMovesArray,
        ...legalNorthWestPawnMovesArray
    ]
}

// legal straight

function calculateLegalStraightPawnMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, square) {
    let legalStraightPawnMovesArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalStraightPawnMovesArray.push(currentSquare);
            continue;
        } else {
            break;
        }
    }

    return legalStraightPawnMovesArray;
}

export function legalStraightMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, square) {
    // "north" moves
    const legalStraightPawnMovesArray = calculateLegalStraightPawnMoves(10 * pawnDirection, BOARD_OCTAL_ARRAY, boardState, limiter, square);

    return legalStraightPawnMovesArray;
}

// all

function calculateAllDiagonalPawnMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let allDiagonalMovesPawnArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        allDiagonalMovesPawnArray.push(currentSquare);
    }

    return allDiagonalMovesPawnArray;
}

export function allDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, pieceColor, square) {
    // "north-east" moves
    const allNorthEastPawnMovesArray = calculateAllDiagonalPawnMoves(9 * pawnDirection, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "north-west" moves
    const allNorthWestPawnMovesArray = calculateAllDiagonalPawnMoves(11 * pawnDirection, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...allNorthEastPawnMovesArray,
        ...allNorthWestPawnMovesArray
    ]
}