import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Box } from "@mui/material";
import Header from "./widgets/Header/Header";


const App = () => {
  return (
    <Box className="App" sx={{ height: "100vh" }}>
      <Box sx={{ maxWidth: "85%", margin: "0 auto", backgroundColor: "white", height: "100vh" }}>
        <Header />
        <Home />
      </Box>
    </Box>
  );
}

export default App;






