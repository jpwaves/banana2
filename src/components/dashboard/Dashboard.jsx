import React, {useState, useEffect } from 'react';
import "./Dashboard.scss";

export default function Dashboard() {
    
    const [role, setRole] = useState("")

    return(
        <div className="dash"> 

            <h2> Hello , </h2>
            <div className="memeContainer">
                <img id = "meme" src = "" width="900" height="600"></img>
            </div>
        <button type="like" id = "like">Like</button>
        <button type="next" id = "next">Next</button>
        <button type="add-to-page" id = "add-to-page">Add To Page</button>
        </div>
    
    );
}