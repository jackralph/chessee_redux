import { CASTLING_BLOCKING_SQUARES, CASTLING_SQUARES } from '../move/move.const.js';
import { calculateLegalMoves, calculateAllMoves } from '../move/move.js';
import { sideInCheck, moveSquareStateFromOriginToTarget, isAbandonmentMove, pieceIsKing } from '../move/move.shared.js';
import { BOARD_ALGEBRAIC_ARRAY, BOARD_OCTAL_ARRAY, STARTING_POSITION_PIECE_ARRAY, STARTING_POSITION_PIECE_ARRAY_TEST } from "./board.const.js";
import { placePiece, setPieceColor } from './board.shared.js';

// set

/**
 * @function initializeBoardState
 * @returns {object} boardState
 * @description Initializes the `boardState`
 */
export function initializeBoardState() {
    let boardState = {};

    BOARD_OCTAL_ARRAY.map(function(octalSquare, i) {
        const hasPiece = STARTING_POSITION_PIECE_ARRAY_TEST[i] !== null;
        if (hasPiece) {
            return boardState[octalSquare] = {
                algebraicNotation: BOARD_ALGEBRAIC_ARRAY[i],
                octalNotation: octalSquare,
                piece: {
                    hasMoved: false,
                    legalMoves: [],
                    pieceColor: setPieceColor(STARTING_POSITION_PIECE_ARRAY_TEST[i]),
                    pieceName: placePiece(STARTING_POSITION_PIECE_ARRAY_TEST[i])
                },
                piecesAttackingThisSquare: []
            };
        } else {
            return boardState[octalSquare] = {
                algebraicNotation: BOARD_ALGEBRAIC_ARRAY[i],
                octalNotation: octalSquare,
                piecesAttackingThisSquare: []
            };
        };
    });

    return boardState;
}

/**
 * 
 * @param {object} boardState 
 * @returns {object} boardStateCopy
 * @description Takes the `boardState` and calculates the move(s) for each `piece`
 */
export function calculateMovesForInitialBoardState(boardState) {
    let boardStateCopy = {...boardState};

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceHasMoved = boardStateCopy[square].piece.hasMoved;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const squareNumber = Number(square);
            const legalMoves = calculateLegalMoves(BOARD_OCTAL_ARRAY, boardStateCopy, pieceColor, pieceHasMoved, pieceName, squareNumber);
            const allMoves = calculateAllMoves(BOARD_OCTAL_ARRAY, boardStateCopy, pieceColor, pieceName, squareNumber);

            boardStateCopy[squareNumber].piece.legalMoves = legalMoves;

            allMoves.map(function(legalMove) {
                return boardStateCopy[legalMove].piecesAttackingThisSquare.push(squareNumber);
            });
        };
    };

    return boardStateCopy;
}

/**
 * @function createBoardState
 * @returns {object} boardState
 * @description Calls functions to create the `boardState`
 */
export function createBoardState() {
    let boardState = initializeBoardState();
    boardState = calculateMovesForInitialBoardState(boardState);

    return boardState;
}

// update

/**
 * @function filterAbandonmentLegalMoves
 * @param {object} boardState 
 * @returns {object} boardStateCopy
 * @description Removes move(s) from `piece`(s) **legal** moves if they abandon the `"king"`
 */
