import React from "react";
import styled from "styled-components/native";

import MainComponent from "../components/main/MainComponent";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Main = ({ navigation }) => {
  return (
    <Container>
      <MainComponent navigation={navigation} />
    </Container>
  );
};

export default Main;
