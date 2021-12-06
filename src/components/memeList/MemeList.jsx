import Axios from "axios";
import React, { useEffect, useState } from "react";

export default function MemeList(props) {
  const { pageId, categoryHandler } = props;
  const [memes, setMemes] = useState([]);
  console.log(props);
  useEffect(() => {
    setMemes(props.memes);
  }, [props.memes]);

  const removeMeme = (id) => {
    Axios.post("http://localhost:3001/removeMemeFromPage", {
      pageId,
      memeId: id,
    })
      .then(() => {
        const newMemes = memes.filter((meme) => meme.memeID !== id);
        setMemes(newMemes);
        categoryHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderMemes = () => {
    console.log(memes);
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

  const renderNoMemes = () => {
    return <p>There are no memes on this page.</p>;
  };

  return memes.length === 0 ? renderNoMemes() : renderMemes();
}
