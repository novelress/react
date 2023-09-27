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
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Cartoons from './pages/Cartoons/Cartoons';
import Movies from './pages/Movies/Movies';
import SeriesAndShows from './pages/SeriesAndShows/SeriesAndShows';
import MoviePage from './pages/MoviePage/MoviePage';


const App = () => {
  return (
    <BrowserRouter basename="/">
      <Box className="App" sx={{ height: "100vh" }}>
        <Box sx={{ maxWidth: "70%", margin: "0 auto", backgroundColor: "white", height: "100vh" }}>
          <Header />
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/cartoons" element={<Cartoons/>} />
            <Route path="/" element={<Home />}/>
            <Route path="/series-and-shows" element={<SeriesAndShows/>}/>
            <Route path="/moviePage/:movieId" element={<MoviePage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;






