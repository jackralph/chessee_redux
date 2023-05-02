function squareHasPiece(boardState, square) {
    return boardState[square].piece.pieceElement !== null
}

function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceElement.props.color;

    return targetPieceColor === pieceColor;
}

function moveCondition(boardOctalArray, limiter, square, iteration) {
    if (limiter) {
        return boardOctalArray.includes(Number(square)) && iteration <= limiter;
    } else {
        return boardOctalArray.includes(Number(square));
    }
}

function diagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let diagonalMovesArray = [];
    const squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
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
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return diagonalMovesArray;
}

function horizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let horizontalMovesArray = [];

    const squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 1, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
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

function verticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
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
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            verticalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return verticalMovesArray;
}

function diagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    let diagonalMovesArray = [];

    const squareNumber = Number(square);

    // "north-east" moves
    for (let i = squareNumber - (9 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (9 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
        }
    }

    // "north-west" moves
    for (let i = squareNumber - (11 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (11 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            diagonalMovesArray.push(i);
        }
    }

    return diagonalMovesArray;
}

function verticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - (10 * pawnDirection), iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= (10 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
        } else {
            break;
        }
    }

    return verticalMovesArray;
}

function knightMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
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

export function calculateMoves(boardOctalArray, boardState, square) {
    const piece = boardState[square].piece;
    const pieceElement = piece.pieceElement;
    const pieceColor = pieceElement.props.color;
    const pieceName = pieceElement.type.name;
    let verticalMovesArray = [];
    let horizontalMovesArray = [];
    let diagonalMovesArray = [];
    let movesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "Bishop":
            console.group(`calculating moves for Bishop on ${square}`);
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...diagonalMovesArray];
            console.log(`moves for Bishop... ${movesArray}`);
            console.groupEnd();
            break;
        case "King":
            limiter = 1;
            console.group(`calculating moves for King on ${square}`);
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            console.log(`moves for King... ${movesArray}`);
            console.groupEnd();
            break;
        case "Knight":
            console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = knightMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...knightMovesArray];
            console.log(`moves for Knight... ${movesArray}`);
            console.groupEnd();
            break;
        case "Pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? 1 : -1;
            console.group(`calculating moves for Pawn on ${square}`);
            verticalMovesArray = verticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square);
            limiter = 1;
            diagonalMovesArray = diagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square);
            movesArray = [...verticalMovesArray, ...diagonalMovesArray];
            console.log(`moves for Pawn... ${movesArray}`);
            console.groupEnd();
            break;
        case "Queen":
            console.group(`calculating moves for Queen on ${square}`);
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            console.log(`moves for Queen... ${movesArray}`);
            console.groupEnd();
            break;
        case "Rook":
            console.group(`calculating moves for Rook on ${square}`);
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray];
            console.log(`moves for Rook... ${movesArray}`);
            console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }
}