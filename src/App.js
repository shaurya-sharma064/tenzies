import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'

function App(){

    const [dice,setDice]=React.useState(allRoller())
    const [tenzies,setTenzies]=React.useState(false)

    React.useEffect(()=>{
        const isHeld=dice.every(die=>die.isHeld)
        const val=dice[0].value
        const isSame=dice.every(die=>die.value===val)
        if(isSame && isHeld){
            setTenzies(true)
            alert("Wooohooo")
        }
    },[dice])



    function allRoller(){
        let diceArr=[]
        for(let i=0;i<10;i++){
            diceArr.push({value:singleRoller(),isHeld:false,id:nanoid()})
        }
        return diceArr
    }

    function notHeldRoller(){
        setDice((prevDice)=>{
            return prevDice.map(die=>die.isHeld?die:{...die,value:singleRoller()})
        })
        setTenzies(false)
    }

    function singleRoller(){
        return Math.ceil(Math.random()*6)
    }

    function tenDice(){
        return dice.map(die=><Die key={die.id} val={die.value} isHeld={die.isHeld} switcher={()=>{switcher(die.id)}}/>)
    }

    function switcher(id){
        setDice((prevDice)=>{
            return prevDice.map(die=>die.id===id?{...die,isHeld:!die.isHeld}:die)
        })
    }
    

    return (
        <div>
            <main>
                <div className="dieHolder">
                    {tenDice()}
                </div>
                <button onClick={tenzies?()=>{setDice(allRoller)
                    setTenzies(false)}:notHeldRoller}>{tenzies?"New Game":"Click Here"}</button>
            </main>
        </div>
    )
}

export default App;