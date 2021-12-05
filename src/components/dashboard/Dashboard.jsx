import React, { useState, useEffect } from 'react';
import "./Dashboard.scss";
import Axios from 'axios';
import Login from '../login/Login';

export default function Dashboard() {

    const [img, setImg] = useState("");
    const [liked, setLiked] = useState(false);
    const [memeId, setMemeId] = useState(0);
    const [userId, setUserId] = useState(0);
    const userID = React.useContext(userID);

    const genMeme = () => {
        Axios.post("http://localhost:3001/readMeme", {
            category: [],
        })
            .then((res) => {
                setImg(res.data.result.img);
                setMemeId(res.data.result.memeID);
                setLiked(false);
                checkFav();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const favMeme = () => {
        Axios.post("http://localhost:3001/favoriteMeme", {
            userId: 1,
            memeId: memeId,
        })
            .then(() => {
                setLiked(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const checkFav = () => {
        Axios.post("http://localhost:3001/checkFav", {
            userId: 1,
            memeId: memeId,
        })
            .then((res) => {
                if (res.data.result) {
                    setLiked(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="dash">

            <h2> Hello , </h2>
            <div className="memeContainer">
                <img id="meme" src={img} width="900" height="600"></img>
            </div>
            <button onClick={() => {
                genMeme();
            }} type="next" id="next">Generate Meme</button>
            {!liked &&
                <button onClick={() => {
                    favMeme();
                }} type="like" id="like">Like</button>
            }
            {liked &&
                <h3> Liked! </h3>}
            <button type="add-to-page" id="add-to-page">Add To Page</button>
        </div>

    );
}