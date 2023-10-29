import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider1 from "../../Assets/MainSlider/MainSlider1.webp";
import MainSlider2 from "../../Assets/MainSlider/MainSlider2.webp";
import MainSlider3 from "../../Assets/MainSlider/MainSlider3.webp";

const MainSliderContainer = styled.div`
  margin: 0 auto;
`;

const StyledSliderImage = styled.img`
  width: 100%;
`

const StyledSliderWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`;

const MainSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
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
            <StyledSliderImage src={MainSlider1} alt="Image 1" />
          </Box>
          <Box>
            <StyledSliderImage src={MainSlider2} alt="Image 2" />
          </Box>
          <Box>
            <StyledSliderImage src={MainSlider3} alt="Image 3" />
          </Box>
        </Slider>
      </StyledSliderWrapper>
    </MainSliderContainer>
  );
};

export default MainSlider;

