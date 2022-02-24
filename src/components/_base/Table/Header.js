import React from "react";

const Header = ({ header }) => {
  return (
    <thead>
      <tr>
        {header.map((tHead, i) => {
          return (
            <th
              className={`${tHead === "Action" ? "thead-action" : ""}`}
              scope="col"
              key={tHead}
            >
              <small>{tHead}</small>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
