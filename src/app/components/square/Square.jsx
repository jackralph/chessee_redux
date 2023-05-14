import './square.css'

import { calculateSquareDominance } from '../../utils/board/board.shared.js'

export function Square(props) {
    const {
        boardState,
        handleClick,
        hasPiece,
        highlightedSquare,
        highlightedSquareLegalMoves,
        piecesAttackingThisSquare,
        pieceColor,
        pieceName,
        square
    } = props;

    const squareDominance = calculateSquareDominance(boardState, piecesAttackingThisSquare);
    const squareIsAttackedBySelectedPiece = highlightedSquareLegalMoves.includes(Number(square))
    let squareStyle = {
        border: (squareIsAttackedBySelectedPiece && "solid green") || (highlightedSquare === square && "solid green")
    };

    if (squareDominance > 0) {
        squareStyle.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else if (squareDominance < 0) {
        squareStyle.backgroundColor = "rgba(0, 0, 255, 0.2)";
    }

    if (hasPiece) {
        const pieceStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/piece/${pieceName}_${pieceColor}.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: squareStyle.border,
            backgroundColor: squareStyle.backgroundColor
        }

        return (
            <div id={square} style={pieceStyle} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }{piecesAttackingThisSquare.map(piece => `[${piece}]`)}</div>
        )
    } else {
        return (
            <div id={square} style={squareStyle} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }{piecesAttackingThisSquare.map(piece => `[${piece}]`)}</div>
        )
    }
}