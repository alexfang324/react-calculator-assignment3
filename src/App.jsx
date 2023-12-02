import { useState } from 'react';
import '../public/styles/App.css';
import Header from './Header';
import Screen from './Screen';
import Keypad from './Keypad';
function App() {
  const headerText = 'React Calculator';
  const DISPLAY_DIGIT = 12;
  const ERROR_DISPLAY_TEXT = 'Error';

  //Note on design choices:
  //In order to display one operand at a time instead of a graphic calculator
  //style of everything on the display, it's necessary for to define a
  //secondVal, onFirstVal, and appendVal use state to handle switching between
  //the first and second operands.

  //basic state variables to keep track of a calculation
  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [operator, setOperator] = useState('');
  //state for the currently displayed key
  const [displayVal, setDisplayVal] = useState('');
  //flag for deciding if we are currently entering first or second value in a calculation
  const [onFirstVal, setOnFirstVal] = useState(true);
  //flag for deciding if we should append to currently display value string or start a new one
  const [appendVal, setAppendVal] = useState(true);
  //state for storing the current displayed value when memory storage key is pressed
  const [memVal, setMemVal] = useState('');

  const onBtnClick = ({ type, text, value }) => {
    //If error is display, ignore all except AC key press
    if (displayVal == ERROR_DISPLAY_TEXT && text != 'AC') {
      return;
    }
    switch (type) {
      case 'clear':
        text === 'AC' ? allClear() : clearCurrentVal();
        break;
      case 'enter':
        computeResult();
        break;
      case 'memory':
        memoryActionSwitch(text, value);
        break;
      case 'number': {
        numberActionSwitch(text, value);
        break;
      }
      //the +, -, *, / route
      case 'operator':
        //if already enter second number, compute result first
        if (operator && firstVal && secondVal) {
          computeResult();
        }
        //update operator and set to watch for second input value
        setOperator(value);
        setOnFirstVal(false);
        setAppendVal(false);
        break;
      case 'percent': {
        const operand = onFirstVal ? firstVal : secondVal;
        const newVal = (parseFloat(operand) / 100).toString();
        setOperator(value);
        updateDisplay(newVal);
        updateCurVal(newVal);
        break;
      }
      case 'sign': {
        //convert value to float, flip its sign then convert back to string
        const newVal = (parseFloat(displayVal) * -1).toString();
        updateDisplay(newVal);
        //decide which state variable to update based on what's displayed. if we are on first
        //value, then the second value is always empty
        secondVal == '' ? setFirstVal(newVal) : setSecondVal(newVal);
        break;
      }
      case 'sqrt': {
        const newVal = Math.sqrt(parseFloat(displayVal)).toString();
        updateDisplay(newVal);
        secondVal == '' ? setFirstVal(newVal) : setSecondVal(newVal);
        break;
      }
    }
  };

  const memoryActionSwitch = (text, value) => {
    switch (text) {
      case 'MS':
        setMemVal(displayVal);
        break;
      case 'MC':
        setMemVal('');
        break;
      case 'MR':
        updateDisplay(memVal);
        break;
      case 'M-': {
        const result = (parseFloat(displayVal) - parseFloat(memVal)).toString();
        updateDisplay(result);
        break;
      }
      case 'M+': {
        const result = (parseFloat(displayVal) + parseFloat(memVal)).toString();
        updateDisplay(result);
        break;
      }
    }
  };

  const numberActionSwitch = (text, value) => {
    switch (true) {
      //decimal is a special character with edge cases that needs to be handled
      case text === '.' && operator === 'Percent':
        updateDisplay('0.');
        updateCurVal('0');
        break;
      //if there is already a decimal on screen, simply ignore the decimal key press
      case text === '.' &&
        ((onFirstVal && firstVal.includes('.')) ||
          (!onFirstVal && secondVal.includes('.'))):
        console.log('here');
        break;
      default: {
        //if the display screen is full, ignore further number key press
        //until we hit an operator or the equal key.
        if (displayVal.length >= DISPLAY_DIGIT && operator == '') {
          return;
        }
        //else, while appenVal flag is on, added behind currently displayed string, else start a new string
        const newVal = appendVal
          ? (displayVal + value).toString()
          : value.toString();
        updateDisplay(newVal);
        setAppendVal(true);
        updateCurVal(newVal);
        break;
      }
    }
  };

  const updateCurVal = (newVal) => {
    onFirstVal ? setFirstVal(newVal) : setSecondVal(newVal);
  };
  const clearCurrentVal = () => {
    updateDisplay('');
    onFirstVal ? setFirstVal('') : setSecondVal('');
  };

  const allClear = () => {
    setFirstVal('');
    setSecondVal('');
    setOperator('');
    setOnFirstVal(true);
    setAppendVal(true);
    updateDisplay('');
  };
  const computeResult = () => {
    //if operator exist, calculate result, else show previous result that was
    //stored in firstVal
    switch (true) {
      case operator === '/' && secondVal === '0':
        allClear();
        updateDisplay(ERROR_DISPLAY_TEXT);
        break;
      //only if all three states are filled may we compute the result
      //here we must explicitly check each one against null or javascript will
      //output value of secondVal
      case operator !== '': {
        const val1 = firstVal == '' ? '0' : firstVal;
        const val2 = secondVal == '' ? '0' : secondVal;
        const expression = val1 + operator + val2;
        let result = new Function('return ' + expression)();
        result = removeTrailingZerosFromDecimals(result.toString());
        updateDisplay(result);
        //set state variables for next calculation
        setFirstVal(result);
        setSecondVal('');
        setOperator('');
        setOnFirstVal(true);
        break;
      }
    }
  };

  const updateDisplay = (valString) => {
    //default case when value is empty
    if (valString == '' || valString == ERROR_DISPLAY_TEXT) {
      setDisplayVal(valString);
      return;
    }

    //truncate digits outside of the max allowed digits
    valString =
      valString.length >= DISPLAY_DIGIT
        ? valString.slice(0, DISPLAY_DIGIT)
        : valString;
    setDisplayVal(valString);
  };

  const removeTrailingZerosFromDecimals = (val) => {
    if (!val.includes('.')) {
      return val;
    }
    let newVal = val;
    let counter = newVal.length;
    //loop from end of the number
    for (let i = newVal.length - 1; i >= 0; i--) {
      //if it's a zero, decrement counter
      if (newVal[i] == '0') {
        counter--;
        //if it's a period, decrement counter and get out of the loop
      } else if (newVal[i] == '.') {
        counter--;
        break;
      } else {
        break;
      }
    }
    return newVal.slice(0, counter);
  };

  //jsx for the calculator
  return (
    <div className="app">
      <Header text={headerText} />
      <Screen displayVal={displayVal} />
      <Keypad onBtnClick={onBtnClick} />
    </div>
  );
}

export default App;
