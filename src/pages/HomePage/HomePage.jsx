import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Alert, Snackbar } from '@mui/material';
import MovieCard from "../../widgets/MovieCard/MovieCard";
import TvCard from "../../widgets/TvCard/TvCard";
import Slider from "react-slick";
import { StyledSliderWrapper } from "./Home.styled"
import MainSlider from '../../widgets/MainSlider/MainSlider';
import { getGenres, getMovieList, getTvSeriesList } from "../../api/api";
import MainSlider1 from "../../Assets/MainSlider/MainSlider1.webp";
import MainSlider2 from "../../Assets/MainSlider/MainSlider2.webp";
import MainSlider3 from "../../Assets/MainSlider/MainSlider3.webp";

const HomePage = () => {
  const [movieslist, setMoviesList] = useState([]);
  const [genres, setGenres] = useState(null);
  const [tvSeriesList, setTvSeriesList] = useState([]);
  const sliderRef = useRef(null);
  const images = [MainSlider1, MainSlider2, MainSlider3];
  const [error, setError] = useState(null);

  useEffect(() => {

    getGenres()
      .then((response) => {
        const genreMap = {};
        response.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      })
      .catch(err => {
        setError(err);
      })
      
      getMovieList()
      .then((response) => {
        setMoviesList(response.results);
      })
      .catch(err => {
        setError(err);
      })
      
      getTvSeriesList()
        .then((response) => {
          setTvSeriesList(response.results);
        })
        .catch(err => {
          setError(err);
        })
        
  }, []);

  if (!movieslist.length && !tvSeriesList.length) {
    return <Box sx={{ height: "calc(100vh - 70px)", textAlign: "center", fontSize: "30px", }}><Typography>Loading...</Typography></Box>
  }

  const renderPopularMoviesSlider = () => {
    return (
      <StyledSliderWrapper>
        <Slider className="movies-slider" {...settings} ref={sliderRef}>
          {movieslist.map((movie, index) => (
            <MovieCard movie={movie} key={movie.id} genres={genres} voteAverage={movie.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    )
  }

  const renderPopularTvSlider = () => {
    return (
      <StyledSliderWrapper>
              <Slider className="movies-slider" {...settings} ref={sliderRef}>
                {tvSeriesList.map((tv, index) => (
                  <TvCard tv={tv} key={tv.id} voteAverage={tv.vote_average} />
                ))}
              </Slider>
      </StyledSliderWrapper>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  
  console.log(movieslist);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 140px)', boxShadow: '10px 0 10px -10px black, -10px 0 10px -10px black', }}>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error && error.message}
        </Alert>
      </Snackbar>
      <MainSlider images={images} />
        <Box sx={{ 
          maxWidth: "1050px", 
          margin: "0 auto", 
          '@media (max-width: 992px)': {
            paddingLeft: "10px",
            paddingRight: "10px",
          },
          }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", paddingRight: '5px' }}>
            <Typography sx={{ 
              textAlign: "left", 
              marginRight: "0px", 
              flex: "0 0 50%", 
              fontSize: "20px",
              '@media (max-width: 992px)': {
                fontSize: "17px",
              },
              '@media (max-width: 480px)': {
                fontSize: "13px",
              },
            }}>
              Popular Movie
            </Typography>
          </Box>

          {renderPopularMoviesSlider()}

          <Box sx={{ display: "flex", justifyContent: "space-between", paddingRight: '5px' }}>
            <Typography sx={{ 
              textAlign: "left", 
              marginRight: "0px", 
              flex: "0 0 50%", 
              fontSize: "20px",
              '@media (max-width: 992px)': {
                fontSize: "17px",
              },
              '@media (max-width: 480px)': {
                fontSize: "13px",
              },
            }}>
              Popular TV</Typography>
          </Box>
          {renderPopularTvSlider()}
        </Box>
    </Box>
  );
};

export default HomePage;