import { Bishop } from '../app/components/piece/bishop/Bishop.jsx'
import { King } from '../app/components/piece/king/King.jsx'
import { Knight } from '../app/components/piece/knight/Knight.jsx'
import { Pawn } from '../app/components/piece/pawn/Pawn.jsx'
import { Queen } from '../app/components/piece/queen/Queen.jsx'
import { Rook} from '../app/components/piece/rook/Rook.jsx'
import { calculateMoves } from './move.js'

export function setInitialBoardState() {
    let boardState = {};

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

    const startingPositionPieceArray = [
        'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
        'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
        'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
    ];

    const startingPositionPieceArrayTest = [
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, 'P', null, null, null,
        null, null, null, 'Q', null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
    ];

    function placePiece(pieceIdentifier, octalSquare) {
        const pieceRef = {
            // dark piece
            'b': <Bishop />,
            'k': <King />,
            'n': <Knight />,
            'p': <Pawn octalSquare={octalSquare} color="dark" hasMoved={false} />,
            'q': <Queen />,
            'r': <Rook />,

            // light pieces
            'B': <Bishop />,
            'K': <King />,
            'N': <Knight />,
            'P': <Pawn octalSquare={octalSquare} color="light" hasMoved={false} />,
            'Q': <Queen />,
            'R': <Rook />
        }

        if (!pieceIdentifier) {
            return null
        } else {
            return pieceRef[pieceIdentifier]
        }
    }

    boardOctalArray.map(function(octalSquare, i) {
        return boardState[octalSquare] = {
            algebraicNotation: boardAlgebraicArray[i],
            octalNotation: octalSquare,
            piece: {
                pieceElement: placePiece(startingPositionPieceArrayTest[i], octalSquare),
                legalMoves: []
            },
        };
    });

    console.log(boardState);

    for (const square in boardState) {
        const hasPiece = boardState[square].piece.pieceElement !== null;
        if (hasPiece) {
            calculateMoves(boardOctalArray, boardState, square);
        }
    }

    return boardState;
}