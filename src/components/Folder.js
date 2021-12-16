import React, { useContext, useEffect, useState } from "react";
import { data } from "./Data";
import DisplayInFolder from "./DisplayInFolder";
import { context } from "./Homescreen";


const Folder = () => {
    const [newData, setNewData] = useState(data)
    const value = useContext(context)

    useEffect(()=>{
        if(value.isBack === true) {
            value.setIsBack(false)
            setNewData(value.history[value.history.length-1])
            value.setHistory(value.history.slice(0,-1))
        }
    },[value])
    
    return (
        <div className="folder">
            <div className="title">
                <p></p>
                <p>Name</p>
                <p>Date Modified</p>
                <p>Item Type</p>
                <p>Size</p>
            </div>
            <div className="scroll">
            <DisplayInFolder data={newData} setNewData={setNewData} history={value.history} setHistory={value.setHistory}></DisplayInFolder>  
            
            </div>       
        </div>
    );
}

export default Folder