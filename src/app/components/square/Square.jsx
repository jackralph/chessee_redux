import './square.css'

import { useSelector } from 'react-redux'

export function Square(props) {
    const boardState = useSelector((state) => state.board.value)

    const { square } = props;

    return (
        <div style={{color: "red"}}>
            { boardState[square].piece.pieceElement } {square}
        </div>
    )
}