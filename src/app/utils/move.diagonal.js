import {
    isContinualDiagonalPiece,
    isForwardMove,
    pieceIsPawn,
    pieceIsSameColor,
    squareHasPiece,
    validSquare
} from './move.shared.js'

// legal

function calculateLegalDiagonalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalDiagonalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
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

export function legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastDiagonalMovesArray = calculateLegalDiagonalMoves(-9, boardOctalArray, boardState, limiter, pieceColor, square)
    
    // "south-east" moves
    const legalSouthEastDiagonalMovesArray = calculateLegalDiagonalMoves(11, boardOctalArray, boardState, limiter, pieceColor, square)

    // "south-west" moves
    const legalSouthWestDiagonalMovesArray = calculateLegalDiagonalMoves(9, boardOctalArray, boardState, limiter, pieceColor, square)

    // "north-west" moves
    const legalNorthWestDiagonalMovesArray = calculateLegalDiagonalMoves(-11, boardOctalArray, boardState, limiter, pieceColor, square)

    return [
        ...legalNorthEastDiagonalMovesArray,
        ...legalSouthEastDiagonalMovesArray,
        ...legalSouthWestDiagonalMovesArray,
        ...legalNorthWestDiagonalMovesArray
    ];
}

// all

function calculateAllDiagonalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allDiagonalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualDiagonalPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);
            } else if (pieceIsPawn(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
                allDiagonalMovesArray.push(currentSquare);

                const nextSquare = currentSquare + squareStep;
                if (isForwardMove(currentSquare, nextSquare, pieceColor)) {
                    allDiagonalMovesArray.push(currentSquare + squareStep);
                    break;
                } else {
                    break;
                }
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

export function allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north-east" moves
    const allNorthEastDiagonalMovesArray = calculateAllDiagonalMoves(-9, boardOctalArray, boardState, limiter, pieceColor, square)
    
    // "south-east" moves
    const allSouthEastDiagonalMovesArray = calculateAllDiagonalMoves(11, boardOctalArray, boardState, limiter, pieceColor, square)

    // "south-west" moves
    const allSouthWestDiagonalMovesArray = calculateAllDiagonalMoves(9, boardOctalArray, boardState, limiter, pieceColor, square)

    // "north-west" moves
    const allNorthWestDiagonalMovesArray = calculateAllDiagonalMoves(-11, boardOctalArray, boardState, limiter, pieceColor, square)

    return [
        ...allNorthEastDiagonalMovesArray,
        ...allSouthEastDiagonalMovesArray,
        ...allSouthWestDiagonalMovesArray,
        ...allNorthWestDiagonalMovesArray
    ];
}