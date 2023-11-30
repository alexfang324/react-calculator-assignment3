import React from "react";
import { calculatorButtons } from "../data/button-data";
import Button from "./Button";

function Keypad({ onBtnClick }) {
  // Use map to create an array of Button components for each button in the data
  const keypadButtons = calculatorButtons.map((btn) => (
    <Button key={btn.text} onBtnClick={onBtnClick} btnContent={btn} />
  ));

  return <div className="keypad">{keypadButtons}</div>;
}

export default Keypad;
