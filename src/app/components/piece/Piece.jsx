export function Piece(props) {
    const { color, name } = props;

    return ( 
        <div style={{background: "transparent", border: "none"}}>
            <img src={`${process.env.PUBLIC_URL}/assets/piece/${name}_${color}.png`} alt="" style={{height: 75, width: 75}} />
        </div>
    )
}