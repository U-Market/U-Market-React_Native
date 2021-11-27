import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../contexts";
import Header from "../../components/commons/Header";

import Event from "../../components/profiles/Event";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const EventPage = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"이벤트"}
      />
      <Event navigation={navigation} />
    </Container>
  );
};

export default EventPage;
