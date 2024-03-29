import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import Axios from "axios";
import BadgeList from "../badgeList/BadgeList";

export default function Dashboard({ userID }) {
  const [img, setImg] = useState("");
  const [liked, setLiked] = useState(false);
  const [memeId, setMemeId] = useState(0);
  const [badges, setBadges] = useState([]);

  // adds the user's badges on page load
  useEffect(() => {
    getBadges();
  });

  useEffect(() => {
    Axios.post("http://localhost:3001/incMemeViewCount", {
      userID,
    })
      .then(() => {
        getBadges();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [img]);

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

  const addToPage = () => {
    if (memeId === 0) {
      alert("Need to generate a meme first before adding to a page");
      return;
    }

    const pgTitle = prompt(
      "Please enter in the title of the page you want to add to:"
    );
    Axios.post("http://localhost:3001/getUserPages", {
      userID,
    })
      .then((res) => {
        const desiredPg = res.data.result.filter((pg) => {
          return pg.title === pgTitle;
        });

        if (desiredPg.length === 0) {
          alert("You have no pages with this title");
          return;
        }

        Axios.post("http://localhost:3001/addMemeToPage", {
          pageId: desiredPg[0].pageID,
          memeId,
        })
          .then(() => {
            alert("Successfully added this meme to your page");
          })
          .catch((err) => {
            alert("This meme is already in the page");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dash">
      <div className="btnNav">
        <Link to="/createPage">
          <button>Create Page</button>
        </Link>
        <Link to="/myPages">
          <button>My Pages</button>
        </Link>
      </div>
      <h2> Click 'Generate Meme' to begin! </h2>
      <div className="memeContainer">
        <img id="meme" src={img}></img>
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
      <button
        type="add-to-page"
        id="add-to-page"
        onClick={() => {
          addToPage();
        }}
      >
        Add To Page
      </button>
      <h2>Badges:</h2>
      <BadgeList badges={badges} />
    </div>
  );
}
