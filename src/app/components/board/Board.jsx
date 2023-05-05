import './board.css'

import { Square } from '../square/Square';
import { useSelector } from 'react-redux';
import { useRef } from "react";
import { pieceIsSameColor } from "../../utils/move";

export function Board() {
    const boardState = useSelector((state) => state.game.value.board);

    const colorPieceSelected = useRef(null);
    const originSquare = useRef(null);
    const targetSquare = useRef(null);

    function handleClick(square, hasPiece, pieceColor) {
        console.group("square clicked")
        console.log(`function arguments: {
            square: ${square},
            hasPiece: ${hasPiece},
            pieceColor: ${pieceColor}
        }`)

        console.log(`opening useRef values: {
            colorPieceSelected: ${colorPieceSelected.current},
            originSquare: ${originSquare.current}
            targetSquare: ${targetSquare.current}
        }`)

        if (!colorPieceSelected.current) {
            console.log("No piece currently selected");
            if (hasPiece) {
                console.log("hasPiece is true");
                colorPieceSelected.current = pieceColor;
                originSquare.current = square;
            } else {
                console.log("hasPiece is false");
                colorPieceSelected.current = null;
                originSquare.current = null;
            }
        } else {
            console.log("piece currenly selected")
            if (hasPiece) {
                console.log("hasPiece is true")
                if (pieceIsSameColor(boardState, square, colorPieceSelected.current)) {
                    console.log("piece is same color");
                    colorPieceSelected.current = null;
                    originSquare.current = null;
                } else {
                    console.log("piece isn't same color");
                    colorPieceSelected.current = pieceColor;
                    targetSquare.current = square;
                }
            } else {
                console.log("hasPiece is false")
                colorPieceSelected.current = null;
                targetSquare.current = square;
            }
        }

        console.log(`closing useRef values: {
            colorPieceSelected: ${colorPieceSelected.current},
            originSquare: ${originSquare.current}
            targetSquare: ${targetSquare.current}
        }`)

        if (originSquare.current && targetSquare.current) {
            console.log(`checking validity of move ${originSquare.current} to ${targetSquare.current}`);
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