import './square.css'

// import { useSelector } from 'react-redux';
// import { useState } from "react";

export function Square(props) {
    // const [octalSquareClicked, setOctalSquareClicked] = useState(null);
    // const [targetSquareClicked, setTargetSquareClicked] = useState(null);

    // const boardState = useSelector((state) => state.game.value.board);

    const { pieceColor, pieceName, square } = props;

    
    if (pieceName && pieceColor) {
        const pieceStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/piece/${pieceName}_${pieceColor}.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }

        return (
            <div id={square} style={pieceStyle}>{ square }</div>
        )
    } else {
        return (
            <div id={square}>{ square }</div>
        )
    }
}