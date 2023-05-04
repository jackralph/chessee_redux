import './square.css'

import { useSelector } from 'react-redux'

export function Square(props) {
    const boardState = useSelector((state) => state.game.value.board)

    const { square } = props;

    return (
        <div id={square} style={{color: "black", fontWeight: "bold"}}>
            { square } { boardState[square].piece.pieceElement }
        </div>
    )
}