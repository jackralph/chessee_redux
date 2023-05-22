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

function calculateLegalDiagonalMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let legalDiagonalMovesArray = [];

    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalDiagonalMovesArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalDiagonalMovesArray.push(currentSquare);
            break;
        } else {
            break;
        }
    }

    return legalDiagonalMovesArray;
}

export function legalDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastDiagonalMovesArray = calculateLegalDiagonalMoves(-9, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)
    
    // "south-east" moves
    const legalSouthEastDiagonalMovesArray = calculateLegalDiagonalMoves(11, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "south-west" moves
    const legalSouthWestDiagonalMovesArray = calculateLegalDiagonalMoves(9, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "north-west" moves
    const legalNorthWestDiagonalMovesArray = calculateLegalDiagonalMoves(-11, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return [
        ...legalNorthEastDiagonalMovesArray,
        ...legalSouthEastDiagonalMovesArray,
        ...legalSouthWestDiagonalMovesArray,
        ...legalNorthWestDiagonalMovesArray
    ];
}

// all

function calculateAllDiagonalMoves(squareStep, BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    let allDiagonalMovesArray = [];
    
    for (let currentSquare = square + squareStep; validSquare(BOARD_OCTAL_ARRAY, currentSquare); currentSquare += squareStep) {
        const nextSquare = currentSquare + squareStep;
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualDiagonalPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);
            } else if (pieceIsPawn(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);
                if (isForwardMove(currentSquare, nextSquare, pieceColor) && validSquare(BOARD_OCTAL_ARRAY, nextSquare)) {
                    allDiagonalMovesArray.push(nextSquare);
                    break;
                } else {
                    break;
                }
            } else if (pieceIsKing(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare)
                break;
            } else {
                allDiagonalMovesArray.push(currentSquare);
                break;
            }
        } else {
            allDiagonalMovesArray.push(currentSquare);
            continue;
        }
    }

    return allDiagonalMovesArray;
}

export function allDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, square) {
    // "north-east" moves
    const allNorthEastDiagonalMovesArray = calculateAllDiagonalMoves(-9, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)
    
    // "south-east" moves
    const allSouthEastDiagonalMovesArray = calculateAllDiagonalMoves(11, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "south-west" moves
    const allSouthWestDiagonalMovesArray = calculateAllDiagonalMoves(9, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    // "north-west" moves
    const allNorthWestDiagonalMovesArray = calculateAllDiagonalMoves(-11, BOARD_OCTAL_ARRAY, boardState, pieceColor, square)

    return [
        ...allNorthEastDiagonalMovesArray,
        ...allSouthEastDiagonalMovesArray,
        ...allSouthWestDiagonalMovesArray,
        ...allNorthWestDiagonalMovesArray
    ];
}