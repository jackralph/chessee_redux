import { legalDiagonalMoves, allDiagonalMoves } from './move.diagonal.js'
import { legalMovesKing, allMovesKing } from "./move.king.js"
import { legalKnightMoves, allKnightMoves } from './move.knight.js'
import { legalDiagonalMovesPawn, legalStraightMovesPawn, allDiagonalMovesPawn } from './move.pawn.js'
import { legalStraightMoves, allStraightMoves } from "./move.straight.js"

/**
 * @function calculateLegalMoves
 * @param {array} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {boolean} pieceHasMoved 
 * @param {string} pieceName 
 * @param {number} square
 * @returns {number[]} [`square`]
 * @description Calculates **legal** moves for a `square` if it has a `piece`
 */
export function calculateLegalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, pieceHasMoved, pieceName, square) {
    switch(pieceName) {
        case "bishop":
            return legalDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "king":
            return legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "knight":
            return legalKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "pawn":
            const legalStraightMovesPawnArray = legalStraightMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square);
            const legalDiagonalMovesPawnArray = legalDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...legalStraightMovesPawnArray, ...legalDiagonalMovesPawnArray];
        case "queen":
            const legalStraightMovesArray = legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            const legalDiagonalMovesArray = legalDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...legalStraightMovesArray, ...legalDiagonalMovesArray];
        case "rook":
            return legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        default:
            throw new Error("Unknown piece");
    }
}

/**
 * @function calculateAllMoves
 * @param {array} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {string} pieceName 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **all** moves for a `square` if it has a `piece`
 */
export function calculateAllMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, pieceName, square) {
    switch(pieceName) {
        case "bishop":
            return allDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "king":
            return allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "knight":
            return allKnightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "pawn":
            return allDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "queen":
            const allStraightMovesArray = allStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            const allDiagonalMovesArray = allDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...allStraightMovesArray, ...allDiagonalMovesArray];
        case "rook":
            return allStraightMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        default:
            throw new Error("Unknown piece");
    }
}