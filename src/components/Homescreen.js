import React, {useReducer, useState } from "react";
import Calculator from "./Calculator";
import Menubar from "./Menubar";
import Taskbar from "./Taskbar"
import Thispc from "./Thispc";
import Weather from "./Weather";
import Pokemon from "./Game";
export const context = React.createContext()

function reducer(state, action) {
    switch(action.type) {
        case 'reset':
            return action.payload
        case 'mypc':
            return {...state,mypc: !state.mypc,bin: false}
        case 'bin':
            return {...state,bin: !state.bin, mypc: false}
        case 'brower':
            return {brower: !state.brower}
        case 'music':
            return {music: !state.music}
        case 'calculator':
            return {...state, calculator: !state.calculator}
        case 'email':
            return {email: !state.email}
        case 'weather':
            return {...state,weather: !state.weather}
        case 'game':
            return {...state,game: !state.game}
        default:
            throw new Error()
    }
}


const Homescreen = () => {
    const init = {mypc: false, bin: false, brower: false, music: false, calculator: false, email: false, weather: false, game: false}

    const [state, dispatch] = useReducer(reducer, init)
    const [isBack, setIsBack] = useState(false)
    const [history, setHistory] = useState([])
    const mypcRender = <div className="app-container"><Menubar type="mypc" dispatch={dispatch} /><Thispc mypc={true} bin={false} statement="This PC > "/></div>
    const binRender = <div className="app-container"><Menubar type="bin" dispatch={dispatch} /><Thispc mypc={false} bin={true} statement="Trash Bin > "/></div>
    const weatherRender =<div className="weather-container"><Menubar type="weather" dispatch={dispatch} /><Weather /></div>
    const calculatorRender = <div className="calculator-container"><Menubar type="calculator" dispatch={dispatch} /><Calculator /></div>
    const gameRender = <div className="game-container"><Menubar type="game" dispatch={dispatch} /><Pokemon /></div>
    return (
        <div className="homescreen">
            <div className="screen-icon">
                <button className="desktop-icon" onClick={()=>!state.mypc && dispatch({type: 'mypc'})}>
                    <div className="fas fa-desktop"></div>
                    <p>My PC</p>
                </button>
                <button className="desktop-icon" onClick={() =>!state.bin && dispatch({type: 'bin'})}>
                    <div className="fas fas fa-trash"></div>
                    <p>Trash Bin</p>
                </button>
                <button className="desktop-icon" onClick={() => dispatch({type: 'brower'})}>
                    <div className="fas fas fa-feather"></div>
                    <p>Internet brower</p>
                </button>
                <button className="desktop-icon" onClick={() => dispatch({type: 'music'})}>
                    <div className="fas fas fa-music"></div>
                    <p>Music</p>
                </button>
                <button className="desktop-icon" onClick={() => !state.calculator && dispatch({type: 'calculator'})}>
                    <div className="fas fas fa-calculator" ></div>
                    <p>Calculator</p>
                </button>
                <button className="desktop-icon" onClick={() => dispatch({type: 'email'})}>
                    <div className="fas fas fa-envelope"></div>
                    <p>Email</p>
                </button>
                <button className="desktop-icon" onClick={() => !state.weather && dispatch({type: 'weather'})}>
                    <div className="fas fas fa-cloud-moon"></div>
                    <p>Weather</p>
                </button>
                <button className="desktop-icon" onClick={() => !state.game && dispatch({type: 'game'})}>
                    <div className="fas fas fa-dragon"></div>
                    <p>Game</p>
                </button>
                <context.Provider value={{history, setHistory, isBack, setIsBack}}>
                    {state.mypc && mypcRender}
                    {state.bin && binRender}
                    {state.weather && weatherRender}
                    {state.calculator && calculatorRender}
                    {state.game && gameRender}
                </context.Provider>
                
            </div>
            <Taskbar />
        </div>

    );
}

export default Homescreen