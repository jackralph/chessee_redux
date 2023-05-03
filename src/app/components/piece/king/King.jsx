export function King(props) {
    const { color } = props;

    return ( 
        <div style={{background: "transparent", border: "none"}}>
            <img src={`${process.env.PUBLIC_URL}/assets/piece/king_${color}.png`} alt="" style={{height: 75, width: 75}} />
        </div>
    )
}