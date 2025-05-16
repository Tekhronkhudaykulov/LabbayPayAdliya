import { useState } from "react";
import "./CustomKeyboard.css";
import { useFormContext } from "../../context/inputTypeContext";

const numericKeys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["00", "0", "backspace"],
];

const NumericKeyboardCustom = () => {
  const [activeKey, setActiveKey] = useState(null);

  // @ts-ignore
  const { activeInputKey, setValue, form } = useFormContext();

  const handleInput = (key) => {
    const currentValue = form[activeInputKey] || "";
    let updated = currentValue;

    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);

    if (key === "backspace") {
      updated = currentValue.slice(0, -1);
    } else {
      updated = currentValue + key;
    }

    
    setValue(activeInputKey, updated);
  };

  const renderKey = (key, i) => {
    const isActive = key === activeKey;
    return (
      <button
        key={i}
        className={`key numeric ${key === "backspace" ? "backspace" : ""} ${
          isActive ? "active" : ""
        }`}
        onClick={() => handleInput(key)}
      >
        {key === "backspace" ? "⌫" : key}
      </button>
    );
  };

  return (
    <div className={`keyboard-container-numeric select-none numeric-keyboard `}>
      {numericKeys.map((row, i) => (
        <div className="keyboard-row-numeric" key={i}>
          {row.map(renderKey)}
        </div>
      ))}
    </div>
  );
};

export default NumericKeyboardCustom;
