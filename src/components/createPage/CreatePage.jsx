import React, { useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    if (title.length === 0 || title.length > 40) {
      alert("Page title must be less than 40 characters and not blank");
      return;
    }

    if (desc.length > 200) {
      alert("The description must be less than 200 characters");
      return;
    }

    Axios.post("http://localhost:3001/getUserPages", {
      userID,
    })
      .then((res) => {
        if (res.data.result.length >= 5) {
          alert("You have already created the max number of pages!");
          return;
        }

        Axios.post("http://localhost:3001/createPage", {
          title,
          desc,
          userId: userID,
        })
          .then(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="btnNav">
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/myPages">
          <button>My Pages</button>
        </Link>
      </div>
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
