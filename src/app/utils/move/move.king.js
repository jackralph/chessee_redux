import {
    isContinualDiagonalPiece,
    isContinualStraightPiece,
    isForwardMove,
    pieceIsKing,
    pieceIsPawn,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal straight

function calculateLegalStraightMovesKing(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let legalStraightMovesArray = [];
    const squareNumber = Number(square);

    for (let i = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, i, iteration); i += squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            legalStraightMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalStraightMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return legalStraightMovesArray;
}

export function legalStraightMovesKing(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north" moves
    const legalStraightNorthMovesArray = calculateLegalStraightMovesKing(-10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "east" moves
    const legalStraightEastMovesArray = calculateLegalStraightMovesKing(1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "south" moves
    const legalStraightSouthMovesArray = calculateLegalStraightMovesKing(10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "west" moves
    const legalStraightWestMovesArray = calculateLegalStraightMovesKing(-1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...legalStraightNorthMovesArray,
        ...legalStraightEastMovesArray,
        ...legalStraightSouthMovesArray,
        ...legalStraightWestMovesArray
    ];
}

// all straight

function calculateAllStraightMovesKing(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let allStraightMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
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

export function allStraightMovesKing(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north" moves
    const allStraightNorthMovesArray = calculateAllStraightMovesKing(-10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "east" moves
    const allStraightEastMovesArray = calculateAllStraightMovesKing(1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "south" moves
    const allStraightSouthMovesArray = calculateAllStraightMovesKing(10, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    // "west" moves
    const allStraightWestMovesArray = calculateAllStraightMovesKing(-1, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);

    return [
        ...allStraightNorthMovesArray,
        ...allStraightEastMovesArray,
        ...allStraightSouthMovesArray,
        ...allStraightWestMovesArray
    ];
}

// legal diagonal

function calculateLegalDiagonalMovesKing(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let legalDiagonalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
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

export function legalDiagonalMovesKing(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastDiagonalMovesArray = calculateLegalDiagonalMovesKing(-9, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)
    
    // "south-east" moves
    const legalSouthEastDiagonalMovesArray = calculateLegalDiagonalMovesKing(11, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    // "south-west" moves
    const legalSouthWestDiagonalMovesArray = calculateLegalDiagonalMovesKing(9, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    // "north-west" moves
    const legalNorthWestDiagonalMovesArray = calculateLegalDiagonalMovesKing(-11, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    return [
        ...legalNorthEastDiagonalMovesArray,
        ...legalSouthEastDiagonalMovesArray,
        ...legalSouthWestDiagonalMovesArray,
        ...legalNorthWestDiagonalMovesArray
    ];
}

// all diagonal

function calculateAllDiagonalMovesKing(squareStep, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    let allDiagonalMovesArray = [];
    const squareNumber = Number(square);
    
    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(BOARD_OCTAL_ARRAY, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        const nextSquare = currentSquare + squareStep;
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualDiagonalPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);
            } else if (pieceIsPawn(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);
                if (isForwardMove(currentSquare, nextSquare, pieceColor) && validSquare(BOARD_OCTAL_ARRAY, limiter, nextSquare, iteration)) {
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

export function allDiagonalMovesKing(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square) {
    // "north-east" moves
    const allNorthEastDiagonalMovesArray = calculateAllDiagonalMovesKing(-9, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)
    
    // "south-east" moves
    const allSouthEastDiagonalMovesArray = calculateAllDiagonalMovesKing(11, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    // "south-west" moves
    const allSouthWestDiagonalMovesArray = calculateAllDiagonalMovesKing(9, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    // "north-west" moves
    const allNorthWestDiagonalMovesArray = calculateAllDiagonalMovesKing(-11, BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square)

    return [
        ...allNorthEastDiagonalMovesArray,
        ...allSouthEastDiagonalMovesArray,
        ...allSouthWestDiagonalMovesArray,
        ...allNorthWestDiagonalMovesArray
    ];
}