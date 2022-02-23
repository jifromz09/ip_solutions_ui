import React from "react";

const Pagination = ({pageData, cb}) => {
  
    return  <ul className="pagination">
    {pageData.links &&
      pageData.links.map((page) => {
        return (
          <li
            key={page.label}
            className={`page-item ${!page.url ? "disabled" : ""} ${
              page.active ? "active" : ""
            }`}
            onClick={() => cb(page.url)}
          >
            <span className="page-link" dangerouslySetInnerHTML={{__html: page.label}} />
          </li>
        );
      })}
  </ul>
}

export default Pagination;