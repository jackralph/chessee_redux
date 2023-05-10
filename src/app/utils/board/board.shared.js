import { 
    pieceRef
} from "./board.const.js";

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

export function placePiece(pieceIdentifier) {
    if (!pieceIdentifier) {
        return null;
    } else {
        return pieceRef[pieceIdentifier];
    }
}

export function setPieceColor(pieceIdentifier) {  
    if (pieceIdentifier === String(pieceIdentifier).toLowerCase()) {
        return "dark";
    } else {
        return "light";
    }
}