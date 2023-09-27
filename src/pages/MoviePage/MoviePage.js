import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Tabs, Tab } from '@mui/material';



const MoviePage = () => {
  const { movieId } = useParams();
  const [ movieData, setMovieData] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveSection(newValue);
  };


  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTJkZGMzMDQxNzhhNzRmYzJmM2VhZTBkNjFjZjRhNiIsInN1YiI6IjY0ZjYwMWE1ZTBjYTdmMDEyZWI0YTQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nZyLiOf8OSawJuRNcNysdqymZRozN43fWndBy3zdfhs'
      }
    };

    if(typeof movieId === 'string' ) {
      setIsLoading(true);
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then(response => response.json())
      .then(response => setMovieData(response))
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false);
      }) 
    }
  }, [movieId]);

  if(isLoading) {
    return <Typography>Loading...</Typography>
  }

  if(!movieData) {
    return null;
  }
  console.log(movieData);

  return (
    <Box>
      <Box sx={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`, backgroundSize: "cover", width: "100%", height: "650px", backgroundRepeat: "no-repeat", backgroundPosition: 'center', }}>
      </Box>
        <Box sx={{ display: "flex", alignItems: "center", height: "100px", paddingLeft: "20px", backgroundColor: "#111111" }}>
          <Typography sx={{ textAlign: "left", color: "#FFFFFF", fontSize: "30px" }}>{movieData.title}</Typography>
        </Box>
      <Box sx={{ padding: '30px 50px' }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "20px" }}>
              <Tabs value={activeSection} onChange={handleTabChange}>
                <Tab label="DESCRIPTION" />
                <Tab label="PERSONS AND TEAMS" />
              </Tabs>
            </Box>
          </Box>
          {activeSection === 0 && (
            <Box>
            <Typography sx={{ textAlign: "left", marginBottom: "10px" }}>{movieData.title} {movieData.release_date && movieData.release_date.slice(0, 4)}</Typography>
            <Box sx={{ display: "flex", alignItems: "center"}}>
              <Typography sx={{ textAlign: "left", color: "gray", border: "1px solid gray", width: "5%", display: "flex", justifyContent: "center", borderRadius: "5%", fontSize: "13px", marginBottom: "10px", display: "flex", alignItems: "center" }}>FULL HD</Typography>
              <Typography sx={{  textAlign: "left", color: "gray", border: "1px solid gray", width: "5%", display: "flex", justifyContent: "center", borderRadius: "5%", fontSize: "13px", marginBottom: "10px", display: "flex", alignItems: "center" }}>{Math.floor(movieData.runtime / 60)} Hours</Typography>
            </Box>
            <Typography sx={{ textAlign: "left", marginBottom: "20px" }}>Genres: {movieData.genres && movieData.genres.map(genre => genre.name).join(", ")}</Typography>
            <Typography sx={{ textAlign: "left", maxWidth: "600px" }}>{movieData.overview}</Typography>
          </Box>
          )}
          {activeSection === 1 && (
            <Box>
              <Typography sx={{ textAlign: "left" }}>Актеры soon</Typography>
            </Box>
          )}
      </Box>
    </Box>
  );
}

export default MoviePage;
