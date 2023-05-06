import './square.css'

import { calculateSquareDominance } from '../../utils/board'

export function Square(props) {
    const { boardState, handleClick, hasPiece, highlightedSquare, piecesAttackingThisSquare, pieceColor, pieceName, square } = props;

    console.log(`pieces attacking square ${square}: ${piecesAttackingThisSquare}`)

    const squareDominance = calculateSquareDominance(boardState, piecesAttackingThisSquare);
    let squareStyle = {};
    
    if (squareDominance > 0) {
        squareStyle = {
            backgroundColor: "rgba(255, 0, 0, 0.2)"
        }
    } else if (squareDominance < 0) {
        squareStyle = {
            backgroundColor: "rgba(0, 0, 255, 0.2)"
        }
    }

    if (hasPiece) {
        const pieceStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/piece/${pieceName}_${pieceColor}.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: highlightedSquare === square && "solid green",
            backgroundColor: squareStyle.backgroundColor
        }

        return (
            <div id={square} style={pieceStyle} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }{piecesAttackingThisSquare.map(piece => `[${piece}]`)}</div>
        )
    } else {
        const emptySquareStyle = {
            backgroundColor: squareStyle.backgroundColor
        }

        return (
            <div id={square} style={emptySquareStyle} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }{piecesAttackingThisSquare.map(piece => `[${piece}]`)}</div>
        )
    }
}