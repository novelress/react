import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import arrowRight from "../../Assets/MainSlider/arrowRight.svg";
import MainSlider1 from "../../Assets/MainSlider/MainSlider1.webp";
import MainSlider2 from "../../Assets/MainSlider/MainSlider2.webp";
import MainSlider3 from "../../Assets/MainSlider/MainSlider3.webp";

const MainSliderContainer = styled.div`
  margin: 0 auto;
`;

const StyledSliderWrapper = styled.div`
  width: 100%;
  position: relative;

  .slick-arrow:before {
    border-radius: 0px;
    content: "";
    width: 30px;
    background-color: transparent;
  } 

  .slick-arrow {
    position: absolute;
    right: 100px;
    z-index: 10;
    width: 40px;
    height: 40px;
    background-image: url(${arrowRight});
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: transparent;
    transition: background-color 0.3s;
  }

  .slick-arrow:hover {
    background-color: black;
  }

  .slick-prev {
    transform: scale(-1, 1);
    left: 100px;
  }
`;

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <MainSliderContainer>
      <StyledSliderWrapper>
        <Slider {...settings}>
          <Box>
            <img src={MainSlider1} alt="Image 1" />
          </Box>
          <Box>
            <img src={MainSlider2} alt="Image 2" />
          </Box>
          <Box>
            <img src={MainSlider3} alt="Image 3" />
          </Box>
        </Slider>
      </StyledSliderWrapper>
    </MainSliderContainer>
  );
};

export default MainSlider;

