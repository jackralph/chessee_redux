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
 * @function moveSquareStateFromOriginToTarget
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {number} targetSquare 
 * @returns {object} boardStateCopy
 * @description Takes the copied `boardState` and:
 * 1. Finds the squareState for the `originSquare` and `targetSquare`
 * 2. Replaces the `originSquareState` with the `targetSquareState` and sets `hasMoved` to `true`
 * 3. "Resets" the `originStateState` to only contain the `algebraicNotation` and `octalNotation`
 * 4. Returns the updated `boardStateCopy`
 */
export function moveSquareStateFromOriginToTarget(boardState, originSquare, targetSquare) {
    let boardStateCopy = {...boardState};

    const originSquareState = boardStateCopy[originSquare];
    const targetSquareState = boardStateCopy[targetSquare];

    boardStateCopy[targetSquare] = {
        ...targetSquareState,
        piece: {
            ...originSquareState.piece,
            hasMoved: true
        }
    };

    boardStateCopy[originSquare] = {
        algebraicNotation: originSquareState.algebraicNotation,
        octalNotation: originSquareState.octalNotation
    };

    return boardStateCopy;
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
 * @description Checks if `currentSquare` holds the `"pawn"` `piece`
 */
export function pieceIsPawn(boardState, currentSquare) {
    return boardState[currentSquare].piece.pieceName === "pawn";
}

/**
 * @function pieceIsSameColor
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
 * @function sideInCheck
 * @param {object} boardState 
 * @returns {string} sideInCheck (`"light"` / `"dark"` / `undefined`)
 * @description Loops through `boardState` and:
 * - Finds the `"king"`
 * - Grabs the `square`(s) attacking the `"king"`
 * - Checks if the `square`(s) attacking the `"king"` are the same color, and if they aren't - update `sideInCheck` to `kingColor`
 */
export function sideInCheck(boardState) {
    let sideInCheck = undefined;

    for (const square in boardState) {
        if (squareHasPiece(boardState, square) && pieceIsKing(boardState, square)) {
            const squaresAttackingKing = boardState[square].piecesAttackingThisSquare;
            const kingColor = boardState[square].piece.pieceColor;

            squaresAttackingKing.map(function(squareAttackingKing) {
                const attackingPieceColor = boardState[squareAttackingKing].piece.pieceColor;
                if (attackingPieceColor !== kingColor) {
                    sideInCheck = kingColor;
                };
            });

        }
    }

    return sideInCheck;
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