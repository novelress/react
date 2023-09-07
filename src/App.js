import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./widgets/Header/Header";


const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;






