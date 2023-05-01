import './square.css'

import { useSelector } from 'react-redux'

export function Square(props) {
    const boardState = useSelector((state) => state.board.value)

    const { square } = props;

    return (
        <div id={square} style={{color: "red"}}>
            { square } { boardState[square].piece.pieceElement }
        </div>
    )
}