import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesArray = [];

    const north = square - 10;
    const northEast = square - 9;
    const east = square + 1;
    const southEast = square + 11;
    const south = square + 10;
    const southWest = square + 9;
    const west = square - 1;
    const northWest = square - 11;

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
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
            if (!squareHasPiece(boardState, move) || !pieceIsSameColor(boardState, move, pieceColor)) {
                legalMovesArray.push(move);
            }

            return null;
        }

        return null;
    })

    return legalMovesArray;
}

export function legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalKingMoves = calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return legalKingMoves;
}

// all

function calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesArray = [];

    const north = square - 10;
    const northEast = square - 9;
    const east = square + 1;
    const southEast = square + 11;
    const south = square + 10;
    const southWest = square + 9;
    const west = square - 1;
    const northWest = square - 11;

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
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
            allMovesArray.push(move);
        }

        return null;
    })

    return allMovesArray;
}

export function allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allKingMoves = calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return allKingMoves;
}