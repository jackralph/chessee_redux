import './board.css'

import { Square } from '../square/Square';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from "react";
import { pieceIsSameColor, validateMove } from "../../utils/move";
import { movePiece } from '../../features/homeSlice';

export function Board() {
    const [highlightedSquare, setHighlightedSquare] = useState(null);
    const boardState = useSelector((state) => state.game.value);
    const dispatch = useDispatch();

    const colorPieceSelected = useRef(null);
    const originSquare = useRef(null);
    const targetSquare = useRef(null);

    function handleClick(square, hasPiece, pieceColor) {
        if (!colorPieceSelected.current) {
            if (hasPiece) {
                colorPieceSelected.current = pieceColor;
                originSquare.current = square;
                setHighlightedSquare(square);
            } else {
                colorPieceSelected.current = null;
                originSquare.current = null;
                setHighlightedSquare(null);
            }
        } else {
            if (hasPiece) {
                if (pieceIsSameColor(boardState, square, colorPieceSelected.current)) {
                    colorPieceSelected.current = null;
                    originSquare.current = null;
                    setHighlightedSquare(null);
                } else {
                    colorPieceSelected.current = pieceColor;
                    targetSquare.current = square;
                    setHighlightedSquare(null);
                }
            } else {
                colorPieceSelected.current = null;
                targetSquare.current = square;
                setHighlightedSquare(null);
            }
        }

        if (originSquare.current && targetSquare.current) {
            const validMove = validateMove(boardState, originSquare.current, targetSquare.current);

            if (validMove) {
                dispatch(movePiece({
                    boardState: boardState,
                    originSquare: Number(originSquare.current),
                    targetSquare: Number(targetSquare.current)
                }));
            }

            colorPieceSelected.current = null;
            originSquare.current = null;
            targetSquare.current = null;
            setHighlightedSquare(null);
        }
        console.groupEnd();
    };

    return (
        <div className="board">
            { Object.keys(boardState).map(function(square) {
                const hasPiece = !!boardState[square].piece;
                if (hasPiece) {
                    return <Square
                    boardState={boardState}
                    handleClick={handleClick}
                    hasPiece={hasPiece}
                    highlightedSquare={highlightedSquare}
                    key={square}
                    square={square}
                    piecesAttackingThisSquare={boardState[square].piecesAttackingThisSquare}
                    pieceName={boardState[square].piece && boardState[square].piece.pieceName}
                    pieceColor={boardState[square].piece && boardState[square].piece.pieceColor}
                    />;
                } else {
                    return <Square
                    boardState={boardState}
                    handleClick={handleClick}
                    hasPiece={hasPiece}
                    key={square}
                    piecesAttackingThisSquare={boardState[square].piecesAttackingThisSquare}
                    square={square}
                    />;
                };
            })}
        </div>
    );
}