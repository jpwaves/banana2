import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageList from "../pageList/PageList";
import "./MyPages.scss";

export default function MyPages({ userID }) {
  const [pages, setPages] = useState([]);

  const getUserPages = () => {
    Axios.post("http://localhost:3001/getUserPages", {
      userID: userID,
    })
      .then((res) => {
        setPages(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(userID);
    getUserPages();
  }, []);

  return (
    <div className="container">
      <div className="btnNav">
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
      <h2>My Pages</h2>
      <PageList pages={pages} />
    </div>
  );
}
