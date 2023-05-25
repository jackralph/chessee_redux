/**
 * @function isContinualDiagonalPiece
 * @param {object} boardState 
 * @param {number} currentSquare 
 * @returns {boolean}
 * @description Checks if `piece` on `currentSquare` is a **continual** diagonal piece
 */
export function isContinualDiagonalPiece(boardState, currentSquare) {
    const pieceName = boardState[currentSquare].piece.pieceName;
    return pieceName === "bishop" || pieceName === "queen";
}

/**
 * @function isContinualDiagonalPiece
 * @param {object} boardState 
 * @param {number} currentSquare 
 * @returns {boolean}
 * @description Checks if `piece` on `currentSquare` is a **continual** straight piece
 */
export function isContinualStraightPiece(boardState, currentSquare) {
    const pieceName = boardState[currentSquare].piece.pieceName;
    return pieceName === "queen" || pieceName === "rook";
}

/**
 * @function isForwardMove
 * @param {number} currentSquare 
 * @param {number} nextSquare 
 * @param {string} pieceColor 
 * @returns {boolean}
 * @description Compares `currentSquare` to `nextSquare` with the context of `pieceColor`
 */
export function isForwardMove(currentSquare, nextSquare, pieceColor) {
    if (pieceColor === "light") {
        return currentSquare > nextSquare;
    } else {
        return currentSquare < nextSquare;
    }
}

/**
 * @function pieceIsKing
 * @param {object} boardState 
 * @param {number} currentSquare 
 * @returns {boolean}
 * @description Checks if `currentSquare` holds the `"king"` `piece`
 */
export function pieceIsKing(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "king";
}

/**
 * @function pieceIsPawn
 * @param {object} boardState 
 * @param {number} currentSquare 
 * @returns {boolean}
 * @description Checks if `currentSquare` holds the `"king"` `piece`
 */
export function pieceIsPawn(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "pawn";
}

/**
 * @function pieceIsPawn
 * @param {object} boardState 
 * @param {number} square
 * @param {string} pieceColor
 * @returns {boolean}
 * @description Checks if`square` in the `boardState` is same color as `pieceColor` passed
 */
export function pieceIsSameColor(boardState, square, pieceColor) {
    const targetPieceColor = boardState[square].piece.pieceColor;
    
    return targetPieceColor === pieceColor;
}

/**
 * @function squareHasPiece
 * @param {object} boardState 
 * @param {number} square 
 * @returns {boolean}
 * @description Checks if`square` has a `piece`
 */
export function squareHasPiece(boardState, square) {
    return !!boardState[square].piece;
}

/**
 * @function validateMove
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {number} targetSquare 
 * @returns {boolean}
 * @description Checks if **legal** moves of a `piece` contains the `targetSquare`
 */
export function validateMove(boardState, originSquare, targetSquare) {
    const pieceLegalMoves = boardState[originSquare].piece.legalMoves;
    
    return pieceLegalMoves.includes(Number(targetSquare));
}

/**
 * @function validSquare
 * @param {number[]} BOARD_OCTAL_ARRAY 
 * @param {number} square 
 * @returns {boolean}
 * @description Checks if `BOARD_OCTAL_ARRAY` includes `square` passed
 */
export function validSquare(BOARD_OCTAL_ARRAY, square) {
    return BOARD_OCTAL_ARRAY.includes(square);
}