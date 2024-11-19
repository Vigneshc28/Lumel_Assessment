import React from "react";

const Table = ({
  data,
  handlePercentage,
  handleValue,
  setInputValue,
  renderRows,
  grandTotal,
  grandVariance
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Actions</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(data.rows)}
        <tr>
          <td>Grand Total</td>
          <td>{grandTotal.toFixed(2)}</td>
          <td></td>
          <td>{grandVariance.toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
