import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal diagonal

/**
 * @function calculateLegalMovesDiagonalPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **legal** diagonal `"pawn"` moves in 2 regular directions
 * - `northEast`
 * - `northWest`
 */
function calculateLegalMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesDiagonalPawnArray = []
    const pawnDirection = pieceColor === "light" ? 1 : -1;

    const northEast = square + (MOVE_DIRECTION.northEast * pawnDirection);
    const northWest = square + (MOVE_DIRECTION.northWest * pawnDirection);

    [northEast, northWest].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, move) && squareHasPiece(boardState, move) && !pieceIsSameColor(boardState, move, pieceColor)) {
            legalMovesDiagonalPawnArray.push(move);
        }

        return null;
    });

    return legalMovesDiagonalPawnArray;
}

/**
 * @function legalMovesDiagonalPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateLegalMovesDiagonalPawn` and returns legal diagonal moves for pawn
 */
export function legalMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalMovesDiagonalPawnArray = calculateLegalMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return legalMovesDiagonalPawnArray;
}

// legal straight

/**
 * @function calculateLegalMovesStraightPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState
 * @param {boolean} pieceHasMoved
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **legal** straight `"pawn"` moves in 1 regular direction
 * - `north`
 */
function calculateLegalMovesStraightPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square) {
    const pawnDirection = pieceColor === "light" ? 1 : -1;

    const northOne = square + (MOVE_DIRECTION.north * pawnDirection);
    const northTwo = square + ((MOVE_DIRECTION.north * 2) * pawnDirection);

    if (pieceHasMoved) {
        if (validSquare(BOARD_OCTAL_ARRAY, northOne) && !squareHasPiece(boardState, northOne)) {
            return [northOne];
        }
    } else {
        if (validSquare(BOARD_OCTAL_ARRAY, northOne) && !squareHasPiece(boardState, northOne)) {

            if (validSquare(BOARD_OCTAL_ARRAY, northTwo) && !squareHasPiece(boardState, northTwo)) {
                return [northOne, northTwo]
            }

            return [northOne]
        }
    }

    return [];
}

/**
 * @function legalMovesStraightPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState
 * @param {boolean} pieceHasMoved
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateLegalMovesStraightPawn` and returns legal straight moves for pawn
 */
export function legalMovesStraightPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square) {
    // "north" moves
    const legalMovesStraightPawnArray = calculateLegalMovesStraightPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square);

    return legalMovesStraightPawnArray;
}

// all

/**
 * @function calculateAllMovesDiagonalPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **all** diagonal `"pawn"` moves in 2 regular directions
 * - `northEast`
 * - `northWest`
 */
function calculateAllMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesDiagonalPawnArray = [];
    const pawnDirection = pieceColor === "light" ? 1 : -1;

    const northEast = square + (MOVE_DIRECTION.northEast * pawnDirection);
    const northWest = square + (MOVE_DIRECTION.northWest * pawnDirection);

    [
        northEast,
        northWest
    ].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
            allMovesDiagonalPawnArray.push(move);
        }

        return null;
    });

    return allMovesDiagonalPawnArray;
}

/**
 * @function allMovesDiagonalPawn
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calls `calculateAllMovesDiagonalPawn` and returns all diagonal moves for pawn
 */
export function allMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allMovesDiagonalPawnArray = calculateAllMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return allMovesDiagonalPawnArray;
}