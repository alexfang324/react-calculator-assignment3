import { useState } from 'react';
import '../public/styles/App.css';
import Header from './Header';
import Screen from './Screen';
import Keypad from './Keypad';
function App() {
  const headerText = 'React Calculator';

  //state for the currently displayed key
  const [displayVal, setDisplayVal] = useState('');

  //The callback function that will be passed to every button component.
  const onBtnClick = ({ type, text, value }) => {
    switch (type) {
      default:
        setDisplayVal('button works');
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
