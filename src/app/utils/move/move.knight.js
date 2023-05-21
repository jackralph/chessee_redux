import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let legalKnightMovesArray = [];
    const squareNumber = Number(square);

    const northTwoWestOne = squareNumber - 21;
    const northTwoEastOne = squareNumber - 19;
    const eastTwoNorthOne = squareNumber - 8;
    const eastTwoSouthOne = squareNumber + 12;
    const southTwoEastOne = squareNumber + 21;
    const southTwoWestOne = squareNumber + 19;
    const westTwoSouthOne = squareNumber + 8;
    const westTwoNorthOne = squareNumber - 12;

    [
        northTwoWestOne,
        northTwoEastOne,
        eastTwoNorthOne,
        eastTwoSouthOne,
        southTwoEastOne,
        southTwoWestOne,
        westTwoSouthOne,
        westTwoNorthOne
    ].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, limiter, move)) {
            if (!squareHasPiece(boardState, move)) {
                return legalKnightMovesArray.push(move);
            } else if (!pieceIsSameColor(boardState, move, pieceColor)) {
                return legalKnightMovesArray.push(move);
            }
            return null;
        }
        return null;
    });

    return legalKnightMovesArray;
}

export function legalKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    const legalKnightMovesArray = calculateLegalKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return legalKnightMovesArray;
}

export function allKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let knightMovesArray = [];

    const squareNumber = Number(square);

    const northTwoWestOne = squareNumber - 21;
    const northTwoEastOne = squareNumber - 19;
    const eastTwoNorthOne = squareNumber - 8;
    const eastTwoSouthOne = squareNumber + 12;
    const southTwoEastOne = squareNumber + 21;
    const southTwoWestOne = squareNumber + 19;
    const westTwoSouthOne = squareNumber + 8;
    const westTwoNorthOne = squareNumber - 12;

    [
        northTwoWestOne,
        northTwoEastOne,
        eastTwoNorthOne,
        eastTwoSouthOne,
        southTwoEastOne,
        southTwoWestOne,
        westTwoSouthOne,
        westTwoNorthOne
    ].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, limiter, move)) {
            return knightMovesArray.push(move);
        }
        return null;
    });
    
    return knightMovesArray;
}