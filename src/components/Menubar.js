import React, { useContext } from "react";
import { context } from "./Homescreen";

const Menubar = (props) => {
    const value = useContext(context)
    const handleClick = () => {
        props.dispatch({type: props.type})
        value.setHistory([])
    }
    const handlePrev = () => {
        value.setIsBack(true)
    }
    return (
        <div className="menu-bar">
            { value.history.length !== 0 &&  <i className="fas fa-arrow-left" onClick={handlePrev}></i>}
            <i className="fas fa-minus"></i>
            <i className="fas fa-window-restore"></i>
            <i className="fas fa-times" onClick={handleClick}></i>
        </div>
    );

}

export default Menubar