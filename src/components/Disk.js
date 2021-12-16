import React from "react";
import Folder from "./Folder";

const Disk = (props) => {

    const handdleClick = () => {
        props.setIsAccess(true)
    }

    const handdleClickToD = () =>{
        props.setIsProcess(true)
    }
    return (
        <>
            {!props.isProcess && <div className="hdd">
                <button onClick={handdleClick}>
                    <i className="fas fa-hdd"></i>
                    <label>
                        <p>Disk(C:)</p>
                        <div className="progressbar1">
                            <div></div>
                        </div>
                        <p>1 GB free of 5 GB</p>
                    </label>
                </button>
                <button onClick={handdleClickToD}>
                    <i className="fas fa-hdd"></i>
                    <label>
                        <p>Software(D:)</p>
                            <div className="progressbar2">
                                <div></div>
                            </div>
                        <p>4 GB free of 5 GB</p>
                    </label>
                </button>
            </div>}
            {props.isProcess &&  <Folder />}
        </>
    );
}

export default Disk