import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../contexts";
import Header from "../../components/commons/Header";

import NoticeList from "../../components/profiles/NoticeList";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const NoticePage = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"공지사항"}
      />
      <NoticeList navigation={navigation} />
    </Container>
  );
};

export default NoticePage;
