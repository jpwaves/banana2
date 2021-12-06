import React from "react";
import { useNavigate } from "react-router";

export default function PageList(props) {
  const { pages } = props;
  const navigate = useNavigate();

  const jumpToPage = (pageID) => {
    navigate("/myPages/memePage", { state: pageID });
  };

  const renderPages = () => {
    return (
      <ul>
        {pages.map((row) => {
          return (
            <li key={row.pageID}>
              <button
                onClick={() => {
                  jumpToPage(row.PageID);
                }}
              >
                {row.title}
              </button>
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
