import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import MemeList from "../memeList/MemeList";
import "./MemePage.scss";

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
    if (newTitle.length > 40) {
      alert(
        "This title is too long! Keep the length of the title under 40 characters."
      );
      return;
    }

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
    if (newDesc.length > 200) {
      alert(
        "This description is too long! Keep the length of the description under 200 characters."
      );
      return;
    }

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
      <p id="description">{desc}</p>
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
        <textarea ref={descField} id="desc" rows="4" />
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
