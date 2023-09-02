import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/Button.js';
import Typography from './components/Typography/Typography.js';

const App = () => {
  const [type, setType] = useState("filled");
  const [fontSize, setFontSize] = useState("16px"); // добавляем изначальный размер

  const toggleButton = () => {
    if(type === "filled") {
      setType("outlined");
    } else {
      setType("filled");
    }
    
    // изменяем размер текста при клике на кнопку
    setFontSize((prevSize) => {
      if (prevSize === "16px") return "20px"; // если текст 16рх делаем его 20
      if (prevSize === "20px") return "24px"; // если 20 то 24
      if (prevSize === "24px") return "16px"; // если 24 то 16
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
        {/* <Button type="outlined">чето другое</Button> */}
        
        <Typography fontSize={fontSize} onClick={toggleButton} />
      </header>
    </div>
  );
}

export default App;




