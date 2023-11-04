import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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

const MainSlider = ( {images} ) => {
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
          {images.map((imageUrl, index) => (
            <Box key={index}>
              <StyledSliderImage src={imageUrl} alt={`Image ${index + 1}`} />
            </Box>
          ))}
        </Slider>
      </StyledSliderWrapper>
    </MainSliderContainer>
  );
};

export default MainSlider;

