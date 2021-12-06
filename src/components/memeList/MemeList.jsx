import Axios from "axios";
import React, { useState } from "react";

export default function MemeList(props) {
  const { pageId } = props;
  const [memes, setMemes] = useState(props.memes);

  const removeMeme = (id) => {
    Axios.post("http://localhost:3001/removeMemeFromPage", {
      pageId,
      memeId: id,
    })
      .then(() => {
        const newMemes = memes.filter((meme) => meme.memeID !== id);
        setMemes(newMemes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderMemes = () => {
    return (
      <ul>
        {memes.map((row) => {
          return (
            <li key={row.memeID}>
              <img src={row.img}></img>
              <button
                onClick={() => {
                  removeMeme(row.memeID);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return memes.length === 0 ? null : renderMemes();
}
