import React from "react";

const Row = ({ row, handlePercentage, handleValue, setInputValue, renderRows }) => {
  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <input
            type="number"
            placeholder="Enter value"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={() => handlePercentage(row.id)}>
            Allocation %
          </button>
          <button onClick={() => handleValue(row.id)}>
            Allocation Val
          </button>
        </td>
        <td>{row.variance?.toFixed(2) || 0}%</td>
      </tr>
      {row.children && renderRows(row.children)}
    </>
  );
};

export default Row;
