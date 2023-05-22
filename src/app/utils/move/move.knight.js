import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalKnightMovesArray = [];

    const northTwoWestOne = square - 21;
    const northTwoEastOne = square - 19;
    const eastTwoNorthOne = square - 8;
    const eastTwoSouthOne = square + 12;
    const southTwoEastOne = square + 21;
    const southTwoWestOne = square + 19;
    const westTwoSouthOne = square + 8;
    const westTwoNorthOne = square - 12;

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
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
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

export function legalKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalKnightMovesArray = calculateLegalKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return legalKnightMovesArray;
}

export function allKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let knightMovesArray = [];

    const northTwoWestOne = square - 21;
    const northTwoEastOne = square - 19;
    const eastTwoNorthOne = square - 8;
    const eastTwoSouthOne = square + 12;
    const southTwoEastOne = square + 21;
    const southTwoWestOne = square + 19;
    const westTwoSouthOne = square + 8;
    const westTwoNorthOne = square - 12;

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
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
            return knightMovesArray.push(move);
        }
        return null;
    });
    
    return knightMovesArray;
}