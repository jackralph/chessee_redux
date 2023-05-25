import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalKnightMovesArray = [];

    const northTwoWestOne = square + MOVE_DIRECTION.northTwoWestOne;
    const northTwoEastOne = square + MOVE_DIRECTION.northTwoEastOne;
    const eastTwoNorthOne = square + MOVE_DIRECTION.eastTwoNorthOne;
    const eastTwoSouthOne = square + MOVE_DIRECTION.eastTwoSouthOne;
    const southTwoEastOne = square + MOVE_DIRECTION.southTwoEastOne;
    const southTwoWestOne = square + MOVE_DIRECTION.southTwoWestOne;
    const westTwoSouthOne = square + MOVE_DIRECTION.westTwoSouthOne;
    const westTwoNorthOne = square + MOVE_DIRECTION.westTwoNorthOne;

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

    const northTwoWestOne = square + MOVE_DIRECTION.northTwoWestOne;
    const northTwoEastOne = square + MOVE_DIRECTION.northTwoEastOne;
    const eastTwoNorthOne = square + MOVE_DIRECTION.eastTwoNorthOne;
    const eastTwoSouthOne = square + MOVE_DIRECTION.eastTwoSouthOne;
    const southTwoEastOne = square + MOVE_DIRECTION.southTwoEastOne;
    const southTwoWestOne = square + MOVE_DIRECTION.southTwoWestOne;
    const westTwoSouthOne = square + MOVE_DIRECTION.westTwoSouthOne;
    const westTwoNorthOne = square + MOVE_DIRECTION.westTwoNorthOne;

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