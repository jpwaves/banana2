import Axios from "axios";
import React, { useEffect, useState } from "react";
import PageList from "../pageList/PageList";

export default function MyPages({ userID }) {
  const [pages, setPages] = useState([]);

  const getUserPages = () => {
    Axios.post("http://localhost:3001/getUserPages", {
      userID: 2,
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
      <h2>My Pages</h2>
      <PageList pages={pages} />
    </div>
  );
}
