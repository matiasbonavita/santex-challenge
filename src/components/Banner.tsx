import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/scrollbar/scrollbar.min.css";
import sliderone from "../assets/sliderone.jpg";
import styled from "styled-components";

const StyledBanner = styled.div`
  background-image: ${`url(${sliderone})`};
  height: 500px;
  background-size: cover;
  position:relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -58px;
    left: 0;
    width: 99.9%;
    height: 88px;
    background-color: black;
    transform: rotate(2deg);
  }
`;

const BannerTextContainer = styled.div`
  position: relative;
  top: 34%;
  left: 10%;
  display:flex;
  flex-direction:column;
  width: 60%;
`;

const BannerTopText = styled.div`
  color: white;
  font-size: 20px;
  position: relative;
`;

const BannerMiddleText = styled.div`
  color: white;
  font-size: 50px;
  position: relative;
  font-family: SF-Pro-bold;
  color:#8f0f5a;
`;

const BannerBottomText = styled.div`
  color: white;
  font-size: 30px;
  position: relative;
  font-weight: bold;
`;

export default function Banner() {
  return (
    <StyledBanner>
      <BannerTextContainer>
        <BannerTopText>BACK TO SCHOOL</BannerTopText>
        <BannerMiddleText><span style={{fontWeight:'bolder', color:'white'}}>SPECIAL</span> 50% OFF</BannerMiddleText>
        <BannerBottomText>FOR OUR STUDENT COMMUNITY</BannerBottomText>
      </BannerTextContainer>
    </StyledBanner>
  );
}
