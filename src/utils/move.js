function squareHasPiece(boardState, square) {
    console.log(`checking if square ${square} has piece`)
    return boardState[square].piece.pieceElement !== null
}

function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceElement.props.color;

    return targetPieceColor == pieceColor;
}

function moveCondition(boardOctalArray, limiter, square, iteration) {
    if (limiter) {
        return iteration <= limiter;
    } else {
        return boardOctalArray.includes(Number(square));
    }
}

function diagonalMoves(boardOctalArray, boardState, limiter, square) {
    let diagonalMovesArray = [];
    let squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            diagonalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
            break;
        }
    }

    // "south-east" moves
    for (let i = squareNumber + 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 11, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            diagonalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
            break;
        }
    }

    // "south-west" moves
    for (let i = squareNumber + 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 9, iteration += 1){
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            diagonalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
            break;
        }
    }

    // "north-west" moves
    for (let i = squareNumber - 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 11, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            diagonalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
            break;
        }
    }

    return diagonalMovesArray;
}

function horizontalMoves(boardOctalArray, boardState, limiter, square) {
    let horizontalMovesArray = [];

    let squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 1, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            horizontalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            horizontalMovesArray.push(i);
            break;
        }
    }
    
    // "east" moves
    for (let i = squareNumber + 1, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 1, iteration += 1){
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            horizontalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            horizontalMovesArray.push(i);
            break;
        }
    }

    return horizontalMovesArray;
}

function verticalMoves(boardOctalArray, boardState, limiter, square) {
    let verticalMovesArray = [];

    let squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 10, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            verticalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            verticalMovesArray.push(i);
            break;
        }
    }
    
    // "south" moves
    for (let i = squareNumber + 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i += 10, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            verticalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            verticalMovesArray.push(i);
            break;
        }
    }

    return verticalMovesArray;
}

function diagonalMovesPawn(boardOctalArray, boardState, limiter, pieceColor, square) {
    let diagonalMovesArray = [];
    let squareNumber = Number(square);

    console.log(pieceColor);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, breaking...`);
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
        }
    }

    // "north-west" moves
    for (let i = squareNumber - 11, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 11, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, breaking...`);
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            console.log(`square ${i} does have a piece, adding and breaking...`);
            diagonalMovesArray.push(i);
        }
    }

    return diagonalMovesArray;
}

function verticalMovesPawn(boardOctalArray, boardState, limiter, square) {
    let verticalMovesArray = [];

    let squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10, iteration = 1; moveCondition(boardOctalArray, limiter, i, iteration); i -= 10, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            console.log(`square ${i} does not have a piece, adding...`);
            verticalMovesArray.push(i);
        } else {
            console.log(`square ${i} does have a piece, breaking...`);
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
                knightMovesArray.push(move);
            } else if (!pieceIsSameColor(boardState, move, pieceColor)) {
                knightMovesArray.push(move);
            }
        }
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
            console.log("calculating moves for Bishop");
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, square);
            movesArray = [...diagonalMovesArray];
            console.log(`moves for Bishop... ${movesArray}`);
            break;
        case "King":
            limiter = 1;
            console.log("calculating moves for King");
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, square);
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            console.log(`moves for King... ${movesArray}`);
            break;
        case "Knight":
            console.group("calculating moves for Knight");
            let knightMovesArray = knightMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            console.log(knightMovesArray);
            break;
        case "Pawn":
            limiter = piece.hasMoved ? 1 : 2;
            console.log("calculating moves for Pawn");
            verticalMovesArray = verticalMovesPawn(boardOctalArray, boardState, limiter, square);
            console.log(`changing limiter from ${limiter} to 1 for diagonal moves`);
            limiter = 1;
            diagonalMovesArray = diagonalMovesPawn(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...verticalMovesArray, ...diagonalMovesArray];
            console.log(`moves for Pawn... ${movesArray}`);
            break;
        case "Queen":
            console.log("calculating moves for Queen");
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, square);
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            console.log(`moves for Queen... ${movesArray}`);
            break;
        case "Rook":
            console.log("calculating moves for Rook");
            verticalMovesArray = verticalMoves(boardOctalArray, boardState, limiter, square);
            horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, limiter, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray];
            console.log(`moves for Rook... ${movesArray}`);
            break;
    }
}