import styled from "@emotion/styled";
import arrowRight from "../../Assets/arrowRight.svg";

export const StyledSliderWrapper = styled.div`
  width: 100%;
  position: relative;

  .slick-arrow:before {
    border-radius: 0px;
    content: "";
    width: 30px;
  }
  .slick-arrow {
    position: absolute;
    top: -10px;
    right: 20px;
    left: auto;
    z-index: 10;
    width: 20px;
    height: 20px;
    background-image: url(${arrowRight});
    background-size: cover;
    background-repeat: no-repeat;
  }

  .slick-prev {
    right: 45px;
    top: -20px;
    transform: scale(-1, 1);
  }
`;