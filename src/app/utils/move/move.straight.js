import {
    isContinualStraightPiece,
    pieceIsKing,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateLegalStraightMoves
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates legal straight moves for a specific `piece` on a `square` (used by `"rook"` and `"queen"`)
 */
function calculateLegalStraightMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalStraightMovesArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalStraightMovesArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalStraightMovesArray.push(currentSquare);
            break;
        } else {
            break;
        }
    }

    return legalStraightMovesArray;
}

/**
 * @function legalStraightMoves
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateLegalStraightMoves` to calculate moves in that direction
 */
export function legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north" moves
    const legalStraightNorthMovesArray = calculateLegalStraightMoves(-10, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "east" moves
    const legalStraightEastMovesArray = calculateLegalStraightMoves(1, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "south" moves
    const legalStraightSouthMovesArray = calculateLegalStraightMoves(10, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "west" moves
    const legalStraightWestMovesArray = calculateLegalStraightMoves(-1, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return [
        ...legalStraightNorthMovesArray,
        ...legalStraightEastMovesArray,
        ...legalStraightSouthMovesArray,
        ...legalStraightWestMovesArray
    ];
}

// all

/**
 * @function calculateAllStraightMoves
 * @param {number} squareStep 
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates all straight moves for a specific `piece` on a `square` (used by `"rook"` and `"queen"`)
 */
function calculateAllStraightMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allStraightMovesArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualStraightPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allStraightMovesArray.push(currentSquare);
            } else if (pieceIsKing(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allStraightMovesArray.push(currentSquare);
                break;
            } else {
                allStraightMovesArray.push(currentSquare);
                break;
            }
        } else {
            allStraightMovesArray.push(currentSquare);
            continue;
        }
    }

    return allStraightMovesArray;
}

/**
 * @function allStraightMoves
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Takes 4 directional coordinates (`squareStep`(s)) and passes to `calculateAllStraightMoves` to calculate moves in that direction
 */
export function allStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north" moves
    const allStraightNorthMovesArray = calculateAllStraightMoves(-10, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "east" moves
    const allStraightEastMovesArray = calculateAllStraightMoves(1, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "south" moves
    const allStraightSouthMovesArray = calculateAllStraightMoves(10, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    // "west" moves
    const allStraightWestMovesArray = calculateAllStraightMoves(-1, BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return [
        ...allStraightNorthMovesArray,
        ...allStraightEastMovesArray,
        ...allStraightSouthMovesArray,
        ...allStraightWestMovesArray
    ];
}