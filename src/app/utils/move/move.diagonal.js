import { MOVE_DIRECTION } from "./move.const.js";
import {
    isContinualDiagonalPiece,
    isForwardMove,
    pieceIsKing,
    pieceIsPawn,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateLegalMovesDiagonal
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates legal diagonal moves for a specific `piece` on a `square` (used by `"bishop"` and `"queen"`)
 */
function calculateLegalMovesDiagonal(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesDiagonalArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalMovesDiagonalArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalMovesDiagonalArray.push(currentSquare);
            break;
        } else {
            break;
        }
    }

    return legalMovesDiagonalArray;
}

/**
 * @function legalMovesDiagonal
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateLegalMovesDiagonal` to calculate moves in that direction
 */
export function legalMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north-east" moves
    const legalMovesDiagonalNorthEastArray = calculateLegalMovesDiagonal(MOVE_DIRECTION.northEast, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)
    
    // "south-east" moves
    const legalMovesDiagonalSouthEastArray = calculateLegalMovesDiagonal(MOVE_DIRECTION.southEast, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "south-west" moves
    const legalMovesDiagonalSouthWestArray = calculateLegalMovesDiagonal(MOVE_DIRECTION.southWest, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "north-west" moves
    const legalMovesDiagonalNorthWestArray = calculateLegalMovesDiagonal(MOVE_DIRECTION.northWest, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return [
        ...legalMovesDiagonalNorthEastArray,
        ...legalMovesDiagonalSouthEastArray,
        ...legalMovesDiagonalSouthWestArray,
        ...legalMovesDiagonalNorthWestArray
    ];
}

// all

/**
 * @function calculateAllMovesDiagonal
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates all diagonal moves for a specific `piece` on a `square` (used by `"bishop"` and `"queen"`)
 */
function calculateAllMovesDiagonal(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesDiagonalArray = [];
    
    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        const nextSquare = currentSquare + squareStep;
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualDiagonalPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allMovesDiagonalArray.push(currentSquare);
            } else if (pieceIsPawn(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allMovesDiagonalArray.push(currentSquare);
                if (isForwardMove(currentSquare, nextSquare, pieceColor) && validSquare(BOARD_OCTAL_ARRAY, nextSquare)) {
                    allMovesDiagonalArray.push(nextSquare);
                    break;
                } else {
                    break;
                }
            } else if (pieceIsKing(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allMovesDiagonalArray.push(currentSquare)
                break;
            } else {
                allMovesDiagonalArray.push(currentSquare);
                break;
            }
        } else {
            allMovesDiagonalArray.push(currentSquare);
            continue;
        }
    }

    return allMovesDiagonalArray;
}

/**
 * @function allMovesDiagonal
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateAllMovesDiagonal` to calculate moves in that direction
 */
export function allMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north-east" moves
    const allMovesDiagonalNorthEastArray = calculateAllMovesDiagonal(MOVE_DIRECTION.northEast, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)
    
    // "south-east" moves
    const allMovesDiagonalSouthEastArray = calculateAllMovesDiagonal(MOVE_DIRECTION.southEast, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "south-west" moves
    const allMovesDiagonalSouthWestArray = calculateAllMovesDiagonal(MOVE_DIRECTION.southWest, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "north-west" moves
    const allMovesDiagonalNorthWestArray = calculateAllMovesDiagonal(MOVE_DIRECTION.northWest, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return [
        ...allMovesDiagonalNorthEastArray,
        ...allMovesDiagonalSouthEastArray,
        ...allMovesDiagonalSouthWestArray,
        ...allMovesDiagonalNorthWestArray
    ];
}