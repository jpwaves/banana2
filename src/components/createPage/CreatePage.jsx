import React, { useRef, useState } from "react";
import Axios from "axios";

export default function CreatePage(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
      userId: 1,
    })
      .then(() => {
        console.log("successfully made page");
        clearFields();
        // navigate to page component and load appropriate page data
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
          type="text"
          id="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />

        <label for="desc">Description</label>
        <input
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
