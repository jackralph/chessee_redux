// ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗██████╗ 
// ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗
// ███████╗███████║███████║██████╔╝█████╗  ██║  ██║
// ╚════██║██╔══██║██╔══██║██╔══██╗██╔══╝  ██║  ██║
// ███████║██║  ██║██║  ██║██║  ██║███████╗██████╔╝
// ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ 

// exports

export function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceColor;
    
    return targetPieceColor === pieceColor;
}

export function validateMove(boardState, originSquare, targetSquare) {
    const pieceLegalMoves = boardState[originSquare].piece.legalMoves;
    
    return pieceLegalMoves.includes(Number(targetSquare));
}

// private

function isContinualPiece(boardState, currentSquare) {
    const pieceName = boardState[currentSquare].piece.pieceName;
    return pieceName === "bishop" || pieceName === "queen";
}

function isForwardMove(currentSquare, nextSquare, pieceColor) {
    if (pieceColor === "light") {
        return currentSquare > nextSquare;
    } else {
        return currentSquare < nextSquare;
    }
}

function pieceIsPawn(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "pawn";
}

function squareHasPiece(boardState, square) {
    return !!boardState[square].piece;
}

function validSquare(boardOctalArray, limiter, square, iteration) {
    if (limiter) {
        return boardOctalArray.includes(Number(square)) && iteration <= limiter;
    } else {
        return boardOctalArray.includes(Number(square));
    }
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

function calculateAllDiagonalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allDiagonalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber + squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare += squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            if (isContinualPiece(boardState, currentSquare) && pieceIsSameColor(boardState, currentSquare, pieceColor)) {
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

function allDiagonalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
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

function calculateAllHorizontalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allHorizontalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            allHorizontalMovesArray.push(currentSquare);
            break;
        } else {
            allHorizontalMovesArray.push(currentSquare);
            continue;
        }
    }

    return allHorizontalMovesArray;
}

function allHorizontalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "east" moves
    const allHorizontalEastMovesArray = calculateAllHorizontalMoves(1, boardOctalArray, boardState, limiter, pieceColor, square);

    // "west" moves
    const allHorizontalWestMovesArray = calculateAllHorizontalMoves(-1, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...allHorizontalEastMovesArray,
        ...allHorizontalWestMovesArray
    ];
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

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalVerticalMovesArray.push(currentSquare);
            continue;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalVerticalMovesArray.push(currentSquare);
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

function calculateAllVerticalMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allVerticalMovesArray = [];
    const squareNumber = Number(square);

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (squareHasPiece(boardState, currentSquare)) {
            allVerticalMovesArray.push(currentSquare);
            break;
        } else {
            allVerticalMovesArray.push(currentSquare);
            continue;
        }
    }

    return allVerticalMovesArray;
}

function allVerticalMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    // "north" moves
    const allVerticalNorthMovesArray = calculateAllVerticalMoves(10, boardOctalArray, boardState, limiter, pieceColor, square);

    // "south" moves
    const allVerticalSouthMovesArray = calculateAllVerticalMoves(-10, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...allVerticalNorthMovesArray,
        ...allVerticalSouthMovesArray
    ];
}

// ██████╗  █████╗ ██╗    ██╗███╗   ██╗
// ██╔══██╗██╔══██╗██║    ██║████╗  ██║
// ██████╔╝███████║██║ █╗ ██║██╔██╗ ██║
// ██╔═══╝ ██╔══██║██║███╗██║██║╚██╗██║
// ██║     ██║  ██║╚███╔███╔╝██║ ╚████║
// ╚═╝     ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═══╝

// legal diagonal

function calculateLegalDiagonalPawnMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalPawnMovesArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            break;
        } else if (!pieceIsSameColor(boardState, currentSquare, pieceColor)) {
            legalPawnMovesArray.push(currentSquare);
            continue;
        }
    }

    return legalPawnMovesArray;
}

function legalDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    // "north-east" moves
    const legalNorthEastPawnMovesArray = calculateLegalDiagonalPawnMoves(9 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);

    // "north-west" moves
    const legalNorthWestPawnMovesArray = calculateLegalDiagonalPawnMoves(11 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...legalNorthEastPawnMovesArray,
        ...legalNorthWestPawnMovesArray
    ]
}

// legal vertical

function calculateLegalVerticalPawnMoves(squareStep, boardOctalArray, boardState, limiter, square) {
    let legalVerticalPawnMovesArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        if (!squareHasPiece(boardState, currentSquare)) {
            legalVerticalPawnMovesArray.push(currentSquare);
            continue;
        } else {
            break;
        }
    }

    return legalVerticalPawnMovesArray;
}

function legalVerticalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, square) {
    // "north" moves
    const legalVerticalPawnMovesArray = calculateLegalVerticalPawnMoves(10 * pawnDirection, boardOctalArray, boardState, limiter, square);

    return legalVerticalPawnMovesArray;
}

// all

function calculateAllDiagonalPawnMoves(squareStep, boardOctalArray, boardState, limiter, pieceColor, square) {
    let allDiagonalMovesPawnArray = []
    const squareNumber = Number(square)

    for (let currentSquare = squareNumber - squareStep, iteration = 1; validSquare(boardOctalArray, limiter, currentSquare, iteration); currentSquare -= squareStep, iteration += 1) {
        allDiagonalMovesPawnArray.push(currentSquare);
    }

    return allDiagonalMovesPawnArray;
}

function allDiagonalMovesPawn(boardOctalArray, boardState, limiter, pawnDirection, pieceColor, square) {
    // "north-east" moves
    const allNorthEastPawnMovesArray = calculateAllDiagonalPawnMoves(9 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);

    // "north-west" moves
    const allNorthWestPawnMovesArray = calculateAllDiagonalPawnMoves(11 * pawnDirection, boardOctalArray, boardState, limiter, pieceColor, square);

    return [
        ...allNorthEastPawnMovesArray,
        ...allNorthWestPawnMovesArray
    ]
}

// ██╗  ██╗███╗   ██╗██╗ ██████╗ ██╗  ██╗████████╗
// ██║ ██╔╝████╗  ██║██║██╔════╝ ██║  ██║╚══██╔══╝
// █████╔╝ ██╔██╗ ██║██║██║  ███╗███████║   ██║   
// ██╔═██╗ ██║╚██╗██║██║██║   ██║██╔══██║   ██║   
// ██║  ██╗██║ ╚████║██║╚██████╔╝██║  ██║   ██║   
// ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   

// legal

function calculateLegalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    let legalKnightMovesArray = [];
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
                return legalKnightMovesArray.push(move);
            } else if (!pieceIsSameColor(boardState, move, pieceColor)) {
                return legalKnightMovesArray.push(move);
            }
            return null;
        }
        return null;
    });

    return legalKnightMovesArray;
}

function legalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square) {
    const legalKnightMovesArray = calculateLegalKnightMoves(boardOctalArray, boardState, limiter, pieceColor, square);

    return legalKnightMovesArray;
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