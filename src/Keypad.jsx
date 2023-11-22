import { calculatorButtons } from '../data/button-data';
import Button from './Button';

function Keypad({ onBtnClick }) {
  //get the first button data from file
  const btn = calculatorButtons[0];
  //building a keypad with the first button but you should use a forloop
  //to loop through the file and build all the buttons
  const keypadGrid = (
    <Button key={btn.text} onBtnClick={onBtnClick} btnContent={btn} />
  );

  return <>{keypadGrid}</>;
}

export default Keypad;
