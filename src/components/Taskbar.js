import React, { useContext } from "react";
import Datetime from "./Datetime";
import { loginContext } from "./Lockscreen";

const Taskbar = () => {
    const value = useContext(loginContext)
    const handleClick = () => {
        value.setLogin(false)
    }
    return (
        <div className="taskbar">
            <i className="fa fa-power-off" onClick={handleClick}></i>
            <Datetime value={true} type={{month: 'numeric', day: 'numeric', year: 'numeric'}}/>
        </div>
    );
}

export default Taskbar