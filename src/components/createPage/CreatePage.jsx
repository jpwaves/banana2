import React, { useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

export default function CreatePage({ userID }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const titleField = useRef(null);
  const descField = useRef(null);
  const clearFields = () => {
    titleField.current.value = "";
    descField.current.value = "";
  };

  const makePage = () => {
    Axios.post("http://localhost:3001/createPage", {
      title,
      desc,
      userId: userID,
    })
      .then(() => {
        console.log("successfully made page");
        clearFields();
        alert("successfully made page");

        // navigate to dashboard after successfully creating the page
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        clearFields();
        alert("Failed to make page");
      });
  };

  return (
    <div className="container">
      <h2>Create a Page</h2>
      <form id="pageInputs">
        <label for="title">Page Title</label>
        <input
          ref={titleField}
          type="text"
          id="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />

        <label for="desc">Description</label>
        <input
          ref={descField}
          type="text"
          id="desc"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
          required
        />

        <button
          type="button"
          id="submit-pageInputs"
          onClick={() => {
            makePage();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
