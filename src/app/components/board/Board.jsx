import './board.css'

import { Square } from '../square/Square';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from "react";
import { pieceIsSameColor, validateMove } from "../../utils/move";
import { movePiece } from '../../features/homeSlice';

export function Board() {
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
            } else {
                colorPieceSelected.current = null;
                originSquare.current = null;
            }
        } else {
            if (hasPiece) {
                if (pieceIsSameColor(boardState, square, colorPieceSelected.current)) {
                    colorPieceSelected.current = null;
                    originSquare.current = null;
                } else {
                    colorPieceSelected.current = pieceColor;
                    targetSquare.current = square;
                }
            } else {
                colorPieceSelected.current = null;
                targetSquare.current = square;
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
        }
        console.groupEnd();
    };

    return (
        <div className="board">
            { Object.keys(boardState).map(function(square) {
                const hasPiece = !!boardState[square].piece;
                if (hasPiece) {
                    return <Square
                    key={square}
                    handleClick={handleClick}
                    hasPiece={hasPiece}
                    square={square}
                    pieceName={boardState[square].piece && boardState[square].piece.pieceName}
                    pieceColor={boardState[square].piece && boardState[square].piece.pieceColor}
                    />;
                } else {
                    return <Square
                    key={square}
                    handleClick={handleClick}
                    hasPiece={hasPiece}
                    square={square}
                    />;
                };
            })}
        </div>
    );
}