import React, { useState } from "react";
import InputField from "./InputField";

const TableRow = ({ row, updateRowValue }) => {
    const [variance, setVariance] = useState(0);

    const handleUpdate = (newValue) => {
        const variancePercentage = ((newValue - row.value) / row.value) * 100;
        setVariance(variancePercentage.toFixed(2));
        updateRowValue(row.id, newValue);
    };

    return (
        <>
            <tr>
                <td>{row.label}</td>
                <td>{row.value}</td>
                <td>
                    <InputField onUpdate={handleUpdate} />
                </td>
                <td>{variance}%</td>
            </tr>
            {row.children &&
                row.children.map((child) => (
                    <TableRow
                        key={child.id}
                        row={child}
                        updateRowValue={updateRowValue}
                    />
                ))}
        </>
    );
};

export default TableRow;
