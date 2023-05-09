// ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗██████╗ 
// ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗
// ███████╗███████║███████║██████╔╝█████╗  ██║  ██║
// ╚════██║██╔══██║██╔══██║██╔══██╗██╔══╝  ██║  ██║
// ███████║██║  ██║██║  ██║██║  ██║███████╗██████╔╝
// ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ 

function validSquare(boardOctalArray, limiter, square, iteration) {
    if (limiter) {
        return boardOctalArray.includes(Number(square)) && iteration <= limiter;
    } else {
        return boardOctalArray.includes(Number(square));
    }
}

export function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceColor;

    return targetPieceColor === pieceColor;
}

export function squareHasPiece(boardState, square) {
    return !!boardState[square].piece;
}

export function validateMove(boardState, originSquare, targetSquare) {
    const pieceLegalMoves = boardState[originSquare].piece.legalMoves;

    return pieceLegalMoves.includes(Number(targetSquare));
}

export function isContinuosAttackingPiece(boardState, i) {
    const pieceName = boardState[i].piece.pieceName;
    const isContinuosAttackingPiece = (
        pieceName === "bishop"
        || pieceName === "king"
        || pieceName === "pawn"
        || pieceName === "queen"
    );
    return isContinuosAttackingPiece;
}

export function pieceIsPawn(boardState, i) {
    return boardState[i].piece.pieceName === "pawn";
}

// ██████╗ ██╗ █████╗  ██████╗  ██████╗ ███╗   ██╗ █████╗ ██╗     
// ██╔══██╗██║██╔══██╗██╔════╝ ██╔═══██╗████╗  ██║██╔══██╗██║     
// ██║  ██║██║███████║██║  ███╗██║   ██║██╔██╗ ██║███████║██║     
// ██║  ██║██║██╔══██║██║   ██║██║   ██║██║╚██╗██║██╔══██║██║     
// ██████╔╝██║██║  ██║╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║███████╗
// ╚═════╝ ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝

// legal

function calculateLegalDiagonalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalDiagonalMovesArray = [];
    const squareNumber = Number(square);

    for (let nextSquare = squareNumber + squareStep, iteration = 1; validSquare(boardOctalArray, limiter, nextSquare, iteration); nextSquare += squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, nextSquare)) {
            legalDiagonalMovesArray.push(nextSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, nextSquare, pieceColor)) {
            legalDiagonalMovesArray.push(nextSquare);
            break;
        } else {
            break;
        }
    }

    return legalDiagonalMovesArray;
}

function legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
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

function allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let diagonalMovesArray = [];
    const squareNumber = Number(square);
    
    // "north-east" moves
    for (let i = squareNumber - 9, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= 9, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "south-east" moves
    for (let i = squareNumber + 11, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i += 11, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "south-west" moves
    for (let i = squareNumber + 9, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i += 9, iteration += 1){
        if (squareHasPiece(boardState, i)) {
            diagonalMovesArray.push(i);
            break;
        } else {
            diagonalMovesArray.push(i);
            continue;
        }
    }

    // "north-west" moves
    for (let i = squareNumber - 11, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= 11, iteration += 1) {
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

// ██╗  ██╗ ██████╗ ██████╗ ██╗███████╗ ██████╗ ███╗   ██╗████████╗ █████╗ ██╗     
// ██║  ██║██╔═══██╗██╔══██╗██║╚══███╔╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██║     
// ███████║██║   ██║██████╔╝██║  ███╔╝ ██║   ██║██╔██╗ ██║   ██║   ███████║██║     
// ██╔══██║██║   ██║██╔══██╗██║ ███╔╝  ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║     
// ██║  ██║╚██████╔╝██║  ██║██║███████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║███████╗
// ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚══════╝

// legal

function calculateLegalHorizontalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalHorizontalMovesArray = [];
    const squareNumber = Number(square);

    for (let i = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            legalHorizontalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalHorizontalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return legalHorizontalMovesArray;
}

function legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "east" moves
    const legalHorizontalEastMovesArray = calculateLegalHorizontalMoves(1, boardOctalArray, boardState, limiter, pieceColor, square);

    // "west" moves
    const legalHorizontalWestMovesArray = calculateLegalHorizontalMoves(-1, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalHorizontalEastMovesArray,
        ...legalHorizontalWestMovesArray
    ];
}

// all

function allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let horizontalMovesArray = [];

    const squareNumber = Number(square);

    // "west" moves
    for (let i = squareNumber - 1, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= 1, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            horizontalMovesArray.push(i);
            break;
        } else {
            horizontalMovesArray.push(i);
            continue;
        }
    }
    
    // "east" moves
    for (let i = squareNumber + 1, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i += 1, iteration += 1){
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

// ██╗   ██╗███████╗██████╗ ████████╗██╗ ██████╗ █████╗ ██╗     
// ██║   ██║██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝██╔══██╗██║     
// ██║   ██║█████╗  ██████╔╝   ██║   ██║██║     ███████║██║     
// ╚██╗ ██╔╝██╔══╝  ██╔══██╗   ██║   ██║██║     ██╔══██║██║     
//  ╚████╔╝ ███████╗██║  ██║   ██║   ██║╚██████╗██║  ██║███████╗
//   ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝

// legal

function calculateLegalVerticalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalVerticalMovesArray = [];
    const squareNumber = Number(square);

    for (let i = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            legalVerticalMovesArray.push(i);
            continue;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalVerticalMovesArray.push(i);
            break;
        } else {
            break;
        }
    }

    return legalVerticalMovesArray;
}

function legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north" moves
    const legalVerticalNorthMovesArray = calculateLegalVerticalMoves(10, boardOctalArray, boardState, limiter, pieceColor, square);

    // "south" moves
    const legalVerticalSouthMovesArray = calculateLegalVerticalMoves(-10, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalVerticalNorthMovesArray,
        ...legalVerticalSouthMovesArray
    ];
}

// all

function allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - 10, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= 10, iteration += 1) {
        if (squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            break;
        } else {
            verticalMovesArray.push(i);
            continue;
        }
    }
    
    // "south" moves
    for (let i = squareNumber + 10, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i += 10, iteration += 1) {
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

// ██████╗  █████╗ ██╗    ██╗███╗   ██╗
// ██╔══██╗██╔══██╗██║    ██║████╗  ██║
// ██████╔╝███████║██║ █╗ ██║██╔██╗ ██║
// ██╔═══╝ ██╔══██║██║███╗██║██║╚██╗██║
// ██║     ██║  ██║╚███╔███╔╝██║ ╚████║
// ╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝

// legal diagonal

function calculateLegalPawnMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalPawnMovesArray = []
    const squareNumber = Number(square)

    for (let i = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            break;
        } else if (!pieceIsSameColor(boardState, i, pieceColor)) {
            legalPawnMovesArray.push(i);
            continue;
        }
    }

    return legalPawnMovesArray;
}

function legalDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastPawnMovesArray = calculateLegalPawnMoves(9 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);
    console.log(legalNorthEastPawnMovesArray);

    // "north-west" moves
    const legalNorthWestPawnMovesArray = calculateLegalPawnMoves(11 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalNorthEastPawnMovesArray,
        ...legalNorthWestPawnMovesArray
    ]
}

// all

function allDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    let diagonalMovesArray = [];

    const squareNumber = Number(square);

    // "north-east" moves
    for (let i = squareNumber - (9 * pawnDirection), iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= (9 * pawnDirection), iteration += 1) {
        diagonalMovesArray.push(i);
    }

    // "north-west" moves
    for (let i = squareNumber - (11 * pawnDirection), iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= (11 * pawnDirection), iteration += 1) {
        diagonalMovesArray.push(i);
    }

    return diagonalMovesArray;
}

// legal vertical

function legalVerticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square) {
    let verticalMovesArray = [];

    const squareNumber = Number(square);

    // "north" moves
    for (let i = squareNumber - (10 * pawnDirection), iteration = 1; validSquare(boardOctalArray, limiter, i, iteration); i -= (10 * pawnDirection), iteration += 1) {
        if (!squareHasPiece(boardState, i)) {
            verticalMovesArray.push(i);
            continue;
        } else {
            break;
        }
    }

    return verticalMovesArray;
}

