import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home/Home';
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
import TV from './pages/TV/TV';
import Movies from './pages/Movies/Movies';
import MoviePage from './pages/MoviePage/MoviePage';
import TvPage from './widgets/TvPage/TvPage';
import CreateMovie from './pages/CreateMovie/CreateMovie';
import Footer from "./widgets/PageFooter/PageFooter";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
          '& .MuiInputBase-input': {
            color: 'black', 
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.5)',
          },
          '& .MuiInputLabel-root': {
            color: 'black',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          ".MuiTabs-indicator": {
            backgroundColor: "black",
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "black",
            
          },
        },
      },
    },
  },
});

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
            <Route path="/tvPage/:movieId" element={<TvPage />} />
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






