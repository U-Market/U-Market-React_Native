import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../contexts";

import Header from "../../components/commons/Header";
import AlertContainer from "../../components/alert/AlertContainer";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const Alert = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header moveViewByNavigation={() => navigation.goBack()} title={"알림"} />
      <AlertContainer navigation={navigation} />
    </Container>
  );
};

export default Alert;
