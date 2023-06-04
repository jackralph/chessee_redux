import { MOVE_DIRECTION } from "./move.const.js";
import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

/**
 * @function calculateCastlingMovesKing
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates castling moves for `"king"`
 */
function calculateCastlingMovesKing(boardState, pieceColor, square) {
    let castlingMoves = [];
    const kingHasMoved = boardState[square].piece.hasMoved;
    const castlingSquares = {
        light: {
            king: {
                east: 76,
                west: 72
            },
            rook: {
                east: 77,
                west: 70
            }
        },
        dark: {
            king: {
                east: 6,
                west: 2
            },
            rook: {
                east: 7,
                west: 0
            }
        }
    }

    if (!kingHasMoved) {
        const rookEastSquare = castlingSquares[pieceColor].rook.east;
        const rookWestSquare = castlingSquares[pieceColor].rook.west;
        const canCastleEast = (
            squareHasPiece(boardState, rookEastSquare)
            && boardState[rookEastSquare].piece.pieceName === "rook"
            && !boardState[rookEastSquare].piece.hasMoved
        );
        const canCastleWest = (
            squareHasPiece(boardState, rookWestSquare)
            && boardState[rookWestSquare].piece.pieceName === "rook"
            && !boardState[rookWestSquare].piece.hasMoved
        );

        if (canCastleEast) {
            castlingMoves.push(castlingSquares[pieceColor].king.east);
        }

        if (canCastleWest) {
            castlingMoves.push(castlingSquares[pieceColor].king.west);
        }
    }

    return castlingMoves;
}

/**
 * @function calculateLegalMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **legal** `"king"` moves in every regular direction 1 `square`
 * - `north`
 * - `northEast`
 * - `east`
 * - `southEast`
 * - `south`
 * - `southWest`
 * - `west`
 * - `northWest`
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
 * @description Calls `calculateLegalMovesKing` and returns **legal** moves for the king
 */
export function legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalMovesKingArray = calculateLegalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)
    const castlingMovesKing = calculateCastlingMovesKing(boardState, pieceColor, square);

    return [...legalMovesKingArray, ...castlingMovesKing];
}

// all

/**
 * @function calculateAllMovesKing
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @param {number} square 
 * @returns {number[]} [`square`]
 * @description Calculates **all** king moves in in every regular direction 1 `square`
 * - `north`
 * - `northEast`
 * - `east`
 * - `southEast`
 * - `south`
 * - `southWest`
 * - `west`
 * - `northWest`
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
 * @description Calls `calculateAllMovesKing` and returns **all** moves for the king
 */
export function allMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allMovesKingArray = calculateAllMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return allMovesKingArray;
}