function filterAbandonmentLegalMoves(boardState) {
    const boardStateCopy = {...boardState};

    for (let square in boardStateCopy) {
        const squareNumber = Number(square);
        const hasPiece = !!boardStateCopy[squareNumber].piece;
        let filteredAbandonmentMoves = [];

        if (hasPiece) {
            const piece = boardStateCopy[squareNumber].piece;
            const pieceColor = piece.pieceColor;
            const pieceLegalMoves = piece.legalMoves;

            if (pieceLegalMoves) {
                pieceLegalMoves.map(function(move) {
                    let boardStateSecondCopy = {...boardStateCopy};
                    const originSquare = squareNumber;
                    const targetSquare = Number(move);
    
                    boardStateSecondCopy = moveSquareStateFromOriginToTarget(boardStateSecondCopy, originSquare, targetSquare);
                    boardStateSecondCopy = updateLegalMoves(boardStateSecondCopy);
                    boardStateSecondCopy = updateAllMoves(boardStateSecondCopy);
                    
                    const abandonmentMove = isAbandonmentMove(boardStateSecondCopy, pieceColor);

                    if (!abandonmentMove) {
                        filteredAbandonmentMoves.push(targetSquare);
                    }

                    return undefined;
                })

                boardStateCopy[squareNumber] = {
                    ...boardStateCopy[squareNumber],
                    piece: {
                        ...boardStateCopy[squareNumber].piece,
                        legalMoves: filteredAbandonmentMoves
                    },
                };
            }
        };
    }

    return boardStateCopy;
}

/**
 * @function filterAbandonmentAllMoves
 * @param {object} boardState 
 * @returns {object} boardStateCopy
 * @description Removes move(s) from `piece`(s) **all** moves if they abandon the `"king"`
 */
function filterAbandonmentAllMoves(boardState) {
    const boardStateCopy = {...boardState}

    for (let square in boardStateCopy) {
        const squareNumber = Number(square);
        const squareState = boardStateCopy[squareNumber];
        const piecesAttackingThisSquare = squareState.piecesAttackingThisSquare;
        let filteredAbandonmentMoves = [];

        if (piecesAttackingThisSquare.length) {
            piecesAttackingThisSquare.map(function(pieceSquare) {
                let boardStateSecondCopy = {...boardStateCopy};
                const pieceAttackingThisSquare = boardState[pieceSquare];
                const pieceColor = pieceAttackingThisSquare.piece.pieceColor;
                const originSquare = pieceAttackingThisSquare.octalNotation;
                const targetSquare = squareNumber;

                boardStateSecondCopy = moveSquareStateFromOriginToTarget(boardStateSecondCopy, originSquare, targetSquare);
                boardStateSecondCopy = updateLegalMoves(boardStateSecondCopy);
                boardStateSecondCopy = updateAllMoves(boardStateSecondCopy);

                const abandonmentMove = isAbandonmentMove(boardStateSecondCopy, pieceColor);

                if (!abandonmentMove) {
                    filteredAbandonmentMoves.push(originSquare);
                }

                return undefined;
            })
        }

        boardStateCopy[squareNumber] = {
            ...boardStateCopy[squareNumber],
            piecesAttackingThisSquare: filteredAbandonmentMoves
        }
    }

    return boardStateCopy;
}

/**
 * @function filterLegalCastlingMoves
 * @param {object} boardState 
 * @param {string} sideInCheck 
 * @returns {object} boardStateCopy
 * @description Filters move(s) according to the rule "no castling through check"
 */
