import React, { useState, useEffect, useRef } from "react";
import { AUTH_TOKEN } from "../../helpers/helpers";
import "../Home/Home.css";
import { Typography } from "@mui/material";
import MovieCard from "../../widgets/MovieCard/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [movieslist, setMoviesList] = useState(null);
  const [genres, setGenres] = useState({});
  const [visibleMovies, setVisibleMovies] = useState([]);
  const sliderRef = useRef(null);
  const totalMovies = 15;
  const moviesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

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
        setVisibleMovies(response.results.slice(0, moviesPerPage));
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movieslist) {
    return <p>Loading...</p>;
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: moviesPerPage,
    slidesToScroll: moviesPerPage,
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentPage(currentPage + 1);
      const startIndex = (currentPage + 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      setVisibleMovies(movieslist.slice(startIndex, endIndex));
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentPage(currentPage - 1);
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      setVisibleMovies(movieslist.slice(startIndex, endIndex));
    }
  };

  const containerStyle = {
    maxWidth: "780px",
    margin: "0 auto",
  };

  const textStyle = {
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <p>Home Page</p>
      <div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingRight: '5px' }}>
  <div style={{ ...textStyle, marginRight: "0px", flex: "0 0 50%" }}>Best Rating</div>
  <div style={{ display: "flex", alignItems: "center" }}>
    <button
      onClick={prevSlide}
      disabled={currentPage === 0}
      style={{
        width: "25px",
        height: "20px",
        backgroundColor: "white",
        textAlign: "center",
        alignItems: "center",
        border: "1px solid gray",
        cursor: "pointer",
        padding: "0",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ verticalAlign: "middle" }}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <button
      onClick={nextSlide}
      disabled={currentPage === totalMovies / moviesPerPage - 1}
      style={{
        marginLeft: '5px',
        width: "25px",
        height: "20px",
        backgroundColor: "white",
        textAlign: "center",
        alignItems: "center",
        border: "1px solid gray",
        cursor: "pointer",
        padding: "0",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ verticalAlign: "middle" }}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </div>
</div>

        <div className="carousel-container">
          <Slider {...settings} ref={sliderRef}>
            {visibleMovies.map((movie, index) => (
              <MovieCard movie={movie} key={index} genres={genres} voteAverage={movie.vote_average} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );  
};

export default Home;