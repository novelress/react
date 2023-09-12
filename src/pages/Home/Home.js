import React, { useState, useEffect, useRef } from "react";
import { AUTH_TOKEN } from "../../helpers/helpers";
import { Typography, Box } from "@mui/material";
import MovieCard from "../../widgets/MovieCard/MovieCard";
import Slider from "react-slick";
import styled from "@emotion/styled";

const StyledSliderWrapper = styled.div`
  width: 100%;
  position: relative;

  .slick-arrow:before {
    color: black;
  }  

  .slick-arrow {
    position: absolute;
    top: -10px;
    right: 0;
    left: auto;
    z-index: 10;
  }
  .slick-prev {
    right: 20px;
  }
`

const Home = () => {
  const [movieslist, setMoviesList] = useState(null);
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
  }, []);

  if (!movieslist) {
    return <p>Loading...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };


  return (
    <Box sx={{ maxWidth: "780px", margin: "0 auto", }}>
      <Typography>Home Page</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", paddingRight: '5px' }}>
        <Typography sx={{ textAlign: "left", marginRight: "0px", flex: "0 0 50%" }}>Best Rating</Typography>
      </Box>
      <StyledSliderWrapper>
        <Slider className="movies-slider" {...settings} ref={sliderRef}>
          {movieslist.map((movie, index) => (
            <MovieCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    </Box>
  );
};

export default Home;