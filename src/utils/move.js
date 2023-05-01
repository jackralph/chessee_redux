function squareHasPiece(boardState, square) {
    return boardState[square].piece.pieceElement !== null
}

function squareInOctalArray(boardOctalArray, square) {
    return boardOctalArray.includes(Number(square));
}

function diagonalMoves(boardOctalArray, boardState, square) {
    let diagonalMovesArray = [];
    let squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9; squareInOctalArray(boardOctalArray, i); i -= 9) {
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
    for (let i = squareNumber + 11; squareInOctalArray(boardOctalArray, i); i += 11) {
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
    for (let i = squareNumber + 9; squareInOctalArray(boardOctalArray, i); i += 9) {
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
    for (let i = squareNumber - 11; squareInOctalArray(boardOctalArray, i); i -= 11) {
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

function horizontalMoves(boardOctalArray, boardState, square) {
    let horizontalMovesArray = [];

    let squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1; squareInOctalArray(boardOctalArray, i); i -= 1) {
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
    for (let i = squareNumber + 1; squareInOctalArray(boardOctalArray, i); i += 1) {
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

function verticalMoves(boardOctalArray, boardState, square) {
    let verticalMovesArray = [];

    let squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10; squareInOctalArray(boardOctalArray, i); i -= 10) {
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
    for (let i = squareNumber + 10; squareInOctalArray(boardOctalArray, i); i += 10) {
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
    if (boardState[square].piece.pieceElement.type.name === "Queen") { // TESTING PURPOSES ONLY
        const piece = boardState[square].piece.pieceElement;
        const pieceName = piece.type.name;
        console.log(`calculating moves for ${pieceName} on ${square}...`);
        console.log("finding vertical moves...");
        let verticalMovesArray = verticalMoves(boardOctalArray, boardState, square);
        console.log(`found vertical moves: ${verticalMovesArray}`);
        console.log("finding horizontal moves...");
        let horizontalMovesArray = horizontalMoves(boardOctalArray, boardState, square);
        console.log(`found horizontal moves: ${horizontalMovesArray}`);
        console.log("finding diagonal moves...");
        let diagonalMovesArray = diagonalMoves(boardOctalArray, boardState, square);
        console.log(`found diagonal moves: ${diagonalMovesArray}`);
    
        let movesArray = [...verticalMovesArray, ...horizontalMovesArray, ...diagonalMovesArray];
        console.log(`combined moves array ${movesArray}`);
    }
}