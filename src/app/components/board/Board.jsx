import './board.css'

import { Square } from '../square/Square';
import { useSelector } from 'react-redux'

export function Board() {
    const boardState = useSelector((state) => state.game.value.board)

    return (
        <div className="board">
            { Object.keys(boardState).map(function(square) {
                const hasPiece = !!boardState[square].piece
                if (hasPiece) {
                    return <Square
                    key={square}
                    square={square}
                    pieceName={boardState[square].piece && boardState[square].piece.pieceName}
                    pieceColor={boardState[square].piece && boardState[square].piece.pieceColor}
                    />
                } else {
                    return <Square
                    key={square}
                    square={square}
                    />
                }
            })}
        </div>
    );
}