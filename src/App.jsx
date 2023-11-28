import { memo, useState } from "react";
import "../public/styles/App.css";
import Header from "./Header";
import Screen from "./Screen";
import Keypad from "./Keypad";
function App() {
  const headerText = "React Calculator";

  //state for the currently displayed key
  const [displayVal, setDisplayVal] = useState("");
  const [memory, setMemory] = useState(0);

  //The callback function that will be passed to every button component.
  const onBtnClick = ({ type, text, value }) => {
    switch (type) {
      case "number":
        if (text === "." && displayVal.includes(".")) {
          break;
        }
        setDisplayVal((prevDisplayVal) => prevDisplayVal + text);
        break;
      case "operator":
        setDisplayVal((prevDisplayVal) => prevDisplayVal + text);
        break;
      case "equal":
        try {
          setDisplayVal(eval(displayVal).toString());
        } catch (error) {
          setDisplayVal("Error");
        }
        break;
      case "clear":
        setDisplayVal("");
        setMemory(0);
        break;
      case "memory":
        switch (text) {
          case "MS":
            setDisplayVal("button MS");
            break;
          case "MC":
            setDisplayVal("button MC");
            break;
          case "MR":
            setDisplayVal("button MR");
            break;
          case "M+":
            setDisplayVal("button M+");
            break;
          case "M-":
            setDisplayVal("button M-");
            break;
          default:
            break;
        }
        break;
      case "percentage":
        try {
          const result = eval(displayVal);
          setDisplayVal((result / 100).toString());
        } catch (error) {
          setDisplayVal("Error.");
        }
        break;
      case "sign":
        setDisplayVal((parseFloat(displayVal) * -1).toString());
        break;
      case "sqrt":
        setDisplayVal(Math.sqrt(parseFloat(displayVal)).toString());
        break;
      default:
        setDisplayVal("button works");
    }
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
