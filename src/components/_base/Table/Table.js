import React from "react";
import Header from "./Header";
 
const Table = ({ children, header, ...rest }) => {
  return (
    <table {...rest} className="table table-striped table-sm table-bordered">
      <Header header={header} />
       {children}
    </table>
  );
};

export default Table;
