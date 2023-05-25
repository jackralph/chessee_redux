import { MOVE_DIRECTION } from "./move.const.js";
import {
    isContinualStraightPiece,
    pieceIsKing,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateLegalMovesStraight
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates legal straight moves for a specific `piece` on a `square` (used by `"rook"` and `"queen"`)
 */
function calculateLegalMovesStraight(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalMovesStraightArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalMovesStraightArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalMovesStraightArray.push(currentSquare);
            break;
        } else {
            break;
        }
    }

    return legalMovesStraightArray;
}

/**
 * @function legalMovesStraight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateLegalMovesStraight` to calculate moves in that direction
 */
export function legalMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north" moves
    const legalMovesStraightNorthArray = calculateLegalMovesStraight(MOVE_DIRECTION.north, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "east" moves
    const legalMovesStraightEastArray = calculateLegalMovesStraight(MOVE_DIRECTION.east, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "south" moves
    const legalMovesStraightSouthArray = calculateLegalMovesStraight(MOVE_DIRECTION.south, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "west" moves
    const legalMovesStraightWestArray = calculateLegalMovesStraight(MOVE_DIRECTION.west, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return [
        ...legalMovesStraightNorthArray,
        ...legalMovesStraightEastArray,
        ...legalMovesStraightSouthArray,
        ...legalMovesStraightWestArray
    ];
}

// all

/**
 * @function calculateAllMovesStraight
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates all straight moves for a specific `piece` on a `square` (used by `"rook"` and `"queen"`)
 */
function calculateAllMovesStraight(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allMovesStraightArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualStraightPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allMovesStraightArray.push(currentSquare);
            } else if (pieceIsKing(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allMovesStraightArray.push(currentSquare);
                break;
            } else {
                allMovesStraightArray.push(currentSquare);
                break;
            }
        } else {
            allMovesStraightArray.push(currentSquare);
            continue;
        }
    }

    return allMovesStraightArray;
}

/**
 * @function allMovesStraight
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateAllMovesStraight` to calculate moves in that direction
 */
export function allMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north" moves
    const allMovesStraightNorthArray = calculateAllMovesStraight(MOVE_DIRECTION.north, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "east" moves
    const allMovesStraightEastArray = calculateAllMovesStraight(MOVE_DIRECTION.east, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "south" moves
    const allMovesStraightSouthArray = calculateAllMovesStraight(MOVE_DIRECTION.south, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "west" moves
    const allMovesStraightWestArray = calculateAllMovesStraight(MOVE_DIRECTION.west, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return [
        ...allMovesStraightNorthArray,
        ...allMovesStraightEastArray,
        ...allMovesStraightSouthArray,
        ...allMovesStraightWestArray
    ];
}