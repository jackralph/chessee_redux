import { legalDiagonalMoves, allDiagonalMoves } from './move.diagonal.js'
import { legalHorizontalMoves, allHorizontalMoves } from './move.horizontal.js'
import { legalKnightMoves, allKnightMoves } from './move.knight.js'
import { legalVerticalMoves, allVerticalMoves } from './move.vertical.js'
import { legalDiagonalMovesPawn, legalVerticalMovesPawn, allDiagonalMovesPawn } from './move.pawn.js'

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