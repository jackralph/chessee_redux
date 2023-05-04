import { useDispatch, useSelector } from "react-redux";

export function Piece(props) {
    const { octalSquare, color, name } = props;

    const boardState = useSelector((state) => state.board.value);
    const dispatch = useDispatch();

    const selectPiece = () => {
        const pieceSelected = boardState[octalSquare].piece;
        console.log(`selected piece on ${octalSquare}`);
        console.log(`legal moves: ${pieceSelected.legalMoves}`);

    }

    return ( 
        <div style={{background: "transparent", border: "none"}} onClick={selectPiece}>
            <img src={`${process.env.PUBLIC_URL}/assets/piece/${name}_${color}.png`} alt="" style={{height: 75, width: 75}} />
        </div>
    )
}