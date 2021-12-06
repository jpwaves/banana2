import Axios from "axios";
import React, { useEffect, useState } from "react";
import MemeList from "../memeList/memeList";

export default function MemePage(props) {
  const { pageId } = props;
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.desc);
  const [memes, setMemes] = useState([]);

  const getMemes = () => {
    Axios.post("http://localhost:3001/getPageMemes", {
      pageId,
    })
      .then((res) => {
        setMemes(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on load, fetch all the memes for this page and render them in MemeList
  useEffect(() => {
    getMemes();
  });

  return (
    <div className="container">
      <h2>{title}</h2>
      <p>{desc}</p>
      <h3>Memes</h3>
      <MemeList pageId={pageId} memes={memes} />
    </div>
  );
}
