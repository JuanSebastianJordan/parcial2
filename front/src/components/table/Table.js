import React from "react";
import { FormattedMessage } from "react-intl";

export const Table = (props) => {
  
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col"><FormattedMessage id="device"/></th>
          <th scope="col"><FormattedMessage id="value"/></th>
        </tr>
      </thead>
      <tbody>
        {props.selectedRoom.devices.map((elem, i) => (
          <tr key={i}>
            <th key={i + 1} scope="row">
              {i}
            </th>
            <td key={i + 2}>{elem.id}</td>
            <td key={i + 3}>{elem.name}</td>
            <td>{elem.desired.value.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
