import React, { useEffect, useState, useCallback } from "react";
import fire1 from "../video/fire-video.mp4";
import fire2 from "../video/sunfire.mp4";
import bubble from "../video/bubbles.mp4";
import wave from "../video/wave1.mp4";
import charizrd from "../images/charizard.png";
import blastoise from "../images/blastoise.png";

const init = {
    name: null,
    hp: null,
    maxhp: null,
    attack: null,
    defense: null,
    specialattack: null,
    specialdefense: null,
    skill1: null,
    skill2: null,
    image: null,
    speed: null
}
const Playgame = (props) => {
 
    const [isAttack, setIsAttack] = useState(false)
    const [time, setTime] = useState(5000)
    const [blink, setBlink] = useState({player: "", enemy: ""})
    const [isEnemyAttack, setIsEnemyAttack] = useState(false)
    const [skill, setSkill] = useState(null)
    const [isTurn, setIsTurn] = useState(true)
    const [player, setPlayer] = useState(init)
    const [enemy, setEnemy] = useState(init)
  
    const handleAttack = () => {
        setSkill(player.skill1)
        setTime(5000)
        setIsAttack(true)
        setTimeout(()=>{
            setIsAttack(false)      
            setBlink({enemy: "blink"})
        }, 2000)  
        setTimeout(()=>{
            setEnemy((old) => ({...old, hp: old.hp - calculateDamge(player.name, 80, "attack")}))      
           
        }, 3000)
        setIsTurn(false)
        
    }
   
    const handleSpecialAttack = () => {
        setSkill(player.skill2)
        setIsAttack(true)
        setTime(5000)
        setTimeout(()=>{
            setIsAttack(false)
            setBlink({enemy: "blink"})
        }, 2000)
        setTimeout(()=>{
            setEnemy((old) => ({...old, hp: old.hp - calculateDamge(player.name, 80, "specialattack")}))
        }, 3000)
        setIsTurn(false)
        
    }
    const handleRun = () => {
        let odd = Math.floor((player.speed*32)/(Math.floor(enemy.speed/4)%256)) + 10*props.isRun.tried
        if (odd < 256) {
            let random = Math.floor(Math.random()*256);
            if(random < odd) {
                props.setIsRun({escape: true, tried: 1})
                props.setIsPick(false)
            } else {
                props.setIsRun({escape: false, tried: props.isRuntried + 1})
                setIsTurn(false)
                setTime(2000)
            }
        } else {
            props.setIsRun({escape: true, tried: 1})
            props.setIsPick(false)
        }
        
    }
    const handleEndturn = () => {
        setIsTurn(false)
        setBlink({player: "",enemy: ""})
    }

    const calculateDamge = useCallback((name, power, attack) => {
        let lv = 36
        let d = 0
        if(name === player.name && attack === "attack") {
            d = (((2*lv + 10)/250)*(player.attack/enemy.defense))*power
        } else if (name === enemy.name && attack === "attack") {
            d = (((2*lv + 10)/250)*(enemy.attack/player.defense))*power
        } else if (name === player.name && attack === "specialattack") {
            d = (((2*lv + 10)/250)*(player.specialattack/enemy.specialdefense))*power
        } else if (name === enemy.name && attack === "specialattack"){
            d = (((2*lv + 10)/250)*(enemy.specialattack/player.specialdefense))*power
        }
        return (Math.floor(Math.random()*10 + (d - 5)))
    },[enemy, player])

    useEffect(() => {
        const getPokemon = (e) => {
            e.map((p)=> {
                if(p.name === props.player) {
                    setPlayer({name: p.name, hp: p.stats[0].base_stat, maxhp: p.stats[0].base_stat, attack: p.stats[1].base_stat
                        , defense: p.stats[2].base_stat, specialattack: p.stats[3].base_stat, specialdefense: p.stats[4].base_stat, speed: p.stats[5].base_stat})
                    if (props.player === 'charizard') {
                        setPlayer(old => ({...old, skill1: fire1, skill2: fire2, image: charizrd}))
                    } else if (props.player === 'blastoise'){
                        setPlayer(old => ({...old, skill1: wave, skill2: bubble, image: blastoise}))
                    }
                } else if (p.name === props.enemy) {
                    setEnemy({name: p.name, hp: p.stats[0].base_stat, maxhp: p.stats[0].base_stat, attack: p.stats[1].base_stat
                        , defense: p.stats[2].base_stat, specialattack: p.stats[3].base_stat, specialdefense: p.stats[4].base_stat, speed: p.stats[5].base_stat})
                    if (props.enemy === 'charizard') {
                        setEnemy(old => ({...old, skill1: fire1, skill2: fire2, image: charizrd}))
                    } else if (props.enemy === 'blastoise'){
                        setEnemy(old => ({...old, skill1: wave, skill2: bubble, image: blastoise}))
                    }
                }
                return <></>
            })
        }
        getPokemon(props.pokemon)
      
    },[props.pokemon, props.player, props.enemy])
 
    useEffect(()=>{
        function winner() {
            if(player.hp !== null && player.hp < 1) {
                setTimeout(()=>{
                    props.setIsWinner({player: false, enemy: true})
                    props.setIsPick(false)
                }, 1000)
                
            } else if (enemy.hp !== null && enemy.hp < 1) {
                setTimeout(()=>{
                    props.setIsWinner({player: true, enemy: false})
                    props.setIsPick(false)
                }, 1000)
            }
        }
        winner()
    },[props, player.hp, enemy.hp])
    useEffect(() => {
        let damage = 0
        if (isTurn === false) {
            setIsTurn(true)
            setTimeout(() => {
                let random = Math.floor(Math.random()*2)
                if (random === 0) {
                    damage = calculateDamge(enemy.name, 80, "attack")
                    setSkill(enemy.skill1)
                } else {
                    damage = calculateDamge(enemy.name, 80, "specialattack")
                    setSkill(enemy.skill2)
                }
                setIsEnemyAttack(true)
                setTimeout(()=>{
                    setIsEnemyAttack(false)   
                    setBlink({player: "blink"})
                }, 2000)
                setTimeout(()=>{
                    setPlayer((old) => ({...old, hp: old.hp - damage}))      
                }, 3000)
            }, time)
            
        }
        return ()=> {
            setTime(0)
            setIsEnemyAttack(false)
        }
    },[isTurn,calculateDamge, enemy, player, time])

    return (
        <>
        {player.name !== null && enemy.name !== null ?
        <div className="battle">
            <div className="enemy">
                <div className="card">
                    <p>{enemy.name}</p>
                    <progress className="process" value={enemy.hp} max={enemy.maxhp}></progress>
                    <p>HP: {enemy.hp}/{enemy.maxhp}</p>
                </div>
                <img className={`image ${blink.enemy}`} src={enemy.image} alt=""/>
            </div>
            <div className="player">
                <img className={`image ${blink.player}`} src={player.image} alt=""/>
                <div className="card">
                    <p>{player.name}</p>
                    <progress className="process" value={player.hp} max={player.maxhp}></progress>
                    <p>HP: {player.hp}/{player.maxhp}</p>
                </div>
            </div>
            <div className="command-container">
                <div className="text">What is your command?</div>
                <div className="cmd-btn">
                    <button onClick={isTurn ? handleAttack : null}>Attack</button>
                    <button onClick={isTurn ? handleSpecialAttack : null}>Special Attack</button>
                    <button onClick={isTurn ? handleRun : null}>Run</button>
                    <button onClick={isTurn ? handleEndturn : null}>End Turn</button>
                </div>
            </div>
            {isAttack && 
            <div className="attack-scene">
                <img src={enemy.image} alt=""></img>
                <video src={skill} autoPlay muted loop >
                </video>
            </div>}
            {isEnemyAttack && 
                <div className="attack-scene">
                    <img src={player.image} alt=""></img>
                    <video src={skill} autoPlay muted loop >
                    </video>
            </div>}
           </div>
        : <div></div>}
        </>
    );
}

export default Playgame