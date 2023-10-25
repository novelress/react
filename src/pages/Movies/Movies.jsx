import React, { useState, useEffect, useRef } from "react";
import { AUTH_TOKEN } from "../../helpers/helpers";
import { Typography, Box } from "@mui/material";
import MovieCard from "../../widgets/MovieCard/MovieCard";
import Slider from "react-slick";
import styled from "@emotion/styled";
import arrowRight from "../../Assets/arrowRight.svg";


const StyledSliderWrapper = styled.div`
  width: 100%;
  position: relative;



  .slick-arrow:before {
    border-radius: 0px;
    content: "";
    width: 30px;
  } 

  .slick-arrow {
    position: absolute;
    top: -10px;
    right: 5px;
    left: auto;
    z-index: 10;
    width: 20px;
    height: 20px;
    background-image: url(${arrowRight});
    background-size: cover;
    background-repeat: no-repeat;
  }

  .slick-prev {
    right: 30px;
    top: -20px;
    transform: scale(-1, 1);
  }
`;

const Movies = () => {

  const [movieslist, setMoviesList] = useState(null);
  const [topRatedMovieList, setTopRatedMovieList] = useState(null);
  const [upcomingMovieData, setUpcomingMovieData] = useState(null);
  const [genres, setGenres] = useState({});
  const sliderRef = useRef(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const genreMap = {};
        response.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      })
      .catch((err) => console.error(err));

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMoviesList(response.results);
      })
      .catch((err) => console.error(err));

      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
     .then(response => response.json())
     .then(response => {
        setTopRatedMovieList(response.results);
     })
     .catch(err => console.error(err));

     fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        setUpcomingMovieData(response.results);
    })
    .catch(err => console.error(err));

  }, []);

  if (!movieslist) {
    return <p>Loading...</p>;
  }


  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  


  return ( 
    <Box sx={{ 
      maxWidth: "1050px", 
      margin: "0 auto",
      '@media (max-width: 992px)': {
        paddingLeft: "10px",
      },
    }}>
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
          <StyledSliderWrapper>
            <Slider className="movies-slider" {...settings} ref={sliderRef}>
              {movieslist.map((movie, index) => (
                <MovieCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} />
              ))}
            </Slider>
          </StyledSliderWrapper>
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
          <StyledSliderWrapper>
            <Slider className="movies-slider" {...settings} ref={sliderRef}>
              {topRatedMovieList.map((movie, index) => (
                <MovieCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} />
              ))}
            </Slider>
          </StyledSliderWrapper>
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
          <StyledSliderWrapper>
            <Slider className="movies-slider" {...settings} ref={sliderRef}>
              {upcomingMovieData.map((movie, index) => (
                <MovieCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} />
              ))}
            </Slider>
          </StyledSliderWrapper>
        </Box>
      )}
    </Box>
  );
}

export default Movies;