import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button.js';
import Typography from './components/Typography/Typography.js';

const App = () => {
  const [type, setType] = useState("filled");
  const [fontSize, setFontSize] = useState("s"); 

  const toggleButton = () => {
    if(type === "filled") {
      setType("outlined");
    } else {
      setType("filled");
    }
    
    // изменяем размер текста при клике на кнопку
    setFontSize((prevSize) => {
      if (prevSize === "s") return "m";
      if (prevSize === "m") return "l";
      if (prevSize === "l") return "s";
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={toggleButton} type={type}>кнопка</Button>
        <Typography size={fontSize} />
      </header>
    </div>
  );
}

export default App;






