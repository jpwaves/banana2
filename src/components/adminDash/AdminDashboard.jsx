import React from 'react'
import "./AdminDashboard.scss"

export default function AdminDashboard() {

    const deleteMeme = () => {

    }

    const addMeme = () => {

    }

    return (
        <div className="dash">
            <h2> Admin Dash </h2>
            <div className="delContainer">
                <button onClick={() => deleteMeme()} id="delMeme"> Delete Meme </button>
            </div>
            <div className="addContainer">
                <button onClick={() => addMeme()} id="addMeme"> Create Meme </button>
            </div>
        </div>
    )
}
