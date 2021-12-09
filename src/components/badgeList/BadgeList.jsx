import React from "react";
import "./BadgeList.scss";

export default function BadgeList(props) {
  let { badges } = props;

  const renderBadges = () => {
    return (
      <ul>
        {badges.map((row, index) => {
          return <li key={index}>{row.name}</li>;
        })}
      </ul>
    );
  };

  return badges.length === 0 ? null : renderBadges();
}
