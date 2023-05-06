export function squareHasPiece(boardState, square) {
    return !!boardState[square].piece;
}

export function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceColor;

    return targetPieceColor === pieceColor;
}

function moveCondition(boardOctalArray, limiter, square, iteration) {
    if (limiter) {
        return boardOctalArray.includes(Number(square)) && iteration <= limiter;
    } else {
        return boardOctalArray.includes(Number(square));
    }
}

function legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let diagonalMovesArray = [];
    const squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    // "south-east" moves
    for (let i = squareNumber + 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 11, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    // "south-west" moves
    for (let i = squareNumber + 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 9, iteration += 1){
        if (!squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    // "north-west" moves
    for (let i = squareNumber - 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 11, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return diagonalMovesArray;
}

function allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let diagonalMovesArray = [];
    const squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "south-east" moves
    for (let i = squareNumber + 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 11, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "south-west" moves
    for (let i = squareNumber + 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 9, iteration += 1){
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "north-west" moves
    for (let i = squareNumber - 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 11, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    return diagonalMovesArray;
}

function legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let horizontalMovesArray = [];

    const squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 1, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            horizontalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }
    
    // "east" moves
    for (let i = squareNumber + 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 1, iteration += 1){
        if (!squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            horizontalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return horizontalMovesArray;
}

function allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let horizontalMovesArray = [];

    const squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 1, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
            break;
        } else {
            horizontalMovesArray.push(i);
            continue;
        }
    }
    
    // "east" moves
    for (let i = squareNumber + 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 1, iteration += 1){
        if (squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
            break;
        } else {
            horizontalMovesArray.push(i);
            continue;
        }
    }

    return horizontalMovesArray;
}

function legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 10, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            verticalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }
    
    // "south" moves
    for (let i = squareNumber + 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 10, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            verticalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return verticalMovesArray;
}

function allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 10, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            break;
        } else {
            verticalMovesArray.push(i);
            continue;
        }
    }
    
    // "south" moves
    for (let i = squareNumber + 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 10, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            break;
        } else {
            verticalMovesArray.push(i);
            continue;
        }
    }

    return verticalMovesArray;
}

function legalDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    let diagonalMovesArray = [];

    const squareNumber = Number(square);

    // "north-east" moves
    for (let i = squareNumber - (9 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (9 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "north-west" moves
    for (let i = squareNumber - (11 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (11 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    return diagonalMovesArray;
}

function allDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    let diagonalMovesArray = [];

    const squareNumber = Number(square);

    // "north-east" moves
    for (let i = squareNumber - (9 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (9 * pawnDirection), iteration += 1) {
        diagonalMovesArray.push(i);
    }

    // "north-west" moves
    for (let i = squareNumber - (11 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (11 * pawnDirection), iteration += 1) {
        diagonalMovesArray.push(i);
    }

    return diagonalMovesArray;
}

function legalVerticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - (10 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (10 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            continue;
        } else {
            break;
        }
    }

    return verticalMovesArray;
}

function legalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let knightMovesArray = [];

    const squareNumber = Number(square);

    const northTwoWestOne = squareNumber - 21;
    const northTwoEastOne = squareNumber - 19;
    const eastTwoNorthOne = squareNumber - 8;
    const eastTwoSouthOne = squareNumber + 12;
    const southTwoEastOne = squareNumber + 21;
    const southTwoWestOne = squareNumber + 19;
    const westTwoSouthOne = squareNumber + 8;
    const westTwoNorthOne = squareNumber - 12;

    [
        northTwoWestOne,
        northTwoEastOne,
        eastTwoNorthOne,
        eastTwoSouthOne,
        southTwoEastOne,
        southTwoWestOne,
        westTwoSouthOne,
        westTwoNorthOne
    ].map(function(move) {
        if (moveCondition(boardOctalArray, limiter, move)) {
            if (!squareHasPiece(boardState, move)) {
                return knightMovesArray.push(move);
            } else if (!pieceIsSameColor(boardState, move, pieceColor)) {
                return knightMovesArray.push(move);
            }
            return null;
        }
        return null;
    });
    
    return knightMovesArray;
}

function allKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let knightMovesArray = [];

    const squareNumber = Number(square);

    const northTwoWestOne = squareNumber - 21;
    const northTwoEastOne = squareNumber - 19;
    const eastTwoNorthOne = squareNumber - 8;
    const eastTwoSouthOne = squareNumber + 12;
    const southTwoEastOne = squareNumber + 21;
    const southTwoWestOne = squareNumber + 19;
    const westTwoSouthOne = squareNumber + 8;
    const westTwoNorthOne = squareNumber - 12;

    [
        northTwoWestOne,
        northTwoEastOne,
        eastTwoNorthOne,
        eastTwoSouthOne,
        southTwoEastOne,
        southTwoWestOne,
        westTwoSouthOne,
        westTwoNorthOne
    ].map(function(move) {
        if (moveCondition(boardOctalArray, limiter, move)) {
            return knightMovesArray.push(move);
        }
        return null;
    });
    
    return knightMovesArray;
}

export function calculateLegalMoves(boardOctalArray, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let verticalMovesArray = [];
    let horizontalMovesArray = [];
    let diagonalMovesArray = [];
    let movesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            diagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...diagonalMovesArray];
            // console.log(`moves for Bishop... ${movesArray}`);
            // console.groupEnd();
            break;
        case "king":
            limiter = 1;
            // console.group(`calculating moves for King on ${square}`);
            verticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for King... ${movesArray}`);
            // console.groupEnd();
            break;
        case "knight":
            // console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = legalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...knightMovesArray];
            // console.log(`moves for Knight... ${movesArray}`);
            // console.groupEnd();
            break;
        case "pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? 1 : -1;
            // console.group(`calculating moves for Pawn on ${square}`);
            verticalMovesArray = legalVerticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square);
            limiter = 1;
            diagonalMovesArray = legalDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square);
            movesArray = [...verticalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for Pawn... ${movesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            verticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for Queen... ${movesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            verticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray];
            // console.log(`moves for Rook... ${movesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }

    return movesArray;
}

export function calculateAllMoves(boardOctalArray, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let verticalMovesArray = [];
    let horizontalMovesArray = [];
    let diagonalMovesArray = [];
    let movesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            diagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...diagonalMovesArray];
            // console.log(`moves for Bishop... ${movesArray}`);
            // console.groupEnd();
            break;
        case "king":
            limiter = 1;
            // console.group(`calculating moves for King on ${square}`);
            verticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for King... ${movesArray}`);
            // console.groupEnd();
            break;
        case "knight":
            // console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = allKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...knightMovesArray];
            // console.log(`moves for Knight... ${movesArray}`);
            // console.groupEnd();
            break;
        case "pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? 1 : -1;
            // console.group(`calculating moves for Pawn on ${square}`);
            limiter = 1;
            diagonalMovesArray = allDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square);
            movesArray = [...verticalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for Pawn... ${movesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            verticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            // console.log(`moves for Queen... ${movesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            verticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray];
            // console.log(`moves for Rook... ${movesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }
    return movesArray;
}

export function validateMove(boardState, originSquare, targetSquare) {
    const pieceLegalMoves = boardState[originSquare].piece.legalMoves;

    return pieceLegalMoves.includes(Number(targetSquare));
}