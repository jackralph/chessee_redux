/**
 * @function castle
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {object} originSquareState 
 * @param {number} targetSquare 
 * @param {object} targetSquareState 
 * @returns {object} boardStateCopy
 * @description Performs castling move
 */
function castle(boardState, originSquare, originSquareState, targetSquare, targetSquareState) {
    let boardStateCopy = {...boardState};

    const correspondingRookMove = {
        2: {
            rookOriginSquare: 0,
            rookTargetSquare: 3
        },
        6: {
            rookOriginSquare: 7,
            rookTargetSquare: 5
        },
        72: {
            rookOriginSquare: 70,
            rookTargetSquare: 73
        },
        76: {
            rookOriginSquare: 77,
            rookTargetSquare: 75
        },
    }

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

    const rookTargetSquare = correspondingRookMove[targetSquare].rookTargetSquare;
    const rookTargetSquareState = boardStateCopy[rookTargetSquare];
    const rookOriginSquare = correspondingRookMove[targetSquare].rookOriginSquare;
    const rookOriginSquareState = boardStateCopy[rookOriginSquare];

    boardStateCopy[rookTargetSquare] = {
        ...rookTargetSquareState,
        piece: {
            ...rookOriginSquareState.piece,
            hasMoved: true
        }
    };

    boardStateCopy[rookOriginSquare] = {
        algebraicNotation: rookOriginSquareState.algebraicNotation,
        octalNotation: rookOriginSquareState.octalNotation
    };

    return boardStateCopy;
}

/**
 * 
 * @param {object} boardState 
 * @param {string} pieceColor 
 * @returns {boolean} abandonmentMove
 * @description Checks if `"king"` is in check by `piece` that is different color than `pieceColor` in the current `boardState`
 */
export function isAbandonmentMove(boardState, pieceColor) {
    let abandonmentMove = false;

    for (const square in boardState) {
        if (squareHasPiece(boardState, square) && pieceIsKing(boardState, square)) {
            const kingColor = boardState[square].piece.pieceColor;
            
            if (kingColor === pieceColor) {
                const squaresAttackingKing = boardState[square].piecesAttackingThisSquare;

                squaresAttackingKing.map(function(squareAttackingKing) {
                    const pieceAttackingKing = boardState[squareAttackingKing].piece;

                    if (pieceAttackingKing.pieceColor !== kingColor) {
                        abandonmentMove = true;
                    }
                })
            }
        }
    }

    return abandonmentMove;
}

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
 * @function move
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {object} originSquareState 
 * @param {number} targetSquare 
 * @param {object} targetSquareState 
 * @returns {object} boardStateCopy
 * @description Performs regular move
 */
function move(boardState, originSquare, originSquareState, targetSquare, targetSquareState) {
    let boardStateCopy = {...boardState};

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
 * @function moveSquareStateFromOriginToTarget
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {number} targetSquare 
 * @returns {object} boardStateCopy
 * @description Replaces the `targetSquare` state with the `originSquare` state, the `originSquare` state is then "reverted" back to it's normal `piece`-less state
 */
export function moveSquareStateFromOriginToTarget(boardState, originSquare, targetSquare) {
    let boardStateCopy = {...boardState};

    const originSquareState = boardStateCopy[originSquare];
    const targetSquareState = boardStateCopy[targetSquare];
    
    if (pieceIsKing(boardStateCopy, originSquare)) {
        const castlingMoveDifference = [2, -2];

        if (castlingMoveDifference.includes(originSquare - targetSquare)) {
            boardStateCopy = castle(boardStateCopy, originSquare, originSquareState, targetSquare, targetSquareState);
        } else {
            boardStateCopy = move(boardStateCopy, originSquare, originSquareState, targetSquare, targetSquareState)
        }
    } else {
        boardStateCopy = move(boardStateCopy, originSquare, originSquareState, targetSquare, targetSquareState)
    }

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
 * @description Looks for a `"king"` in check
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