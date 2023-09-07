import React, { useState, useEffect } from "react";
import { AUTH_TOKEN } from "../../helpers/helpers";
import "../Home/Home.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MovieCard from "../../widgets/MovieCard/MovieCard";

const Home = () => {
  const [movieslist, setMoviesList] = useState(null);
  const [genres, setGenres] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState([]);

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
        setVisibleMovies(response.results.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movieslist) {
    return <p>Loading...</p>;
  }
  console.log(movieslist);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (showAll) {
      setVisibleMovies(movieslist.slice(0, 8));
    } else {
      setVisibleMovies(movieslist);
    }
    
  };
  return (
    <div>
      <p>Home Page</p>
      <h1>Список популярных фильмов</h1>
      <div className="movie-list">
        {visibleMovies.map((movie, index) => (
          <MovieCard movie={movie} key={index} genres={genres} />
        ))}
      </div>
      <button className="showButton" onClick={toggleShowAll}>
        {showAll ? "Hide Movies" : "Show More Movies"}
      </button>
    </div>
  );
};

export default Home;






