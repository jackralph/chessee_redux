import { calculateMoves } from './move.js'

const boardAlgebraicArray = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
];

const boardOctalArray = [
    0o0, 0o1, 0o2, 0o3, 0o4, 0o5, 0o6, 0o7,
    10, 11, 12, 13, 14, 15, 16, 17,
    20, 21, 22, 23, 24, 25, 26, 27,
    30, 31, 32, 33, 34, 35, 36, 37,
    40, 41, 42, 43, 44, 45, 46, 47,
    50, 51, 52, 53, 54, 55, 56, 57,
    60, 61, 62, 63, 64, 65, 66, 67,
    70, 71, 72, 73, 74, 75, 76, 77
];

const startingPositionPieceArrayTest = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
];

const pieceRef = {
    // dark piece
    'b': 'bishop',
    'k': 'king',
    'n': 'knight',
    'p': 'pawn',
    'q': 'queen',
    'r': 'rook',

    // light pieces
    'B': 'bishop',
    'K': 'king',
    'N': 'knight',
    'P': 'pawn',
    'Q': 'queen',
    'R': 'rook',
};

function placePiece(pieceIdentifier) {
    if (!pieceIdentifier) {
        return null;
    } else {
        return pieceRef[pieceIdentifier];
    }
}

function setPieceColor(pieceIdentifier) {  
    if (pieceIdentifier === String(pieceIdentifier).toLowerCase()) {
        return "dark";
    } else {
        return "light";
    }
}

export function setBoardState() {
    let boardState = {};

    boardOctalArray.map(function(octalSquare, i) {
        const hasPiece = startingPositionPieceArrayTest[i] !== null;
        if (hasPiece) {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare,
                piece: {
                    hasMoved: false,
                    legalMoves: [],
                    pieceColor: setPieceColor(startingPositionPieceArrayTest[i]),
                    pieceName: placePiece(startingPositionPieceArrayTest[i], octalSquare)
                },
            };
        } else {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare
            };
        }
    });

    for (const square in boardState) {
        const hasPiece = !!boardState[square].piece;

        if (hasPiece) {
            const pieceColor = boardState[square].piece.pieceColor;
            const pieceName = boardState[square].piece.pieceName;

            boardState[square].piece.legalMoves = calculateMoves(
                boardOctalArray,
                boardState,
                pieceColor,
                pieceName,
                square
            );
        }
    }

    return boardState;
}

export function updateBoardState(boardState, originSquare, targetSquare) {
    let boardStateCopy = { ...boardState };

    const originSquareState = boardStateCopy[originSquare];
    const targetSquareState = boardStateCopy[targetSquare];

    boardStateCopy[targetSquare] = {
        ...targetSquareState,
        piece: {
            ...originSquareState.piece,
            hasMoved: true
        }
    }

    boardStateCopy[originSquare] = {
        algebraicNotation: originSquareState.algebraicNotation,
        octalNotation: originSquareState.octalNotation
    }

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;

            boardStateCopy[square] = {
                ...boardStateCopy[square],
                piece: {
                    ...boardStateCopy[square].piece,
                    legalMoves: calculateMoves(
                        boardOctalArray,
                        boardStateCopy,
                        pieceColor,
                        pieceName,
                        square
                    ) 
                }
            };
        }
    }

    return boardStateCopy;
}