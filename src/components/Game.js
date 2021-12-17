import React, { useEffect, useState, useMemo } from "react";
import Playgame from "./Playgame";

const Pokemon = (props) => {

    const [player, setPlayer] = useState('')
    const [enemy, setEnemy] = useState('')
    const [pokemon, setPokemon] = useState([])
    const [isPick, setIsPick] = useState(false)
    const [iswinner, setIsWinner] = useState({player: false, enemy: false})
    const [isRun, setIsRun] = useState({escape: false, tried: 1})

    const pokemonPick = useMemo(() => {
        return ['charizard','blastoise'];
    }, []);

    useEffect(() => {
        const getPokemon = () => {
            pokemonPick.forEach(pname => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${pname}`)
                .then(res => res.json())
                .then(result => {
                    setPokemon(existpokemon => [...existpokemon,result])
                })
            })
        }
        getPokemon()
        return () => setPokemon([])
    },[pokemonPick])
  

    const handleClick = (p) => {
        setIsPick(!isPick)
        pokemonPick.filter((e) => {
            if (e === p.name) {
                setPlayer(e)
            }
            else {
                setEnemy(e)
            }
            return (()=> {
                <></>
            })
        })
    }

    return (
        <div className="pokemon">
            {!isPick && <div>
                <p>Pick Your Pokemon</p>
                <div className="container">
                    {pokemon.map((p, index) => (
                        <div key={index}>
                            <div className="pokemon-card" onClick={() => handleClick(p, index)}>
                                <p className="name">{p.name}</p>
                                <img className="img" src={p.sprites.front_default} alt="" />
                                <div className="stats">
                                    <p>HP: {p.stats[0].base_stat}</p>
                                    <p>ATTACK: {p.stats[1].base_stat}</p>
                                    <p>DEFENSE: {p.stats[2].base_stat}</p>
                                    <p>SPECIAL ATTACK: {p.stats[3].base_stat}</p>
                                    <p>SPECIAL DEFENSE: {p.stats[4].base_stat}</p>
                                    <p>SPEED: {p.stats[5].base_stat}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
             }
            {isPick && <Playgame player={player} enemy={enemy} pokemon={pokemon} setIsWinner={setIsWinner} setIsPick={setIsPick} isRun={isRun} setIsRun={setIsRun}/>} 
            {iswinner.player && <div className="result">You win, good job </div>}
            {iswinner.enemy && <div className="result">You lose, try again</div>}
            {isRun.escape && <div className="result"> You run away :( </div>}
        </div>
    );
}

export default Pokemon