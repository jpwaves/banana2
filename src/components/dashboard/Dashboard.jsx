import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import Axios from "axios";
import BadgeList, { MemoizedBadgeList } from "../badgeList/BadgeList";

export default function Dashboard({ userID }) {
    const [img, setImg] = useState("");
    const [liked, setLiked] = useState(false);
    const [memeId, setMemeId] = useState(0);
    const [badges, setBadges] = useState([]);

    // adds the user's badges on page load
    useEffect(() => {
        getBadges();
    }, []);

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
    };

    const favMeme = () => {
        Axios.post("http://localhost:3001/favoriteMeme", {
            userId: userID,
            memeId: memeId,
        })
            .then(() => {
                setLiked(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const checkFav = () => {
        Axios.post("http://localhost:3001/checkFav", {
            userId: userID,
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
    };

    // need to change the userId from the hardcoded value to the actual user id
    const getBadges = () => {
        Axios.post("http://localhost:3001/getUserBadges", {
            userId: userID,
        })
            .then((res) => {
                setBadges(res.data.result);
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
    };

    return (
        <div className="dash">
            <h2> Hello , </h2>
            <div className="memeContainer">
                <img id="meme" src={img} width="900" height="600"></img>
            </div>
            <button
                onClick={() => {
                    genMeme();
                }}
                type="next"
                id="next"
            >
                Generate Meme
            </button>
            {!liked && (
                <button
                    onClick={() => {
                        favMeme();
                    }}
                    type="like"
                    id="like"
                >
                    Like
                </button>
            )}
            {liked && <h3> Liked! </h3>}
            <button type="add-to-page" id="add-to-page">
                Add To Page
            </button>
            <h2>Badges:</h2>
            <BadgeList badges={badges} />
        </div>
    );
}
