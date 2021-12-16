import React, {useState} from "react";

const AccessDenied = (props) => {
    const [classname, setClassName] = useState("")

    const handdleClick = () => {
        props.setIsAccess(false)
     
    }

    const outsidehanddleClick = () => {
        setClassName("flash-error")
        setTimeout(() => {
            setClassName("")
        },500)
    }

    return (
        <>
        {props.isAccess && 
        <div className="outside-denied" onClick={outsidehanddleClick}></div>}
        <div className="denied-message">
            <p>Access is denied</p>
            <button className={classname} onClick={handdleClick} autoFocus>OK</button>
           
        </div>
        </>
    );
}

export default AccessDenied