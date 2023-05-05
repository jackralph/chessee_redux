import './square.css'

export function Square(props) {
    const { handleClick, hasPiece, pieceColor, pieceName, square } = props;

    if (hasPiece) {
        const pieceStyle = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/piece/${pieceName}_${pieceColor}.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }

        return (
            <div id={square} style={pieceStyle} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }</div>
        )
    } else {
        return (
            <div id={square} onClick={() => handleClick(square, hasPiece, pieceColor)}>{ square }</div>
        )
    }
}