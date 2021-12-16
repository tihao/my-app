import React, {useState} from 'react';
import Error from './Error'
import Homescreen from './Homescreen';
import image from '../images/image.jpg'
const pwd = '2021'
const Signin = () => {
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);
    const handleKey = (e) => {
        if (e.key === 'Enter') {
            logginIn(e.target.value);
            e.target.value = "";        
        }
    }
    const logginIn = (e) => {
        if (e === pwd) {
            setLogin(true)
        }
        else {
         
            setError(true)
        }

    }
    const guestLogin = () => {
        setLogin(true)
    }
    if(login) {
        return <Homescreen />
    }
    return (
        <div>
            <div className="lockscreen-blur">
            </div>
            <div className="login">
                {error && <Error value={setError}/>}
                {!error && <div className="content">
                    <img src={image}  alt=""/>
                    <p>Hao Le</p>
                    <input type="number" placeholder="PIN" autoFocus onKeyDown={handleKey}></input>
                    <p className='guestlogin' onClick={guestLogin}>Sign in as guest</p>
                    <p>I forgot my PIN</p> 
                </div>
                }
            </div>
        </div>
        );  
}

export default Signin;