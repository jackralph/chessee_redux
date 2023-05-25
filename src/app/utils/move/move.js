import { legalMovesDiagonal, allMovesDiagonal } from './move.diagonal.js'
import { legalMovesKing, allMovesKing } from "./move.king.js"
import { legalMovesKnight, allMovesKnight } from './move.knight.js'
import { legalMovesDiagonalPawn, legalMovesStraightPawn, allMovesDiagonalPawn } from './move.pawn.js'
import { legalMovesStraight, allMovesStraight } from "./move.straight.js"

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
            return legalMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "king":
            return legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "knight":
            return legalMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "pawn":
            const legalStraightMovesPawnArray = legalMovesStraightPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square);
            const legalDiagonalMovesPawnArray = legalMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...legalStraightMovesPawnArray, ...legalDiagonalMovesPawnArray];
        case "queen":
            const legalStraightMovesArray = legalMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            const legalDiagonalMovesArray = legalMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...legalStraightMovesArray, ...legalDiagonalMovesArray];
        case "rook":
            return legalMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
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
            return allMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "king":
            return allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "knight":
            return allMovesKnight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "pawn":
            return allMovesDiagonalPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        case "queen":
            const allStraightMovesArray = allMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            const allDiagonalMovesArray = allMovesDiagonal(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            return [...allStraightMovesArray, ...allDiagonalMovesArray];
        case "rook":
            return allMovesStraight(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
        default:
            throw new Error("Unknown piece");
    }
}