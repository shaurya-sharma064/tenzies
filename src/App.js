import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Clock from "./images/clock.png"

function App(){

    const [dice,setDice]=React.useState(allRoller())
    const [tenzies,setTenzies]=React.useState(false)
    const [timer,setTimer]=React.useState(0)

    React.useEffect(()=>setTimeout(()=>setTimer(prevTimer=>prevTimer+1),1000),[timer])

    React.useEffect(()=>{
        const isHeld=dice.every(die=>die.isHeld)
        const val=dice[0].value
        const isSame=dice.every(die=>die.value===val)
        if(isSame && isHeld){
            setTenzies(true)
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
                {tenzies && <Confetti />}
                
                <h1 id="heading">Tenzies {timer}</h1>
                <p id="para">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dieHolder">
                    {tenDice()}
                </div>
                <button className="btn" onClick={tenzies?()=>{setDice(allRoller)
                    setTenzies(false)
                    }:notHeldRoller}>{tenzies?"New Game":"Click Here"}</button>
            </main>
        </div>
    )
}

export default App;