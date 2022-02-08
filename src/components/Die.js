
export default function Die(props){
    const styler={
        backgroundColor:props.isHeld?"#0088DD":"#fff"
    }

    return(
        <div className="die" onClick={props.switcher} style={styler}>
            {props.val}
        </div>
    )
}

