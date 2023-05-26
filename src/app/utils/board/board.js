import { calculateLegalMoves, calculateAllMoves } from '../move/move.js';
import { sideInCheck, moveSquareStateFromOriginToTarget, pieceIsPawn, squareHasPiece, pieceIsSameColor } from '../move/move.shared.js';
import { BOARD_ALGEBRAIC_ARRAY, BOARD_OCTAL_ARRAY, STARTING_POSITION_PIECE_ARRAY, STARTING_POSITION_PIECE_ARRAY_TEST } from "./board.const.js";
import { placePiece, setPieceColor } from './board.shared.js';

// set

/**
 * @function initialiseBoardState
 * @returns {object} boardState
 * @description
 * 1. Maps through the `BOARD_OCTAL_ARRAY`
 * 2. Detects whether the `octalSquare` has a piece
 * 3. Sets the `algebraicNotation`, `octalNotation` & `piecesAttackingThisSquare` for `square`(s) with no `piece`
 * 4. Sets the values from **3.** + `piece` for `square`(s) with a `piece`
 * 5. Returns the `boardState`
 */
function initialiseBoardState() {
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
 * @description Takes the `boardState` and:
 * 1. Loops through each `square` and finds ones that have a `piece`
 * 2. Calculates `legalMoves` for each `piece`
 * 3. Calculates `allMoves` for each `piece`
 * 4. Pushes the `legalMoves` onto the `square`(s) `piece` object
 * 5. Calculates the `piecesAttackingThisSquare` for each `square`(s)
 * 6. Returns the updated `boardStateCopy`
 */
function calculateMovesForInitialBoardState(boardState) {
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
 * @description
 * 1. Initialises the `boardState`
 * 2. Calculates the moves for the `square`(s) in the `boardState` and applies them to the `boardState`
 * 3. Returns the updated `boardState`
 */
export function createBoardState() {
    let boardState = initialiseBoardState();
    boardState = calculateMovesForInitialBoardState(boardState);

    return boardState;
}

// update

/**
 * @function updateLegalMoves
 * @param {object} boardState
 * @returns {object} boardStateCopy
 * @description Takes the copied `boardState` and:
 * 1. calculates the `legalMoves` for each `square` with a `piece` and applies these to the `square`(s) state
 * 2. Returns the updated `boardStateCopy`
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
            const legalMoves = calculateLegalMoves(BOARD_OCTAL_ARRAY, boardStateCopy, pieceColor, pieceHasMoved, pieceName, squareNumber);

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

function updateLegalMovesAfterCheck(colorPiecesInCheck, boardState) {
    let boardStateCopy = {...boardState};

    for (const square in boardStateCopy) {
        const hasPiece = !!boardStateCopy[square].piece;
        if (hasPiece) {
            const piece = boardStateCopy[square].piece
            const pieceColor = piece.pieceColor;
            if (pieceColor === colorPiecesInCheck) {
                const legalMovesForPiece = piece.legalMoves;
                const filteredLegalMovesForPiece = [];
                
                legalMovesForPiece.map(function(move) {
                    let boardStateSecondCopy = {...boardStateCopy};
                    const originSquare = Number(square);
                    const targetSquare = Number(move);
                    boardStateSecondCopy = moveSquareStateFromOriginToTarget(boardStateSecondCopy, originSquare, targetSquare);
                    boardStateSecondCopy = updateLegalMoves(boardStateSecondCopy);
                    boardStateSecondCopy = updateAllMoves(boardStateSecondCopy);
                    
                    const colorPiecesInCheck = sideInCheck(boardStateSecondCopy);

                    if (!colorPiecesInCheck) {
                        filteredLegalMovesForPiece.push(targetSquare);
                    }
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
 * @description Takes the copied `boardState` and:
 * 1. Maps through the `BOARD_OCTAL_ARRAY`, initialises an empty array for each square and adds it to the `piecesAttackingThisSquare` object
 * 2. Applies the `piecesAttackingThisSquare` to each `square`(s) state
 * 3. Returns the updated `boardStateCopy`
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

function updateAllMovesAfterCheck(colorPiecesInCheck, boardState) {
    console.log("updating all moves after check...")
    return boardState;
}

/**
 * @function updateBoardState
 * @param {object} boardState 
 * @param {number} originSquare 
 * @param {number} targetSquare 
 * @returns {object} boardStateCopy
 * @description Takes the current `boardState`, the `originSquare` & `targetSquare`, and:
 * 1. Copies the `boardState` for modification
 * 2. Moves the `originSquare` to the `targetSquare` within the `boardState` and resets the `originSquare`
 * 3. Updates `legalMoves` for all squares following the change in state
 * 4. Updates `piecesAttackingThisSquare` for all squares following the change in state via `updateAllMoves`
 * 5. Identifies if one side is in check and filters **legal** and **all** moves if so
 * 6. Returns the updated `boardStateCopy`
 */
export function updateBoardState(boardState, originSquare, targetSquare) {
    let boardStateCopy = {...boardState};

    boardStateCopy = moveSquareStateFromOriginToTarget(boardStateCopy, originSquare, targetSquare);

    boardStateCopy = updateLegalMoves(boardStateCopy);

    boardStateCopy = updateAllMoves(boardStateCopy);
    
    const colorPiecesInCheck = sideInCheck(boardStateCopy);

    if (colorPiecesInCheck) {
        boardStateCopy = updateLegalMovesAfterCheck(colorPiecesInCheck, boardStateCopy);

        boardStateCopy = updateAllMovesAfterCheck(colorPiecesInCheck, boardStateCopy);
    }

    return boardStateCopy;
}