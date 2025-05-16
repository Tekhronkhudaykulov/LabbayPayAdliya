import { FC, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { defaultKeyboard, displayKeyboard } from "./typesKeyboars";
import "react-simple-keyboard/build/css/index.css";

interface Props {
  handleChangeParams?: (e: any) => void;
  onKeyPressProps?: (button: string) => void;
  layout?: any;
  maxLength?: number | null;
  numeric?: boolean;
  className?: string;
  onChange?: (e: any) => void;
  inputName?: string;
  ref?: any;
}

const KeyboardComponent: FC<Props> = ({
  onKeyPressProps,
  layout = defaultKeyboard,
  maxLength = 50,
  numeric,
  className,
  onChange,
  inputName,
  ref,
}) => {
  const [layoutName, setLayoutName] = useState("default");
  const handleShift = () => {
    setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
  };
  const handleAlt = () => {
    setLayoutName((prev) => (prev === "alt" ? "default" : "alt"));
  };

  return (
    <div className={`${numeric && "numeric"} ${className}`}>
      <Keyboard
        keyboardRef={ref}
        onChange={onChange}
        onKeyPress={(button: any) => {
          if (button === "{shift}" || button === "{lock}") handleShift();
          else if (button === "{alt}") handleAlt();
          onKeyPressProps && onKeyPressProps(button);
        }}
        inputName={inputName}
        layoutName={layoutName}
        layout={layout}
        onRender={() => console.log(`Rendered`)}
        display={displayKeyboard}
        physicalKeyboardHighlight
        preventMouseDownDefault
        maxLength={maxLength}
      />
    </div>
  );
};

export default KeyboardComponent;
