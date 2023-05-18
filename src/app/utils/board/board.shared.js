import { pieceRef } from "./board.const.js";

/**
 * @function calculateSquareDominance
 * @param {object} boardState 
 * @param {array} piecesAttackingThisSquare 
 * @returns {number} dominance
 * @description Used to determine how many `piece`(s) attack/defend a `square`
 * 1. Maps through an invidual `square`'s `piecesAttackingThisSquare`
 * 2. Checks the color of the `piece` attacking this `square`
 * 3. Increments and/or decrements the `dominance` based on color of `piece`
 */
export function calculateSquareDominance(boardState, piecesAttackingThisSquare) {
    let dominance = 0;

    piecesAttackingThisSquare.map(function(pieceAttacking) {
        const pieceColor = boardState[pieceAttacking].piece.pieceColor
        if (pieceColor === "light") {
            return dominance += 1;
        } else {
            return dominance -= 1;
        }
    });

    return dominance;
}

/**
 * @function changeTurn
 * @param {string} turn (`"light"`/`"dark"`)
 * @returns {string} turn (`"light"`/`"dark"`)
 * @description Determines which side is to play next
 */
export function changeTurn(turn) {
    return turn === "light" ? "dark" : "light";
}

/**
 * @function placePiece
 * @param {string} pieceIdentifier (`"b"`/`"k"`/`"n"`/`"p"`/`"q"`/`"r"`/`"B"`/`"K"`/`"N"`/`"P"`/`"Q"`/`"R"`)
 * @returns {string} (`"bishop"`, `"king"`, `"knight"`, `"pawn"`, `"queen"`, `"rook"`)
 * @description Determines if a `square` has a `piece`, and returns the string value of the `piece` name
 */
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