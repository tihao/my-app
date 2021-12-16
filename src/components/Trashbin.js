import React from "react";

const data = [
    {
        classname: 'fas fa-file-alt',
        filename: 'noted',
        location: 'C:\\User\\HaoLe\\Document',
        date_delete: '11/11/2021 21:21PM',
        size: '1KB',
        item_type: 'text document',
        date_modified: '10/10/2020 10:20AM'
    }
]
const Trashbin = () => {
    return (
        <div className="trashbin">
            <div className="title">
                <p></p>
                <p>Name</p>
                <p>Original Location</p>
                <p>Date Deleted</p>
                <p>Size</p>
                <p>Item Type</p>
                <p>Date Modified</p>
            </div>
            {data.map(item => {
                return <div className="content" key={item.toString()}>
                    <i className={item.classname}></i>
                    <p>{item.filename}</p>
                    <p>{item.location}</p>
                    <p>{item.date_delete}</p>
                    <p>{item.size}</p>
                    <p>{item.item_type}</p>
                    <p>{item.date_modified}</p>
                </div>
            })}
        </div>
    );
}

export default Trashbin