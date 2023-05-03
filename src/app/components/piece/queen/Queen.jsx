export function Queen(props) {
    const { color } = props;

    return ( 
        <div style={{background: "transparent", border: "none"}}>
            <img src={`${process.env.PUBLIC_URL}/assets/piece/queen_${color}.png`} alt="" style={{height: 75, width: 75}} />
        </div>
    )
}