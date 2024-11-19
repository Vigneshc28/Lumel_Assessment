import React, { useState } from "react";

const InputField = ({ onUpdate }) => {
    const [inputValue, setInputValue] = useState("");

    const handlePercent = () => {
        const percent = parseFloat(inputValue);
        if (!isNaN(percent)) {
            onUpdate((prevValue) => prevValue + (prevValue * percent) / 100);
        }
    };

    const handleValue = () => {
        const value = parseFloat(inputValue);
        if (!isNaN(value)) {
            onUpdate(value);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handlePercent}>Allocation %</button>
            <button onClick={handleValue}>Allocation Val</button>
        </div>
    );
};

export default InputField;
