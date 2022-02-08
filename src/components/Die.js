
export default function Die(props){
    const styler={
        backgroundColor:props.isHeld?"red":"yellow"
    }

    return(
        <div className="die" onClick={props.switcher} style={styler}>
            {props.val}
        </div>
    )
}

