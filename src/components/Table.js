import React from "react";
import TableRow from "./TableRow";

const Table = ({ data, updateRowValue }) => {
    const renderRows = (rows) =>
        rows.map((row) => (
            <TableRow
                key={row.id}
                row={row}
                updateRowValue={updateRowValue}
            />
        ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Value</th>
                    <th>Input</th>
                    <th>Allocation %</th>
                    <th>Allocation Val</th>
                    <th>Variance %</th>
                </tr>
            </thead>
            <tbody>{renderRows(data)}</tbody>
        </table>
    );
};

export default Table;
