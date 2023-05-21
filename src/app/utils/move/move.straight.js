import {
    isContinualStraightPiece,
    pieceIsKing,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalStraightMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let legalStraightMovesArray = [];
    const squareNumber = Number(square);

    for (let i = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, i, iteration); i += squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            legalStraightMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalStraightMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return legalStraightMovesArray;
}

export function legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north" moves
    const legalStraightNorthMovesArray = calculateLegalStraightMoves(-10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "east" moves
    const legalStraightEastMovesArray = calculateLegalStraightMoves(1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "south" moves
    const legalStraightSouthMovesArray = calculateLegalStraightMoves(10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "west" moves
    const legalStraightWestMovesArray = calculateLegalStraightMoves(-1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...legalStraightNorthMovesArray,
        ...legalStraightEastMovesArray,
        ...legalStraightSouthMovesArray,
        ...legalStraightWestMovesArray
    ];
}

// all

function calculateAllStraightMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let allStraightMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualStraightPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allStraightMovesArray.push(currentSquare);
            } else if (pieceIsKing(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allStraightMovesArray.push(currentSquare);
                break;
            } else {
                allStraightMovesArray.push(currentSquare);
                break;
            }
        } else {
            allStraightMovesArray.push(currentSquare);
            continue;
        }
    }

    return allStraightMovesArray;
}

export function allStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north" moves
    const allStraightNorthMovesArray = calculateAllStraightMoves(-10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "east" moves
    const allStraightEastMovesArray = calculateAllStraightMoves(1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "south" moves
    const allStraightSouthMovesArray = calculateAllStraightMoves(10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "west" moves
    const allStraightWestMovesArray = calculateAllStraightMoves(-1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...allStraightNorthMovesArray,
        ...allStraightEastMovesArray,
        ...allStraightSouthMovesArray,
        ...allStraightWestMovesArray
    ];
}