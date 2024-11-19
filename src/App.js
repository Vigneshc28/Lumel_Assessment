import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      children: [
        { id: "phones", label: "Phones", value: 800 },
        { id: "laptops", label: "Laptops", value: 700 }
      ]
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      children: [
        { id: "tables", label: "Tables", value: 300 },
        { id: "chairs", label: "Chairs", value: 700 }
      ]
    }
  ]
};

const App = () => {
  const [data, setData] = useState(initialData);
  const [grandTotalVariance, setGrandTotalVariance] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const calculateOriginalTotal = useCallback((rows) => {
    return rows.reduce((total, row) => {
      if (row.children) {
        return total + calculateOriginalTotal(row.children);
      }
      return total + row.value;
    }, 0);
  }, []);

  const calculateCurrentTotal = useCallback((rows) => {
    return rows.reduce((total, row) => {
      if (row.children) {
        return total + row.value;
      }
      return total + row.value;
    }, 0);
  }, []);

  const handleAllocationPercentage = (id, percentage) => {
    const updatedRows = updateRows(data.rows, id, (row) => {
      const originalValue = row.value;
      row.value += (row.value * percentage) / 100;
      row.variance = ((row.value - originalValue) / originalValue) * 100;
      return row;
    });
    setData({ ...data, rows: updatedRows });
  };

  const handleAllocationValue = (id, newValue) => {
    const updatedRows = updateRows(data.rows, id, (row) => {
      const originalValue = row.value;
      row.value = newValue;
      row.variance = ((row.value - originalValue) / originalValue) * 100;
      return row;
    });
    setData({ ...data, rows: updatedRows });
  };

  const updateRows = (rows, id, updateFn) => {
    return rows.map((row) => {
      if (row.id === id) {
        return updateFn({ ...row });
      } else if (row.children) {
        const updatedChildren = updateRows(row.children, id, updateFn);
        const updatedRow = {
          ...row,
          children: updatedChildren,
          value: updatedChildren.reduce((sum, child) => sum + child.value, 0)
        };
        updatedRow.variance = ((updatedRow.value - row.value) / row.value) * 100;
        return updatedRow;
      }
      return row;
    });
  };

  useEffect(() => {
    const totalOriginalValue = calculateOriginalTotal(initialData.rows);
    const totalCurrentValue = calculateCurrentTotal(data.rows);
    const grandTotalVariance = ((totalCurrentValue - totalOriginalValue) / totalOriginalValue) * 100;
    setGrandTotalVariance(grandTotalVariance);
  }, [data, calculateOriginalTotal, calculateCurrentTotal]);

  const renderRows = (rows) => {
    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr>
          <td>{row.label}</td>
          <td>{row.value.toFixed(2)}</td>
          <td>
            <input
              type="number"
              placeholder="Enter value"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => handleAllocationPercentage(row.id, parseFloat(inputValue || 0))}>
              Allocation %
            </button>
            <button onClick={() => handleAllocationValue(row.id, parseFloat(inputValue || 0))}>
              Allocation Val
            </button>
          </td>
          <td>{row.variance?.toFixed(2) || 0}%</td>
        </tr>
        {row.children && renderRows(row.children)}
      </React.Fragment>
    ));
  };

  return (
    <div className="App">
      <h1>Hierarchical Table with Variance</h1>
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
            <td>{calculateCurrentTotal(data.rows).toFixed(2)}</td>
            <td></td>
            <td>{grandTotalVariance.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
