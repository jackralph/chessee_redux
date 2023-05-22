import {
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal diagonal

function calculateLegalDiagonalPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalPawnMovesArray = []
    const pawnDirection = pieceColor === "light" ? -1 : 1;

    const northEast = square + (9 * pawnDirection);
    const northWest = square + (11 * pawnDirection);

    [northEast, northWest].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, move) && squareHasPiece(boardState, move) && !pieceIsSameColor(boardState, move, pieceColor)) {
            legalPawnMovesArray.push(move);
        }

        return null;
    });

    return legalPawnMovesArray;
}

export function legalDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const legalDiagonalPawnMoves = calculateLegalDiagonalPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return legalDiagonalPawnMoves;
}

// legal straight

function calculateLegalStraightPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square) {
    const pawnDirection = pieceColor === "light" ? -1 : 1;

    const northOne = square + (10 * pawnDirection);
    const northTwo = square + (20 * pawnDirection);

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

export function legalStraightMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square) {
    // "north" moves
    const legalStraightPawnMovesArray = calculateLegalStraightPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceHasMoved, pieceColor, square);

    return legalStraightPawnMovesArray;
}

// all

function calculateAllDiagonalPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allPawnMovesArray = [];
    const pawnDirection = pieceColor === "light" ? -1 : 1;

    const northEast = square + (9 * pawnDirection);
    const northWest = square + (11 * pawnDirection);

    [
        northEast,
        northWest
    ].map(function(move) {
        if (validSquare(BOARD_OCTAL_ARRAY, move)) {
            allPawnMovesArray.push(move);
        }

        return null;
    });

    return allPawnMovesArray;
}

export function allDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    const allDiagonalPawnMoves = calculateAllDiagonalPawnMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);

    return allDiagonalPawnMoves;
}