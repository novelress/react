import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import styled from "@emotion/styled";
import GradeSharpIcon from '@mui/icons-material/GradeSharp';
import { getTvCastData, getTvData, getTvVideoData } from '../../api/api';

// переименовать и переместить
 
const StyledCompanyLogo = styled.img`
  width: 100%;
  height: "100%"
`



const TvMainPage = () => {
  const { tvId } = useParams();
  const [tvData, setTvData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [castData, setCastData] = useState([]);
  const [tvVideoData, setTvVideoData] = useState([]);
  const [tvVideoSiteData, setTvVideoSiteData] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [seasonsCount, setSeasonsCount] = useState(0);
  const location = useLocation();



  useEffect(() => {
    if (tvId) {
  
      setIsLoading(true);

      getTvData(tvId)
      .then(response => {
        setTvData(response);
        setSeasonsCount(response.number_of_seasons);
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
    
      getTvCastData(tvId)
        .then(response => response.json())
        .then(response => setCastData(response.cast))
        .catch(err => console.error(err));
      
      getTvVideoData(tvId)
        .then(response => {
          if (Array.isArray(response.results) && response.results.length > 0) {
            const trailerVideo = response.results.find(video => video.name === "Official Trailer");
            if (trailerVideo) {
              setTvVideoData(trailerVideo.key);
              setTvVideoSiteData(trailerVideo.site);
            }
          }
        })
        .catch(err => console.error(err));
    }
  }, [tvId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tvId') !== tvId) {
      hideVideoPlayer();
    }
  }, [location.search, tvId]); // сделано для того чтоб в случае если изменяеться query параметр у меня все пропадало потому что у меня был баг что если я открываю фильм после чего
  // ищу новый фильм перехожу по нему то в случае если у фильма не было видоса то оставался трейлер старого фильма или сериала,поэтому надо было сделать так

  

  const handleTabChange = (event, newValue) => {
    setActiveSection(newValue);
  };

  const renderVideo = () => {
    if(tvVideoData.length > 0 && tvVideoSiteData === "YouTube") {
      return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${tvVideoData}?si=NgQtVfLQoPJP73Xq&rel=0&showinfo=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )
    }
    return null;
  }

  const hideVideoPlayer = () => {
    setTvVideoData([]);
  }

  if (isLoading) {
    return <Box sx={{ height: "calc(100vh - 70px)", textAlign: "center", fontSize: "30px", }}><Typography>Loading...</Typography></Box>
  }

  if (!tvData) {
    return null;
  }


  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${tvData.backdrop_path}')`,
          backgroundSize: "cover",
          width: "100%",
          height: "650px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center',
          '@media (max-width: 992px)': {
            height: "500px",
          },
          '@media (max-width: 480px)': {
            height: "380px",
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
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${tvData.backdrop_path}')`, 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: 'center', backgroundSize: "cover", 
          height: "100%", 
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
          {tvData.name} {tvData.first_air_date.slice(0, 4)}
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
          <Box sx={{ padding: '30px 50px','@media (max-width: 992px)': { padding: '20px 30px'}, }}>
            <Typography sx={{ textAlign: "left", marginBottom: "10px", fontWeight: "bold", color: "rgba(0, 0, 0, 0.7)" }}>
              {tvData.first_air_date.slice(0, 4)},{tvData.genres.map(genre => genre.name).join(", ")}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ marginBottom: "10px", fontSize: "13px", textAlign: "left", width: "5%", display: "flex", justifyContent: "center", padding: "2px 5px 0", border: "1px solid #ccc", borderRadius: "3px", color: "gray", marginRight: "5px", '@media (max-width: 992px)': {width: "25%"}, }}>
                Full HD
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography sx={{ textAlign: "left", maxWidth: "50px", }}>
              Rating: 
            </Typography>
            <Typography sx={{ textAlign: "left", marginLeft: "5px", width: '50%', color: tvData.vote_average > '6.999' ? "green" : tvData.vote_average > '3.999' ? "orange" : "red", }}>{tvData.vote_average ? tvData.vote_average.toString().slice(0, 3) : 'N/A'}
            </Typography>
            </Box>
            <Typography sx={{ textAlign: "left", marginBottom: "10px" }}>
              Original Language: {tvData.original_language}
            </Typography>
            <Typography sx={{ textAlign: "left",marginBottom: "10px", }}>
              Producer: {tvData.production_companies && tvData.production_companies.map(company => company.name).join(", ")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center"}}>
            <Typography sx={{ textAlign: "left", maxWidth: "50px" }}>
              Status:
            </Typography>
            <Typography sx={{ textAlign: "left", marginLeft: "5px", width: 'auto', color: tvData.status === "Released" ? "green" : "red", }}>{tvData.status}</Typography>
            </Box>
            <Typography sx={{ marginBottom: "10px" }}>Seasons: {seasonsCount}</Typography>
            <Typography sx={{ textAlign: "left", marginBottom: "5px" }}>Overview:</Typography>
            <Typography sx={{ textAlign: "left", maxWidth: "900px" }}>{tvData.overview}</Typography>
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
                {tvData.production_companies.map(company => (
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

export default TvMainPage;
