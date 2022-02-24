import React from "react";

const Pagination = ({ pageData, cb, classname }) => {
  return (
    <div className={`d-flex justify-content-end align-items-center pagination ${classname}`}>
      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm">
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
                  <span
                    className="page-link"
                    dangerouslySetInnerHTML={{ __html: page.label }}
                  />
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