function filterLegalCastlingMoves(boardState, sideInCheck) {
    let boardStateCopy = {...boardState};

    for (let square in boardStateCopy) {
        const squareNumber = Number(square);
        const hasPiece = !!boardStateCopy[squareNumber].piece;

        if (hasPiece && pieceIsKing(boardStateCopy, squareNumber)) {
            const castlingSquares = CASTLING_SQUARES;
            const king = boardStateCopy[squareNumber].piece;
            const kingColor = king.pieceColor;
            const kingLegalMoves = king.legalMoves;
            let filteredCastlingMoves = [...kingLegalMoves];

            if (sideInCheck === kingColor) {
                for (const castlingDirection in castlingSquares[kingColor].king) {
                    const castlingSquare = castlingSquares[kingColor].king[castlingDirection];
                    filteredCastlingMoves = filteredCastlingMoves.filter(function(move) { return move !== castlingSquare })
                }

                boardStateCopy[squareNumber] = {
                    ...boardStateCopy[squareNumber],
                    piece: {
                        ...boardStateCopy[squareNumber].piece,
                        legalMoves: filteredCastlingMoves
                    },
                };
            } else {
                const castlingBlockingSquares = CASTLING_BLOCKING_SQUARES;
                const king = boardStateCopy[squareNumber].piece;
                const kingColor = king.pieceColor;
                const kingLegalMoves = king.legalMoves;
                let filteredCastlingMoves = [...kingLegalMoves];

                for (const castlingDirection in castlingBlockingSquares[kingColor]) {
                    let canCastleInThisDirection = true;
                    castlingBlockingSquares[kingColor][castlingDirection].map(function(castleBlockingSquare) {
                        const piecesAttackingCastlingSquare = boardStateCopy[castleBlockingSquare].piecesAttackingThisSquare;
                        
                        piecesAttackingCastlingSquare.map(function(pieceAttackingCastlingSquare) {
                            const pieceAttackingCastleBlockingSquare = boardState[pieceAttackingCastlingSquare].piece;
                            const pieceColor = pieceAttackingCastleBlockingSquare.pieceColor;
                            if (pieceColor !== kingColor) {
                                canCastleInThisDirection = false;
                            }
                        })
                    })

                    if (!canCastleInThisDirection) {
                        const castlingSquare = castlingSquares[kingColor].king[castlingDirection];
                        filteredCastlingMoves = filteredCastlingMoves.filter(function(move) { return move !== castlingSquare; })
                    }
                }

                boardStateCopy[squareNumber] = {
                    ...boardStateCopy[squareNumber],
                    piece: {
                        ...boardStateCopy[squareNumber].piece,
                        legalMoves: filteredCastlingMoves
                    },
                };
            }
        };
    }

    return boardStateCopy;
}

/**
 * @function updateLegalMoves
 * @param {object} boardState
 * @returns {object} boardStateCopy
 * @description Takes a copied `boardState` and updates **legal** move(s) for each `piece`
 */
function updateLegalMoves(boardState) {
    let boardStateCopy = {...boardState};

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceHasMoved = boardStateCopy[square].piece.hasMoved;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const squareNumber = Number(square);
            let legalMoves = calculateLegalMoves(BOARD_OCTAL_ARRAY, boardStateCopy, pieceColor, pieceHasMoved, pieceName, squareNumber);

            boardStateCopy[squareNumber] = {
                ...boardStateCopy[squareNumber],
                piece: {
                    ...boardStateCopy[squareNumber].piece,
                    legalMoves: legalMoves
                },
            };
        };
    };

    return boardStateCopy;
}

/**
 * @function updateLegalMovesAfterCheck
 * @param {string} colorPiecesInCheck (`"light"` / `"dark"`)
 * @param {object} boardState 
 * @returns {object} boardStateCopy
 * @description Takes a copied `boardState` and updates **legal** move(s) for each `piece` after a check
 */
function updateLegalMovesAfterCheck(colorPiecesInCheck, boardState) {
    let boardStateCopy = {...boardState};

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;
        if (hasPiece) {
            const piece = boardStateCopy[square].piece
            const pieceColor = piece.pieceColor;
            if (pieceColor === colorPiecesInCheck) {
                const legalMovesForPiece = piece.legalMoves;
                let filteredLegalMovesForPiece = [];
                
                legalMovesForPiece.map(function(move) {
                    let boardStateSecondCopy = {...boardStateCopy};
                    const originSquare = Number(square);
                    const targetSquare = Number(move);
                    boardStateSecondCopy = moveSquareStateFromOriginToTarget(boardStateSecondCopy, originSquare, targetSquare);
                    boardStateSecondCopy = updateLegalMoves(boardStateSecondCopy);
                    boardStateSecondCopy = updateAllMoves(boardStateSecondCopy);
                    
                    const abandonmentMove = isAbandonmentMove(boardStateSecondCopy, pieceColor);

                    if (!abandonmentMove) {
                        filteredLegalMovesForPiece.push(targetSquare);
                    }

                    return undefined;
                })
    
                boardStateCopy[square] = {
                    ...boardStateCopy[square],
                    piece: {
                        ...boardStateCopy[square].piece,
                        legalMoves: filteredLegalMovesForPiece
                    },
                };
            }
        };
    };

    return boardStateCopy;
}

