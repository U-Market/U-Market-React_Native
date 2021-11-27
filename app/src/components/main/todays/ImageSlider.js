import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  height: 250px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;

const ImageSlider = ({ images, resizeMode, isEvent }) => {
  return (
    <Container>
      {isEvent ? (
        <SliderBox
          circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
          resizeMode={resizeMode} // 이미지 사이즈 조절값
          images={images} // 이미지 주소 리스트
          sliderBoxHeight="100%"
          dotColor="#FFAE52"
          inactiveDotColor="#90A4AE"
          imageLoadingColor="#FFAE52"
          dotStyle={{
            width: 11,
            height: 11,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: "#666666",
          }}
        />
      ) : (
        <SliderBox
          circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
          resizeMode={resizeMode} // 이미지 사이즈 조절값
          images={images} // 이미지 주소 리스트
          sliderBoxHeight="100%"
          dotColor="#FFAE52"
          inactiveDotColor="#90A4AE"
          imageLoadingColor="#FFAE52"
          dotStyle={{
            width: 11,
            height: 11,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: "#666666",
          }}
          ImageComponentStyle={{
            borderRadius: 10,
            width: "90%",
          }}
        />
      )}
    </Container>
  );
};

export default ImageSlider;
