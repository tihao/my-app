import React, {useEffect, useState } from "react";

const Datetime = (props) => {
    const [today, setToDay] = useState(new Date());
    const [time, setTime] = useState(today.toLocaleString('en-us', {hour: 'numeric', minute: 'numeric', hour12:true}))
    const [date, setDate] = useState(today.toLocaleString('en-us', props.type))
    const [isHover, setIsHover] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            setToDay( new Date())
            setTime(today.toLocaleString('en-us', {hour: 'numeric', minute: 'numeric', hour12:true}));
            setDate(today.toLocaleString('en-us', props.type));
            
        }, 60000)

        return () => clearInterval(interval)
    })

    const handleMouseOver = () => {
        setIsHover(true)
    }
    const handleMouseOut = () => {
        setIsHover(false)
    }
    return (
        <>
            {isHover && <p className="popup">{today.toLocaleDateString('en-us', {weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'})}</p>}
            <div className="datetime" onMouseOver={props.value ? handleMouseOver : null} onMouseOut={props.value ? handleMouseOut : null}>
                <p>{time}</p>
                <p>{date}</p>
            </div>
        </>
    );
}

export default Datetime