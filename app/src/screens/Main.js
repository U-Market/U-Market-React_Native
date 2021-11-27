import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import MainComponent from "../components/main/MainComponent";
import { ReadyContext } from "../contexts";

import LoginQuestion from "./auth/LoginQuestion";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Main = ({ navigation }) => {
  const [isLogined, setIsLogined] = useState(false);

  const { isReady, readyDispatch } = useContext(ReadyContext);

  return (
    <>
      {!isLogined ? (
        <Container>
          <MainComponent navigation={navigation} />
        </Container>
      ) : (
        <LoginQuestion />
      )}
    </>
  );
};

export default Main;
