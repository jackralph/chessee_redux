import {
    pieceIsSameColor,
    squareHasPiece,
    validSquareV2
} from './move.shared.js'

// legal

function calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesArray = [];
    const squareNumber = Number(square);

    const north = squareNumber - 10;
    const northEast = squareNumber - 9;
    const east = squareNumber + 1;
    const southEast = squareNumber + 11;
    const south = squareNumber + 10;
    const southWest = squareNumber + 9;
    const west = squareNumber - 1;
    const northWest = squareNumber - 11;

    [
        north,
        northEast,
        east,
        southEast,
        south,
        southWest,
        west,
        northWest
    ].map(function(move) {
        if (validSquareV2(BOARD_OCTAL_ARRAY, move)) {
            if (!squareHasPiece(boardState, move) || !pieceIsSameColor(boardState, move, pieceColor)) {
                legalMovesArray.push(move);
            }
        }
    })

    return legalMovesArray;
}

export function legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalKingMoves = calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return legalKingMoves;
}

// all

function calculateAllMovesKing(BOARD_OCTAL_ARRAY, square) {
    let allMovesArray = [];
    const squareNumber = Number(square);

    const north = squareNumber - 10;
    const northEast = squareNumber - 9;
    const east = squareNumber + 1;
    const southEast = squareNumber + 11;
    const south = squareNumber + 10;
    const southWest = squareNumber + 9;
    const west = squareNumber - 1;
    const northWest = squareNumber - 11;

    [
        north,
        northEast,
        east,
        southEast,
        south,
        southWest,
        west,
        northWest
    ].map(function(move) {
        if (validSquareV2(BOARD_OCTAL_ARRAY, move)) {
            allMovesArray.push(move);
        }
    })

    return allMovesArray;
}

export function allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allKingMoves = calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return allKingMoves;
}