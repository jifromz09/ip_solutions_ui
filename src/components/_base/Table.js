import React from "react";

function Table({ colors }) {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">IP Address</th>
            <th scope="col">Label</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((c, i) => {
            return (
              <tr key={i}>
                <th scope="row">{c.id}</th>
                <td>{c.color}</td>
                <td>{c.value}</td>
                <td>
                  <a href="">Edit</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
