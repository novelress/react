import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, Alert, Snackbar } from '@mui/material';
import TvCard from "../../widgets/TvCard/TvCard";
import Slider from "react-slick";
import { getBestRatingTvData, getPopularTvData, getUpcommingTvData } from "../../api/api";
import { StyledSliderWrapper } from "../HomePage/Home.styled"


const TV = () => {

  const [cartoonlist, setCartoonList] = useState(null);
  const [topRatedCartoonList, setTopRatedCartoonList] = useState(null);
  const [upcomingCartoonData, setUpcomingCartoonData] = useState(null);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {

    getPopularTvData()
      .then((response) => {
        setCartoonList(response.results);
      })
      .catch(err => {
        setError(err);
      })

    getBestRatingTvData()
     .then(response => {
        setTopRatedCartoonList(response.results);
     })
     .catch(err => {
      setError(err);
    })

     getUpcommingTvData()
    .then(response => {
        setUpcomingCartoonData(response.results);
    })
    .catch(err => {
      setError(err);
    })

  }, []);

  if (!cartoonlist) {
    return <Box sx={{ height: "calc(100vh - 70px)", textAlign: "center", fontSize: "30px", }}><Typography>Loading...</Typography></Box>
  }


  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  
  const renderPopularTvList = () => {
    return (
      <StyledSliderWrapper>
        <Slider className="tvs-slider" {...settings} ref={sliderRef}>
          {cartoonlist.map((tv, index) => (
            <TvCard tv={tv} key={tv.id} voteAverage={tv.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    )
  }

  const renderTopRatedTvList = () => {
    return (
      <StyledSliderWrapper>
      <Slider className="tvs-slider" {...settings} ref={sliderRef}>
      {topRatedCartoonList.map((tv, index) => (
          <TvCard tv={tv} key={tv.id} voteAverage={tv.vote_average} />
        ))}
      </Slider>
    </StyledSliderWrapper>
    )
  }

  const renderUpcommingTvList = () => {
    return (
      <StyledSliderWrapper>
        <Slider className="tvs-slider" {...settings} ref={sliderRef}>
          {upcomingCartoonData.map((tv, index) => (
            <TvCard tv={tv} key={tv.id} voteAverage={tv.vote_average} />
          ))}
        </Slider>
      </StyledSliderWrapper>
    )
  }

  return ( 
    <Box sx={{ 
      maxWidth: "1050px", 
      margin: "0 auto",
      '@media (max-width: 992px)': {
        paddingLeft: "10px",
      },
    }}>
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
      <Alert onClose={() => setError(null)} severity="error">
        {error && error.message}
      </Alert>
    </Snackbar>
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
        Welcome To TV Page!
      </Typography>

      {cartoonlist && (
        <Box>
          <Box sx={{
            display: "flex",
            justifyContent: "space-between", 
            paddingRight: '5px',
          }}>
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
         {renderPopularTvList()}
        </Box>
      )}
  
      {topRatedCartoonList && (
        <Box>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            paddingRight: '5px',
          }}>
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
         {renderTopRatedTvList()}
        </Box>
      )}
  
      {upcomingCartoonData && (
        <Box>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            paddingRight: '5px',
          }}>
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
              Upсoming
            </Typography>
          </Box>
            {renderUpcommingTvList()}
        </Box>
      )}
    </Box>
  );
}

export default TV;