// ██╗  ██╗███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗
// ██║ ██╔╝████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝
// █████╔╝ ██╔██╗ ██║██║██║  ███╗███████║   ██║   
// ██╔═██╗ ██║╚██╗██║██║██║   ██║██╔══██║   ██║   
// ██║  ██╗██║ ╚████║██║╚██████╔╝██║  ██║   ██║   
// ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   

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
        if (validSquare(boardOctalArray, limiter, move)) {
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
        if (validSquare(boardOctalArray, limiter, move)) {
            return knightMovesArray.push(move);
        }
        return null;
    });
    
    return knightMovesArray;
}

// ██████╗ █████╗ ██╗      ██████╗██╗   ██╗██╗      █████╗ ████████╗███████╗
// ██╔════╝██╔══██╗██║     ██╔════╝██║   ██║██║     ██╔══██╗╚══██╔══╝██╔════╝
// ██║     ███████║██║     ██║     ██║   ██║██║     ███████║   ██║   █████╗  
// ██║     ██╔══██║██║     ██║     ██║   ██║██║     ██╔══██║   ██║   ██╔══╝  
// ╚██████╗██║  ██║███████╗╚██████╗╚██████╔╝███████╗██║  ██║   ██║   ███████╗
//  ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝

export function calculateLegalMoves(boardOctalArray, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let legalVerticalMovesArray = [];
    let legalHorizontalMovesArray = [];
    let legalDiagonalMovesArray = [];
    let legalMovesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            legalDiagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalDiagonalMovesArray];
            // console.log(`moves for Bishop... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "king":
            limiter = 1;
            // console.group(`calculating moves for King on ${square}`);
            legalVerticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalHorizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalDiagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalVerticalMovesArray, ...legalHorizontalMovesArray, ...legalDiagonalMovesArray];
            // console.log(`moves for King... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "knight":
            // console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = legalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalMovesArray = [...knightMovesArray];
            // console.log(`moves for Knight... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? 1 : -1;
            // console.group(`calculating moves for Pawn on ${square}`);
            legalVerticalMovesArray = legalVerticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square);
            limiter = 1;
            legalDiagonalMovesArray = legalDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square);
            legalMovesArray = [...legalVerticalMovesArray, ...legalDiagonalMovesArray];
            // console.log(`moves for Pawn... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            legalVerticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalHorizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalDiagonalMovesArray = legalDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalVerticalMovesArray, ...legalHorizontalMovesArray, ...legalDiagonalMovesArray];
            // console.log(`moves for Queen... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            legalVerticalMovesArray = legalVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalHorizontalMovesArray = legalHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalVerticalMovesArray, ...legalHorizontalMovesArray];
            // console.log(`moves for Rook... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }

    return legalMovesArray;
}

export function calculateAllMoves(boardOctalArray, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let allVerticalMovesArray = [];
    let allHorizontalMovesArray = [];
    let allDiagonalMovesArray = [];
    let movesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            allDiagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...allDiagonalMovesArray];
            // console.log(`moves for Bishop... ${movesArray}`);
            // console.groupEnd();
            break;
        case "king":
            limiter = 1;
            // console.group(`calculating moves for King on ${square}`);
            allVerticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            allHorizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            allDiagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...allVerticalMovesArray, ...allHorizontalMovesArray, ...allDiagonalMovesArray];
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
            allDiagonalMovesArray = allDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square);
            movesArray = [...allVerticalMovesArray, ...allDiagonalMovesArray];
            // console.log(`moves for Pawn... ${movesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            allVerticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            allHorizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            allDiagonalMovesArray = allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...allVerticalMovesArray, ...allHorizontalMovesArray, ...allDiagonalMovesArray];
            // console.log(`moves for Queen... ${movesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            allVerticalMovesArray = allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            allHorizontalMovesArray = allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square);
            movesArray = [...allVerticalMovesArray, ...allHorizontalMovesArray];
            // console.log(`moves for Rook... ${movesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }

    return movesArray;
}