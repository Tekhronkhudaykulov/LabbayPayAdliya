import { useState } from "react";
import "./CustomKeyboard.css";
import { useFormContext } from "../../context/inputTypeContext";

const defaultKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
];

const symbolKeys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["%", "/", "\\", ":", ";", "(", ")", "-", "$", "+"],
  ["{", "}", "“", "!", "[", "]", "*", "&", "^", "#"],
];

const CustomKeyboardLetter = () => {
  const [shift, setShift] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  // @ts-ignore
  const { activeInputKey, form, setValue } = useFormContext();

  const currentValue = form[activeInputKey] || "";

  const handleInput = (key) => {
    let updated = currentValue;

    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);

    if (key === "backspace") {
      updated = currentValue.slice(0, -1);
    } else if (key === "space") {
      updated = currentValue + " ";
    } else if (key === "shift") {
      setShift((prev) => !prev);
      return;
    } else if (key === "symbols") {
      setSymbol((prev) => !prev);
      return;
    } else {
      const char = shift && !symbol ? key.toUpperCase() : key;
      updated = currentValue + char;
    }

    setValue(activeInputKey, updated);
  };

  const keys = symbol ? symbolKeys : defaultKeys;

  const renderKey = (key, i) => {
    const isActive = key === activeKey;
    const displayKey = shift && !symbol ? key.toUpperCase() : key;
    return (
      <button
        key={i}
        className={`key ${key === "backspace" ? "backspace" : ""} ${
          key === "shift" ? "shift" : ""
        } ${key === "space" ? "space" : ""} ${
          key === "symbols" ? "symbols" : ""
        } ${isActive ? "active" : ""}`}
        onClick={() => handleInput(key)}
      >
        {key === "space"
          ? "space"
          : key === "shift"
          ? "⇧"
          : key === "backspace"
          ? "⌫"
          : key === "symbols"
          ? "123"
          : displayKey}
      </button>
    );
  };

  return (
    <div className={`keyboard-container`}>
      {keys.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map(renderKey)}
          {i === 2 && (
            <>
              {renderKey("shift", -1)}
              {renderKey("space", -2)}
              {renderKey("symbols", -3)}
              {renderKey("backspace", -4)}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomKeyboardLetter;