/**
 * @function updateAllMoves
 * @param {object} boardState
 * @returns {object} boardStateCopy
 * @description Takes a copied `boardState` and updates `piecesAttackingThisSquare` for each `square`
 */
function updateAllMoves(boardState) {
    let boardStateCopy = {...boardState};
    let piecesAttackingThisSquare = {};

    BOARD_OCTAL_ARRAY.map(function(octalSquare) {
        return piecesAttackingThisSquare[octalSquare] = []
    });

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;

        if (hasPiece) {
            const pieceColor = boardStateCopy[square].piece.pieceColor;
            const pieceName = boardStateCopy[square].piece.pieceName;
            const squareNumber = Number(square);
            const allMoves = calculateAllMoves(BOARD_OCTAL_ARRAY, boardStateCopy, pieceColor, pieceName, squareNumber);

            allMoves.map(function(move) {
                return piecesAttackingThisSquare[move].push(squareNumber);
            });
        };
    };

    for (const square in boardStateCopy) {
        boardStateCopy[square] = {
            ...boardStateCopy[square],
            piecesAttackingThisSquare: piecesAttackingThisSquare[square]
        };
    };

    return boardStateCopy;
}

/**
 * @function updateAllMovesAfterCheck
 * @param {string} colorPiecesInCheck (`"light"` / `"dark"`)
 * @param {object} boardState
 * @returns {object} boardStateCopy
 * @description Takes a copied `boardState` and updates `piecesAttackingThisSquare` for each `square` after a check
 */
function updateAllMovesAfterCheck(colorPiecesInCheck, boardState) {
    let boardStateCopy = {...boardState};

    for (let square in boardStateCopy) {
        square = Number(square);
        const piecesAttackingThisSquare = boardStateCopy[square].piecesAttackingThisSquare;
        let filteredPiecesAttackingThisSquare = []

        piecesAttackingThisSquare.map(function(pieceAttackingThisSquare) {
            const piece = boardState[pieceAttackingThisSquare].piece;
            const pieceColor = piece.pieceColor;
            const pieceLegalMoves = piece.legalMoves;

            if (pieceColor === colorPiecesInCheck && pieceLegalMoves.includes(square)) {
                filteredPiecesAttackingThisSquare.push(pieceAttackingThisSquare);
            } else if (pieceColor !== colorPiecesInCheck) {
                filteredPiecesAttackingThisSquare.push(pieceAttackingThisSquare);
            }

            return undefined;
        })

        boardStateCopy[square] = {
            ...boardStateCopy[square],
            piecesAttackingThisSquare: filteredPiecesAttackingThisSquare
        };
    }


    return boardStateCopy;
}

/**
 * @function updateBoardState
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {number} targetSquare 
 * @returns {object} boardStateCopy
 * @description Takes the current `boardState`, updates it with the new move, then calculates **all** and **legal** moves
 */
export function updateBoardState(boardState, originSquare, targetSquare) {
    let boardStateCopy = {...boardState};

    boardStateCopy = moveSquareStateFromOriginToTarget(boardStateCopy, originSquare, targetSquare);

    boardStateCopy = updateLegalMoves(boardStateCopy);

    boardStateCopy = updateAllMoves(boardStateCopy);
    
    boardStateCopy = filterAbandonmentLegalMoves(boardStateCopy);

    boardStateCopy = filterAbandonmentAllMoves(boardStateCopy);

    const colorPiecesInCheck = sideInCheck(boardStateCopy);

    if (colorPiecesInCheck) {
        boardStateCopy = updateLegalMovesAfterCheck(colorPiecesInCheck, boardStateCopy);

        boardStateCopy = updateAllMovesAfterCheck(colorPiecesInCheck, boardStateCopy);
    }

    boardStateCopy = filterLegalCastlingMoves(boardStateCopy, colorPiecesInCheck);

    return boardStateCopy;
}