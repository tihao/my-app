import React from 'react';


const Error = (props) => {
    const onClick = () => {
        props.value(false)
    }
    return (
        <div className="error">
            <p>You have entered an incorrect PIN</p>
            <p>Please try it again</p>
            <button onClick={onClick}>OK</button>
        </div>
    );
}

export default Error;