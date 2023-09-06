import React, { useState, useEffect } from "react";
import { AUTH_TOKEN } from "../../helpers/helpers";

const Home = () => {
    const [movieslist, setMoviesList] = useState(null);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${AUTH_TOKEN}`
            }
          };
          
          // запрос для получения списка жанров
          fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', options)
            .then(response => response.json())
            .then(response => {
              const genreMap = {};
              response.genres.forEach(genre => {
                genreMap[genre.id] = genre.name;
              });
              setGenres(genreMap);
            })
            .catch(err => console.error(err));
          
          // запрос для получения списка популярных фильмов
          fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setMoviesList(response.results))
            .catch(err => console.error(err));
    }, []);

    if (!movieslist) {
        return <p>Loading...</p>;
    }

    console.log(movieslist);

    return (
      <div>
          <p>Home Page</p>
          <h1>Список популярных фильмов</h1>
          <div className="movie-list">
              {movieslist.map((movie, index) => (
                  <div className="movie-item" key={index}>
                      <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px' }} />
                      <div className="movie-details">
                          <p className="movie-name">{movie.title} {movie.release_date.slice(0, 4)}</p>
                          <p>Жанр: {movie.genre_ids.map(id => genres[id]).join(", ")}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Home;

