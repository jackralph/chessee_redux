import './board.css'

import { Square } from '../square/Square';
import { useSelector } from 'react-redux'

export function Board() {
    const boardState = useSelector((state) => state.game.value.board)

    return (
        <div className="board">
            { Object.keys(boardState).map(function(square) {
                return <Square
                key={square}
                square={square}
                pieceName={boardState[square].piece.pieceName}
                pieceColor={boardState[square].piece.pieceColor}
                />
            })}
        </div>
    );
}