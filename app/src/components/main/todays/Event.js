import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import ImageSlider from "./ImageSlider";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
`;

const Event = () => {
  let images = ["https://d31w371p5vvb99.cloudfront.net/board/123456.jpg"];
  return (
    <Container>
      <ImageSlider images={images} resizeMode={"cover"} isEvent={true} />
    </Container>
  );
};

export default Event;
