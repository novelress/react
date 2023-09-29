import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import styled from "@emotion/styled";
import GradeSharpIcon from '@mui/icons-material/GradeSharp';

const StyledCompanyLogo = styled.img`
  width: 100%;
  height: auto;
`

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [castData, setCastData] = useState([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTJkZGMzMDQxNzhhNzRmYzJmM2VhZTBkNjFjZjRhNiIsInN1YiI6IjY0ZjYwMWE1ZTBjYTdmMDEyZWI0YTQyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nZyLiOf8OSawJuRNcNysdqymZRozN43fWndBy3zdfhs'
      }
    };

    if (typeof movieId === 'string') {
      setIsLoading(true);

      fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(response => setMovieData(response))
        .catch(err => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(response => setCastData(response.cast))
        .catch(err => console.error(err));
    }
  }, [movieId]);

  const handleTabChange = (event, newValue) => {
    setActiveSection(newValue);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!movieData) {
    return null;
  }

  console.log(movieData);

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`,
          backgroundSize: "cover",
          width: "100%",
          height: "650px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
        }}
      >
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/vS3_72Gb-bI?si=NgQtVfLQoPJP73Xq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100px",
          paddingLeft: "20px",
          backgroundColor: "black",
        }}
      >
        <Typography sx={{ textAlign: "left", color: "#FFFFFF", fontSize: "30px" }}>
          {movieData.title}
        </Typography>
      </Box>
      <Box sx={{ padding: '30px 50px' }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "20px" }}>
          <Tabs sx={{ marginBottom: "10px", "& .Mui-selected": { color: "black" },}} value={activeSection} onChange={handleTabChange}>
            <Tab label="DESCRIPTION" />
            <Tab label="PERSONS AND TEAMS" />
          </Tabs>

          </Box>
        </Box>
        {activeSection === 0 && (
          <Box>
            <Typography sx={{ textAlign: "left", marginBottom: "10px" }}>
              {movieData.title} {movieData.release_date && movieData.release_date.slice(0, 4)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "5px", textAlign: "left", color: "gray", border: "1px solid gray", width: "5%", display: "flex", justifyContent: "center", borderRadius: "5%", fontSize: "13px", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                FULL HD
              </Typography>
              <Typography sx={{ textAlign: "left", color: "gray", border: "1px solid gray", width: "5%", display: "flex", justifyContent: "center", borderRadius: "5%", fontSize: "13px", marginBottom: "10px", display: "flex", alignItems: "center" }}>
                {Math.floor(movieData.runtime / 60)} Hours
              </Typography>
            </Box>
            <Typography sx={{ textAlign: "left", marginBottom: "20px" }}>
              Genres: {movieData.genres && movieData.genres.map(genre => genre.name).join(", ")}
            </Typography>
            <Typography sx={{ textAlign: "left", maxWidth: "600px" }}>{movieData.overview}</Typography>
          </Box>
        )}
        {activeSection === 1 && (
          <Box>
              <Typography sx={{ marginBottom: "20px" }}>Actors</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                {castData.map(actor => (
                  <Box sx={{ display: "flex", alignItems: "center", width: "220px", height: "40px", marginBottom: "20px" }}>
                    <Box sx={{ height: "100%", width: "22%", display: "flex", justifyContent: "center", alignItems: "center", background: "#CCCCCC", marginRight: "10px" }}>
                      <GradeSharpIcon />
                    </Box>
                    <Box sx={{ height: "100%" }}>
                      <Typography sx={{ width: "100%", fontSize: "13px" }}>{actor.name}</Typography>
                      <Typography sx={{ width: "100%", fontSize: "10px", color: "#66666C", textAlign: "left" }}>{actor.name}</Typography>
                    </Box>
                  </Box>
                ))}
                
              </Box>
              <Typography sx={{ marginBottom: "20px" }}>Product Companies</Typography>
              <Box sx={{ display: "flex" }}> 
                {movieData.production_companies.map(company => (
                <Box sx={{ display: "flex", alignItems: "center", width: "220px", height: "50px", marginBottom: "20px", }} >
                  <Box sx={{ height: "100%", width: "22%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", }}>
                    {company.logo_path ? (
                    <StyledCompanyLogo src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name}/>
                    ) : (
                      <GradeSharpIcon />
                    )}
                  </Box>
                  <Box sx={{ height: "100%" }}>
                    <Typography sx={{ width: "100%", fontSize: "13px" }}>{company.name}</Typography>
                    <Typography sx={{ width: "100%", fontSize: "10px", color: "#66666C", textAlign: "left" }}>{company.origin_country}</Typography>
                  </Box>
                </Box>
            ))}
           </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MoviePage;
