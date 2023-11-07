import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab, Alert, Snackbar } from '@mui/material';
import { StyledCompanyLogo } from './MoviePage.styled';
import GradeSharpIcon from '@mui/icons-material/GradeSharp';
import { getMovieData, getCastMovieData, getMovieTrailerData } from '../../api/api';





const MoviePage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [castData, setCastData] = useState([]);
  const [movieVideoData, setMovieVideoData] = useState([]);
  const [movieVideoSiteData, setMovieVideoSiteData] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {

    if (typeof movieId === 'string') {
      setIsLoading(true);
      getMovieData(movieId)
        .then(response => setMovieData(response))
        .catch(err => {
          setError(err);
        })        
        .finally(() => {
          setIsLoading(false);
        });

        getCastMovieData(movieId)
        .then(response => setCastData(response.cast))
        .catch(err => console.error(err));
      
        getMovieTrailerData(movieId)
        .then(response => {
          if (Array.isArray(response.results) && response.results.length > 0) {
            const trailerVideo = response.results.find(video => video.name === "Official Trailer");
            if (trailerVideo) {
              setMovieVideoData(trailerVideo.key);
              setMovieVideoSiteData(trailerVideo.site);
            }
          }
        })
        .catch(err => console.error(err));

        

    }
  }, [movieId]);

  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('movieId') !== movieId) {
      hideVideoPlayer();
    }
  }, [location.search, movieId]);
  

  const hideVideoPlayer = () => {
    setMovieVideoData([]);
  }


  const handleTabChange = (event, newValue) => {
    setActiveSection(newValue);
  };


  const renderVideo = () => {
    if(movieVideoData.length > 0 && movieVideoSiteData === "YouTube") {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${movieVideoData}?si=NgQtVfLQoPJP73Xq&rel=0&showinfo=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )
    }
    return null;
  }

  const renderTabs = () => {
    return(
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
          <Box sx={{ padding: '30px 50px' }}>
            <Typography sx={{ textAlign: "left", marginBottom: "10px", fontWeight: "bold", color: "rgba(0, 0, 0, 0.7)" }}>
              {movieData.release_date.slice(0, 4)},{movieData.genres.map(genre => genre.name).join(", ")}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginBottom: "10px", fontSize: "13px", textAlign: "left", width: "5%", display: "flex", justifyContent: "center", padding: "2px 5px 0", border: "1px solid #ccc", borderRadius: "3px", color: "gray", marginRight: "5px", '@media (max-width: 992px)': { width: "25%", }, }}>
                Full HD
              </Typography>
              <Typography sx={{ marginBottom: "10px", fontSize: "13px", textAlign: "left", width: "5%", display: "flex", justifyContent: "center", padding: "2px 5px 0", border: "1px solid #ccc", borderRadius: "3px", color: "gray", '@media (max-width: 992px)': { width: "25%", },}}>
                {movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m` : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography sx={{ textAlign: "left", maxWidth: "50px", }}>
              Rating: 
            </Typography>
            <Typography sx={{ textAlign: "left", marginLeft: "5px", width: '50%', color: movieData.vote_average > '6.999' ? "green" : movieData.vote_average > '3.999' ? "orange" : "red", }}>{movieData.vote_average ? movieData.vote_average.toString().slice(0, 3) : 'N/A'}
            </Typography>
            </Box>
            <Typography sx={{ textAlign: "left", marginBottom: "10px" }}>
              Original Language: {movieData.original_language}
            </Typography>
            <Typography sx={{ textAlign: "left",marginBottom: "10px", }}>
              Producer: {movieData.production_companies && movieData.production_companies.map(company => company.name).join(", ")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography sx={{ textAlign: "left", maxWidth: "50px" }}>
              Status:
            </Typography>
            <Typography sx={{ textAlign: "left", marginLeft: "5px", width: 'auto', color: movieData.status === "Released" ? "green" : "red", }}>{movieData.status}</Typography>
            </Box>
            <Typography sx={{ textAlign: "left", marginBottom: "10px" }}>
              Budget: {formattedBudget}
            </Typography>
            <Typography sx={{ textAlign: "left", marginBottom: "5px" }}>Overview:</Typography>
            <Typography sx={{ textAlign: "left", maxWidth: "900px" }}>{movieData.overview}</Typography>
          </Box>

        )}
        {activeSection === 1 && (
          <Box>
              <Typography sx={{ marginBottom: "20px" }}>Actors</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                {castData.map(actor => (
                  <Box sx={{ display: "flex", alignItems: "center", width: "220px", height: "40px", marginBottom: "20px" }}>
                <Box sx={{ height: "100%", width: "22%", display: "flex", justifyContent: "center", alignItems: "center", background: "#CCCCCC", marginRight: "10px", backgroundImage: actor.profile_path ? `url("https://image.tmdb.org/t/p/w200${actor.profile_path}")` : 'none', backgroundSize: "cover", backgroundPosition: "center", }} >
                  {actor.profile_path ? null : <GradeSharpIcon />}
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
    );
  }

  if (isLoading) {
    return <Box sx={{ height: "calc(100vh - 70px)", textAlign: "center", fontSize: "30px", }}><Typography>Loading...</Typography></Box>
  }

  if (!movieData) {
    return null;
  }



  const formattedBudget = (movieData.budget / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <Box>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error && error.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`,
          backgroundSize: "cover",
          width: "100%",
          height: "650px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
          '@media (max-width: 992px)': {
            height: "500px",
          },
          '@media (max-width: 480px)': {
            height: "250px",
          },
        }}
      >
        {renderVideo()}
      </Box>
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        height: "150px", 
        backgroundColor: "black", 
        '@media (max-width: 992px)': {
          height: "120px",
        },
        '@media (max-width: 480px)': {
          height: "100px",
        },
      }} >
        <Box sx={{ 
          width: "20%", 
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${movieData.backdrop_path}')`, 
          backgroundRepeat: "no-repeat", backgroundPosition: 'center', 
          backgroundSize: "cover", height: "100%", 
          marginRight: "30px",
          '@media (max-width: 992px)': {
            width: "30%", 
          },
          '@media (max-width: 480px)': {
            width: "35%", 
          },
        }}>
        </Box>
        <Typography sx={{ textAlign: "left", color: "#FFFFFF", fontSize: "25px" }}>
          {movieData.title} {movieData.release_date.slice(0, 4)}
        </Typography>
      </Box>
      {renderTabs()}
    </Box>
  );
}

export default MoviePage;
