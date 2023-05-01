import './board.css'

import { Square } from '../square/Square';
import { useSelector } from 'react-redux'

export function Board() {
    const boardState = useSelector((state) => state.board.value)

    return (
        <div className="board">
            { Object.keys(boardState).map(function(square) {
                return <Square
                key={square}
                square={square}
                />
            })}
        </div>
    );
}