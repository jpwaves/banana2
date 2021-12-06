import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import MemeList from "../memeList/MemeList";

export default function MemePage() {
  const location = useLocation();
  const pageId = location.state.pageID;
  const [title, setTitle] = useState(location.state.title);
  const [desc, setDesc] = useState(location.state.desc);
  const [memes, setMemes] = useState([]);
  const [categories, setCategories] = useState("");
  const titleField = useRef(null);
  const descField = useRef(null);

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

  const getPageCategories = () => {
    Axios.post("http://localhost:3001/getPageCategories", {
      pageId,
    })
      .then((res) => {
        console.log(res.data);
        const cats = res.data.result.map((row) => row.name);
        cats.length > 0
          ? setCategories(cats.join(", "))
          : setCategories("No categories for this page");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on load, fetch all the memes for this page and render them in MemeList
  useEffect(() => {
    getMemes();
    getPageCategories();
  }, []);

  const changeTitle = (newTitle) => {
    Axios.post("http://localhost:3001/updatePageTitle", {
      pageId,
      newTitle,
    })
      .then(() => {
        setTitle(newTitle);
        titleField.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeDesc = (newDesc) => {
    Axios.post("http://localhost:3001/updatePageDescription", {
      pageId,
      newDesc,
    })
      .then(() => {
        setDesc(newDesc);
        descField.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2>{title}</h2>
      <p>{desc}</p>
      <h4>Categories of Memes: {categories}</h4>
      <h3>Memes</h3>
      <MemeList
        pageId={pageId}
        memes={memes}
        categoryHandler={getPageCategories}
      />
      <h4>Update Page Settings</h4>
      <form id="update-page-title">
        <label for="title">Update Title</label>
        <input ref={titleField} type="text" id="title" />

        <button
          type="button"
          onClick={() => {
            changeTitle(titleField.current.value);
          }}
        >
          Submit
        </button>
      </form>
      <form id="update-page-desc">
        <label for="desc">Update Description</label>
        <input ref={descField} type="text" id="desc" />
        <button
          type="button"
          onClick={() => {
            changeDesc(descField.current.value);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
