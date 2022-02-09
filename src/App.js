import React from "react"
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Clock from "./images/clock.png"
import Dice from "./images/dice.png"
import Reset from "./images/reset.png"
import Leaderboard from "./images/leaderboard.png"
import Back from "./images/back.png"

function App(){

    const [dice,setDice]=React.useState(allRoller())
    const [tenzies,setTenzies]=React.useState(false)
    const [timer,setTimer]=React.useState(0)
    const [rolls,setRolls]=React.useState(0)
    const [screen,setScreen]=React.useState(true)
    const [topScore,setTopScore]=React.useState(()=>JSON.parse(localStorage.getItem("topScore"))|| [])
    const [staticTimer,setStaticTimer]=React.useState(0)

    
    React.useEffect(()=>timeInterval(),[])

    


    React.useEffect(()=>{
        const isHeld=dice.every(die=>die.isHeld)
        const val=dice[0].value
        const isSame=dice.every(die=>die.value===val)
        if(isSame && isHeld){
            setTenzies(true)
        }
    },[dice])

    React.useEffect(()=>{
        if(tenzies){
            setStaticTimer(timer)
            setTopScore(prevScores=>{        
                if(prevScores.length===0){
                    return [{rolls:rolls,timer:timer,score:1000-(timer+rolls)}]
                }else{
                    let i
                    let flag=0
                    let newScores=[]
                    for(i=0;i<prevScores.length;i++){
                        if(prevScores[i].score<1000-(timer+rolls) && flag===0){
                            newScores.push({rolls:rolls,timer:timer,score:1000-(timer+rolls)})
                            flag=1
                        }
                        if(newScores.length<10){
                            newScores.push(prevScores[i])
                        }
                    }
                    if(flag!=1 && newScores.length<10){
                        newScores.push({rolls:rolls,timer:timer,score:1000-(timer+rolls)})
                    }
                    return newScores
                }
            })
        }
    },[tenzies])

    React.useEffect(()=>{
        localStorage.setItem("topScore",JSON.stringify(topScore))
    },[topScore])

    function tableData(){
        let newArr=[]
        for(let i=0;i<topScore.length;i++){
            newArr.push(<tr key={i+1}>
                <td>
                    {i+1}
                </td>
                <td>
                    {topScore[i].rolls}
                </td>
                <td>
                    {topScore[i].timer}
                </td>
                <td>
                    {topScore[i].score}
                </td>
            </tr>)
        }
        return newArr
    }


    function allRoller(){
        let diceArr=[]
        for(let i=0;i<10;i++){
            diceArr.push({value:singleRoller(),isHeld:false,id:nanoid()})
        }
        return diceArr
    }

    function notHeldRoller(){
        setRolls(prevRoll=>prevRoll+1)
        setDice((prevDice)=>{
            return prevDice.map(die=>die.isHeld?die:{...die,value:singleRoller()})
        })
        setTenzies(false)
    }
    

    function timeInterval(){
        setInterval(()=>setTimer(prevTimer=>prevTimer+1),1000)
    }

    function resetGame(){
        setDice(allRoller)
        setTenzies(false)
        setRolls(0)
        setTimer(0)
        setScreen(true)
        
        
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
    if(screen){
    return (
        <div>
            {tenzies && <Confetti />}
            <main>
                
                <div id="options">
                    <img id="img-reset" src={Reset} onClick={resetGame}/><img id="img-leaderboard" src={Leaderboard} onClick={()=>setScreen(false)}/>
                    
                </div>
                <h1 id="heading">Tenzies</h1>

                <p id="para">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

                <div id="scores">
    
                    <div id="rolls">
                        <p id="heading--rolls">Rolls</p>
                        <img id="logo--roll" src={Dice}/>
                        <p id="currentScore">{rolls}</p>
                    </div>

                    <div id="timer">
                        <p id="heading--timer">Timer</p>
                        <img id="logo--timer" src={Clock}/>
                        <p id="currentTimer">{tenzies?staticTimer:timer}</p>
                    </div>

                </div>
                
                <div className="dieHolder">
                    {tenDice()}
                </div>
                <button className="btn" onClick={tenzies?resetGame:notHeldRoller}>{tenzies?"New Game":"Roll Dice"}</button>
            </main>
        </div>
    )
    }
    return( 
        <div>
            <main>
            <div id="options">
                    <img id="img-back" src={Back} onClick={resetGame}/>
            </div>
            <h1 id="heading">Leaderboard</h1>
                {topScore.length===0 && <h1>No rankings yet</h1>}
                {topScore.length!==0 && <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Rolls</th>
                            <th>Time</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData()}
                    </tbody>
                    </table>}
            <table>
            </table>
            </main>
        </div>
    )
}

export default App;