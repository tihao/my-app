import React, { createContext, useState } from 'react';
import Signin from './Signin';
import Datetime from './Datetime';
export const loginContext = createContext()
const Lockscreen = () => {
    const [isLogin, setLogin] = useState(false)

    const handleClick = () => {
        setLogin(true)
    }

    return (
        <div>
            {!isLogin ? <div className="lockscreen" onClick={handleClick}><Datetime value={false} type={{weekday: 'short', month: 'long', day: 'numeric'}} /></div> : <div><loginContext.Provider value={{setLogin}}><Signin /></loginContext.Provider></div> }
        </div>
    );
}

export default Lockscreen