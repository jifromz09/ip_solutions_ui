import React from "react";

const Loader = ({ caption, show = false }) => {
  return (
    <>
      <div className="d-flex align-items-center row">
        <div
          className="spinner-border ml-auto"
          role="status"
          aria-hidden="true"
        />
        {show && <span className="loader" style={{color: "#00b8d4"}}>{`${caption}`}</span>}
      </div>
    </>
  );
};

export default Loader;
