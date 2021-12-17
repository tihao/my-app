import React, { useState } from "react";
import AccessDenied from "./Accessdenied";
import Disk from "./Disk";
import Trashbin from "./Trashbin";
const Thispc = (props) => {
    let text = props.statement

    const [state, setState] = useState({mypc: props.mypc, bin: props.bin})
    const [isAccess, setIsAccess] = useState(false)
    const [pathtext, setPathText] = useState(text)
    const [isProcess, setIsProcess] = useState(false)

    const handdleClick = () => {
        setIsAccess(true)
    }
   
    const onPC = () => {
        setState({mypc: true, bin: false})
        setPathText('This PC > ')
        setIsProcess(false)
    }

    const onBin = () => {
        setState({mypc: false, bin: true})
        setPathText('Trash Bin > ')
    }
    const onChange = (e) => {
        e.preventDefault();
    }
    return (
        <div className="thispc-content">
            <form className="path-container">
                <i className="fas fa-desktop"></i>
                <input className="path" type="text" placeholder={pathtext} onKeyPress={onChange}></input>
            </form>
            <div className="menu-hdd-container">
                <div className="menu-desktop">
                    <button onClick={onPC}>This PC</button>
                    <button onClick={handdleClick}>Network</button>
                    <button onClick={handdleClick}>Backup disk</button>
                    <button onClick={handdleClick}>Download</button>
                    <button onClick={handdleClick}>Document</button>
                    <button onClick={onBin}>Trash Bin</button>
                </div>
                {state.mypc && <Disk isProcess={isProcess} setIsProcess={setIsProcess} setIsAccess={setIsAccess}/>}
                {state.bin && <Trashbin />}
                {isAccess && <AccessDenied isAccess={isAccess} setIsAccess={setIsAccess} />}
            </div>
            
            <div></div>
        </div>
    );
}

export default Thispc