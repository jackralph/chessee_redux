import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateLegalMovesKnight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **legal** `"knight"` moves in every irregular direction
 * - `northTwoWestOne`
 * - `northTwoEastOne`
 * - `eastTwoNorthOne`
 * - `eastTwoSouthOne`
 * - `southTwoEastOne`
 * - `southTwoWestOne`
 * - `westTwoSouthOne`
 * - `westTwoNorthOne`
 */
function calculateLegalMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesKnightArray = [];

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
                return legalMovesKnightArray.push(move);
            } else if (!pieceIsSameColor(boardState, move, pieceColor)) {
                return legalMovesKnightArray.push(move);
            }
            return null;
        }
        return null;
    });

    return legalMovesKnightArray;
}

/**
 * @function legalMovesKnight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateLegalMovesKnight` and returns **legal** moves for the `"knight"`
 */
export function legalMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalMovesKnightArray = calculateLegalMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return legalMovesKnightArray;
}

// all

/**
 * @function calculateAllMovesKnight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **all** `"knight"` moves in every irregular direction
 * - `northTwoWestOne`
 * - `northTwoEastOne`
 * - `eastTwoNorthOne`
 * - `eastTwoSouthOne`
 * - `southTwoEastOne`
 * - `southTwoWestOne`
 * - `westTwoSouthOne`
 * - `westTwoNorthOne`
 */
function calculateAllMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesKnightArray = [];

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
            return allMovesKnightArray.push(move);
        }
        return null;
    });
    
    return allMovesKnightArray;
}

/**
 * @function allMovesKnight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateAllMovesKnight` and returns **all** moves for the `"knight"`
 */
export function allMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allMovesKnightArray = calculateAllMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return allMovesKnightArray;
}