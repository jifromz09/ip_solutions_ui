import React from "react";

const Loader = ({caption}) => {
  return (
    <>
      <div className="d-flex align-items-center row">
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        />
        {/* <span className="loader">{`${caption}`}</span> */}
      </div>
    </>
  );
};

export default Loader;
