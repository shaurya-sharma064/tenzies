import One from "../images/one.png"
import Two from "../images/two.png"
import Three from "../images/three.png"
import Four from "../images/four.png"
import Five from "../images/five.png"
import Six from "../images/six.png"

export default function Die(props){
    const styler={
        backgroundColor:props.isHeld?"#0088DD":"#fff"
    }
    let value
    switch(props.val){
        case 1:
            value=One
            break
        case 2:
            value=Two
            break
        case 3:
            value=Three
            break
        case 4:
            value=Four
            break
        case 5:
            value=Five
            break
        case 6:
            value=Six
            break
    }
    return(
        <div className="die" onClick={props.switcher} style={styler}>
            <img src={value} alt={props.val}/>
        </div>
    )
}

