import { legalDiagonalMoves, allDiagonalMoves } from './move.diagonal.js'
import { legalMovesKing, allMovesKing } from "./move.king.js"
import { legalKnightMoves, allKnightMoves } from './move.knight.js'
import { legalStraightMoves, allStraightMoves } from "./move.straight.js"
import { legalDiagonalMovesPawn, legalStraightMovesPawn, allDiagonalMovesPawn } from './move.pawn.js'

export function calculateLegalMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let legalStraightMovesArray = [];
    let legalDiagonalMovesArray = [];
    let legalMovesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            legalDiagonalMovesArray = legalDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalDiagonalMovesArray];
            // console.log(`moves for Bishop... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "king":
            // console.group(`calculating moves for King on ${square}`);
            const legalMovesKingArray = legalMovesKing(BOARD_OCTAL_ARRAY, boardState, pieceColor, square);
            legalMovesArray = [...legalMovesKingArray];
            // console.log(`moves for King... ${legalMovesKingArray}`);
            // console.groupEnd();
            break;
        case "knight":
            // console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = legalKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            legalMovesArray = [...knightMovesArray];
            // console.log(`moves for Knight... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? -1 : 1;
            // console.group(`calculating moves for Pawn on ${square}`);
            legalStraightMovesArray = legalStraightMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, square);
            limiter = 1;
            legalDiagonalMovesArray = legalDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, pieceColor, square);
            legalMovesArray = [...legalStraightMovesArray, ...legalDiagonalMovesArray];
            // console.log(`moves for Pawn... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            legalStraightMovesArray = legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            legalDiagonalMovesArray = legalDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalStraightMovesArray, ...legalDiagonalMovesArray];
            // console.log(`moves for Queen... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            legalStraightMovesArray = legalStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            legalMovesArray = [...legalStraightMovesArray];
            // console.log(`moves for Rook... ${legalMovesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }

    return legalMovesArray;
}

export function calculateAllMoves(BOARD_OCTAL_ARRAY, boardState, pieceColor, pieceName, square) {
    const piece = boardState[square].piece;
    let allStraightMovesArray = [];
    let allDiagonalMovesArray = [];
    let allMovesArray = [];
    let limiter = 0;

    switch(pieceName) {
        case "bishop":
            // console.group(`calculating moves for Bishop on ${square}`);
            allDiagonalMovesArray = allDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            allMovesArray = [...allDiagonalMovesArray];
            // console.log(`moves for Bishop... ${movesArray}`);
            // console.groupEnd();
            break;
        case "king":
            // console.group(`calculating moves for King on ${square}`);
            const allMovesKingArray = allMovesKing(BOARD_OCTAL_ARRAY, square);
            allMovesArray = [...allMovesKingArray];
            // console.log(`moves for King... ${allMovesKingArray}`);
            // console.groupEnd();
            break;
        case "knight":
            // console.group(`calculating moves for Knight on ${square}`);
            const knightMovesArray = allKnightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            allMovesArray = [...knightMovesArray];
            // console.log(`moves for Knight... ${movesArray}`);
            // console.groupEnd();
            break;
        case "pawn":
            limiter = piece.hasMoved ? 1 : 2;
            const pawnDirection = pieceColor === "light" ? -1 : 1;
            // console.group(`calculating moves for Pawn on ${square}`);
            limiter = 1;
            allDiagonalMovesArray = allDiagonalMovesPawn(BOARD_OCTAL_ARRAY, boardState, limiter, pawnDirection, pieceColor, square);
            allMovesArray = [...allDiagonalMovesArray];
            // console.log(`moves for Pawn... ${movesArray}`);
            // console.groupEnd();
            break;
        case "queen":
            // console.group(`calculating moves for Queen on ${square}`);
            allStraightMovesArray = allStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            allDiagonalMovesArray = allDiagonalMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            allMovesArray = [...allStraightMovesArray, ...allDiagonalMovesArray];
            // console.log(`moves for Queen... ${movesArray}`);
            // console.groupEnd();
            break;
        case "rook":
            // console.group(`calculating moves for Rook on ${square}`);
            allStraightMovesArray = allStraightMoves(BOARD_OCTAL_ARRAY, boardState, limiter, pieceColor, square);
            allMovesArray = [...allStraightMovesArray];
            // console.log(`moves for Rook... ${movesArray}`);
            // console.groupEnd();
            break;
        default:
            throw new Error("Unknown piece");
    }

    return allMovesArray;
}