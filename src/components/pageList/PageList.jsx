import React from "react";
import { Link } from "react-router-dom";

export default function PageList(props) {
  const { pages } = props;

  const renderPages = () => {
    return (
      <ul>
        {pages.map((row) => {
          return (
            <li key={row.pageID}>
              <Link
                to="/myPages/memePage"
                state={{
                  pageID: row.pageID,
                  title: row.title,
                  desc: row.description,
                }}
              >
                <button>{row.title}</button>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderNoPages = () => {
    return <p>You don't have any pages</p>;
  };

  return pages.length === 0 ? renderNoPages() : renderPages();
}
