import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateLegalMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates legal king moves
 */
function calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesKingArray = [];

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
                legalMovesKingArray.push(move);
            }

            return null;
        }

        return null;
    })

    return legalMovesKingArray;
}

/**
 * @function legalMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateLegalMovesKing` and returns legal moves for the king
 */
export function legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalMovesKingArray = calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return legalMovesKingArray;
}

// all

/**
 * @function calculateAllMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates all king moves
 */
function calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesKingArray = [];

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
            allMovesKingArray.push(move);
        }

        return null;
    })

    return allMovesKingArray;
}

/**
 * @function allMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateAllMovesKing` and returns all moves for the king
 */
export function allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allMovesKingArray = calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return allMovesKingArray;
}