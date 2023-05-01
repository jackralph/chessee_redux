function squareHasPiece(boardState, square) {
    return boardState[square].piece.pieceElement !== null
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

export function calculateMoves(boardOctalArray, boardState, square) {
    const piece = boardState[square].piece.pieceElement;
    const pieceName = piece.type.name;
    let verticalMovesArray = [];
    let horizontalMovesArray = [];
    let diagonalMovesArray = [];
    let movesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "Bishop":
            console.log("calculating moves for Bishop");
            diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, limiter, square);
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
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
            movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
            console.log(`moves for Rook... ${movesArray}`);
            break;
    }
}