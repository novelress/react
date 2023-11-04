import { AUTH_TOKEN } from "../helpers/helpers";

export const getGenres = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      };

      return await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
        options
      )
        .then((response) => response.json())
}

export const getMovieList = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      };

    return await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
}

export const getTvSeriesList = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      };

    return await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
}

export const getMovieData = async(movieId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      )
        .then(response => response.json())
}

export const getCastMovieData = async(movieId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      )
        .then(response => response.json())
}

export const getMovieTrailerData = async(movieId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      )
        .then(response => response.json())
}

export const getPopularMovieData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then(response => response.json())
}

export const getBestRatingMovieData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options
      )
        .then(response => response.json())
}

export const getUpcommingMovieData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        options
      )
        .then(response => response.json())
}

export const getPopularTvData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        options
      )
        .then(response => response.json())
}

export const getBestRatingTvData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
        options
      )
        .then(response => response.json())
}

export const getUpcommingTvData = async() => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
        options
      )
        .then(response => response.json())
}

export const getTvData = async(tvId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`,
        options
      )
        .then(response => response.json())
}

export const getTvCastData = async(tvId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`,
        options
      )
        .then(response => response.json())
}

export const getTvVideoData = async(tvId) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    };

    return await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`,
        options
      )
        .then(response => response.json())
}

