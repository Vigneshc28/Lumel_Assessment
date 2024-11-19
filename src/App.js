import React, { useState, useEffect, useCallback } from "react";
import Table from "./components/Table";
import Row from "./components/Row"; // Add this import
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

  const handleAllocationPercentage = (id) => {
    const updatedRows = updateRows(data.rows, id, (row) => {
      const originalValue = row.value;
      row.value += (row.value * parseFloat(inputValue || 0)) / 100;
      row.variance = ((row.value - originalValue) / originalValue) * 100;
      return row;
    });
    setData({ ...data, rows: updatedRows });
  };

  const handleAllocationValue = (id) => {
    const updatedRows = updateRows(data.rows, id, (row) => {
      const originalValue = row.value;
      row.value = parseFloat(inputValue || 0);
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
      <Row
        key={row.id}
        row={row}
        handlePercentage={handleAllocationPercentage}
        handleValue={handleAllocationValue}
        setInputValue={setInputValue}
        renderRows={renderRows}
      />
    ));
  };

  return (
    <div className="App">
      <h1>Hierarchical Table with Variance</h1>
      <Table
        data={data}
        handlePercentage={handleAllocationPercentage}
        handleValue={handleAllocationValue}
        setInputValue={setInputValue}
        renderRows={renderRows}
        grandTotal={calculateCurrentTotal(data.rows)}
        grandVariance={grandTotalVariance}
      />
    </div>
  );
};

export default App;
