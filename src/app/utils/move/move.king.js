import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesArray = [];

    const north = square + MOVE_DIRECTION.north;
    const northEast = square + MOVE_DIRECTION.northEast;
    const east = square + MOVE_DIRECTION.east;
    const southEast = square + MOVE_DIRECTION.southEast;
    const south = square + MOVE_DIRECTION.south;
    const southWest = square + MOVE_DIRECTION.southWest;
    const west = square + MOVE_DIRECTION.west;
    const northWest = square + MOVE_DIRECTION.northWest;

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

    const north = square + MOVE_DIRECTION.north;
    const northEast = square + MOVE_DIRECTION.northEast;
    const east = square + MOVE_DIRECTION.east;
    const southEast = square + MOVE_DIRECTION.southEast;
    const south = square + MOVE_DIRECTION.south;
    const southWest = square + MOVE_DIRECTION.southWest;
    const west = square + MOVE_DIRECTION.west;
    const northWest = square + MOVE_DIRECTION.northWest;

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