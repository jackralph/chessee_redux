export function isContinualDiagonalPiece(boardState, currentSquare) {
    const pieceName = boardState[currentSquare].piece.pieceName;
    return pieceName === "bishop" || pieceName === "queen";
}

export function isContinualStraightPiece(boardState, currentSquare) {
    const pieceName = boardState[currentSquare].piece.pieceName;
    return pieceName === "queen" || pieceName === "rook";
}

export function isForwardMove(currentSquare, nextSquare, pieceColor) {
    if (pieceColor === "light") {
        return currentSquare > nextSquare;
    } else {
        return currentSquare < nextSquare;
    }
}

export function pieceIsKing(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "king";
}

export function pieceIsPawn(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "pawn";
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

export function validSquare(BOARD_OCTAL_ARRAY, limiter, square, iteration) {
    if (limiter) {
        return BOARD_OCTAL_ARRAY.includes(Number(square)) && iteration <= limiter;
    } else {
        return BOARD_OCTAL_ARRAY.includes(Number(square));
    }
}