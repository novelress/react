import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Alert, Snackbar } from '@mui/material';
import MovieCard from "../../widgets/MovieCard/MovieCard";
import Slider from "react-slick";
import { getBestRatingMovieData, getGenres, getPopularMovieData, getUpcommingMovieData } from "../../api/api";
import { StyledSliderWrapper } from "../HomePage/Home.styled"


const Movies = () => {

  const [movieslist, setMoviesList] = useState(null);
  const [topRatedMovieList, setTopRatedMovieList] = useState(null);
  const [upcomingMovieData, setUpcomingMovieData] = useState(null);
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

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

      getPopularMovieData()
      .then((response) => {
        setMoviesList(response.results);
      })
      .catch((err) => console.error(err));
      getBestRatingMovieData()
     .then(response => {
        setTopRatedMovieList(response.results);
     })
     .catch(err => {
      setError(err);
    })

     getUpcommingMovieData()
    .then(response => {
        setUpcomingMovieData(response.results);
    })
    .catch(err => {
      setError(err);
    })

  }, []);

  if (!movieslist) {
    return <Box sx={{ height: "calc(100vh - 70px)", textAlign: "center", fontSize: "30px", }}><Typography>Loading...</Typography></Box>
  }


  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  
  const renderPopularMoviesList = () => {
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

  const renderTopRatedMovieList = () => {
    return (
      <StyledSliderWrapper>
        <Slider className="movies-slider" {...settings} ref={sliderRef}>
          {topRatedMovieList.map((movie, index) => (
            <MovieCard movie={movie} key={movie.id} genres={genres} voteAverage={movie.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    )
  }

  const renderUpcommingMovieList = () => {
    return (
      <StyledSliderWrapper>
        <Slider className="movies-slider" {...settings} ref={sliderRef}>
          {upcomingMovieData.map((movie, index) => (
            <MovieCard movie={movie} key={movie.id} genres={genres} voteAverage={movie.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    )
  }
  return ( 
    <Box sx={{ 
      maxWidth: "1050px", 
      margin: "0 auto",
      '@media (max-width: 992px)': {
        paddingLeft: "10px",
      },
    }}>
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
      <Alert onClose={() => setError(null)} severity="error">
        {error && error.message}
      </Alert>
    </Snackbar>

      <Typography sx={{
        textAlign: "center",
        fontSize: "25px",
        marginTop: "25px", 
        marginBottom: "25px",
        '@media (max-width: 992px)': {
          fontSize: "17px",
        },
        '@media (max-width: 480px)': {
          fontSize: "13px",
        },
      }}>
        Welcome To Movie Page!
      </Typography>
  
      {movieslist && (
        <Box>
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
              Popular
            </Typography>
          </Box>
          {renderPopularMoviesList()}
        </Box>
      )}
  
      {topRatedMovieList && (
        <Box>
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
              Best Rating
            </Typography>
          </Box>
            {renderTopRatedMovieList()}
        </Box>
      )}
  
      {upcomingMovieData && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", paddingRight: '5px' }}>
            <Typography sx={{ 
              textAlign: "left",
              marginRight: "0px",
              flex: "0 0 50%",
              fontSize: "20px",
              '@media (max-width: 992px)': {
                fontSize: "17px",
              },
              '@media (max-width: 992px)': {
                fontSize: "13px",
              },
            }}>
              Upсoming
            </Typography>
          </Box>
          {renderUpcommingMovieList()}
        </Box>
      )}
    </Box>
  );
}

export default Movies;