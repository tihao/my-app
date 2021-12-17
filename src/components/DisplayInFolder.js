import React from "react";

const DisplayInFolder = (props) => {

    const handdleClick = (item) => {
        if(item.type === 'Folder' && item.child !== '') {
            props.setNewData(item.child)
            props.setHistory([...props.history,props.data])
        }
    }

    return(
        <>
        {props.data.map((item, index) => {
            return <div className="content" key={index} onClick={() => handdleClick(item)}>
                <i className={item.classname}></i>
                <p>{item.name}</p>
                <p>{item.date_modified}</p>
                <p>{item.type}</p>
                <p>{item.size}</p>
            </div>
        })}
        </>
    );
}

export default DisplayInFolder