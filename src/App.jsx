import React from 'react';
import './App.css';
import Home from './pages/HomePage/HomePage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import Header from "./widgets/Header/Header";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import TV from './pages/TVPage/TVPage';
import Movies from './pages/MoviesPage/MoviesPage';
import MoviePage from './pages/MoviePage/MoviePage';
import TvMainPage from './pages/TvMainPage/TvMainPage';
import CreateMovie from './pages/CreateMoviePage/CreateMoviePage';
import Footer from "./widgets/PageFooter/PageFooter";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './helpers/theme';


// необходимо подключить prettier для cra

const App = () => {
  return (

  <BrowserRouter basename="/">
    <ThemeProvider theme={theme}>
      <Box className="App" sx={{ height: "100vh" }}>
        <Box
        sx={{
          maxWidth: "70%",
          margin: "0 auto", 
          backgroundColor: "white",
          height: "100vh", 
          position: "relative",
          '@media (max-width: 992px)': {
            maxWidth: "100%",
          },
        }}>
          <Header />
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TV/>} />
            <Route path="/" element={<Home />}/>
            <Route path="/moviePage/:movieId" element={<MoviePage />} />
            <Route path="/tvPage/:tvId" element={<TvMainPage />} />
            <Route path="/create-movie" element={<CreateMovie />} />
          </Routes>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  </BrowserRouter>
    
  );
}

export default App;






