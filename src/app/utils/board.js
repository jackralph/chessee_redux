import { calculateLegalMoves, calculateAllMoves } from './move.js'

// ██████╗ ██████╗ ███╗   ██╗███████╗████████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝
// ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   
// ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   
// ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   
// ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   

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

// const startingPositionPieceArray = [
//     'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
//     'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
//     null, null, null, null, null, null, null, null,
//     null, null, null, null, null, null, null, null,
//     null, null, null, null, null, null, null, null,
//     null, null, null, null, null, null, null, null,
//     'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
//     'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
// ];

const bishopPositionPieceArrayTest = [
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, 'B', null, null, null, 'b', null, null,
    null, null, null, null, 'P', null, null, null,
    null, null, null, 'B', null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, 'B', null, null, null, 'b', null, null,
    'B', null, null, null, null, null, null, null
]

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

// ███████╗██╗  ██╗ █████╗ ██████╗ ███████╗██████╗ 
// ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝██╔══██╗
// ███████╗███████║███████║██████╔╝█████╗  ██║  ██║
// ╚════██║██╔══██║██╔══██║██╔══██╗██╔══╝  ██║  ██║
// ███████║██║  ██║██║  ██║██║  ██║███████╗██████╔╝
// ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ 

export function calculateSquareDominance(boardState, piecesAttacking) {
    let dominance = 0;
    piecesAttacking.map(function(pieceAttacking) {
        const pieceColor = boardState[pieceAttacking].piece.pieceColor
        if (pieceColor === "light") {
            return dominance += 1;
        } else {
            return dominance -= 1;
        }
    });

    return dominance;
}

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

// ███████╗████████╗ █████╗ ████████╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
// ███████╗   ██║   ███████║   ██║   █████╗  
// ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
// ███████║   ██║   ██║  ██║   ██║   ███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝

export function setBoardState() {
    let boardState = {};

    boardOctalArray.map(function(octalSquare, i) {
        const hasPiece = bishopPositionPieceArrayTest[i] !== null;
        if (hasPiece) {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare,
                piece: {
                    hasMoved: false,
                    legalMoves: [],
                    pieceColor: setPieceColor(bishopPositionPieceArrayTest[i]),
                    pieceName: placePiece(bishopPositionPieceArrayTest[i], octalSquare)
                },
                piecesAttackingThisSquare: []
            };
        } else {
            return boardState[octalSquare] = {
                algebraicNotation: boardAlgebraicArray[i],
                octalNotation: octalSquare,
                piecesAttackingThisSquare: []
            };
        }
    });

    for (const square in boardState) {
        const hasPiece = !!boardState[square].piece;

        if (hasPiece) {
            const pieceColor = boardState[square].piece.pieceColor;
            const pieceName = boardState[square].piece.pieceName;
            const legalMoves = calculateLegalMoves(boardOctalArray, boardState, pieceColor, pieceName, square);
            const allMoves = calculateAllMoves(boardOctalArray, boardState, pieceColor, pieceName, square);
            
            allMoves.map(function(legalMove) {
                return boardState[legalMove].piecesAttackingThisSquare.push(square);
            });

            boardState[square].piece.legalMoves = legalMoves;
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
            const legalMoves = calculateLegalMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);

            boardStateCopy[square] = {
                ...boardStateCopy[square],
                piece: {
                    ...boardStateCopy[square].piece,
                    legalMoves: legalMoves
                },
            };
        };
    };

    let piecesAttackingThisSquare = {};

    boardOctalArray.map(function(octalSquare) {
        return piecesAttackingThisSquare[octalSquare] = []
    });

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const allMoves = calculateAllMoves(boardOctalArray, boardStateCopy, pieceColor, pieceName, square);

            allMoves.map(function(move) {
                return piecesAttackingThisSquare[move].push(square);
            });
        };
    };

    for (const square in boardStateCopy) {
        boardStateCopy[square] = {
            ...boardStateCopy[square],
            piecesAttackingThisSquare: piecesAttackingThisSquare[square]
        };
    }

    return boardStateCopy;
}