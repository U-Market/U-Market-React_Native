import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../../contexts";
import Header from "../../../components/commons/Header";

import PasswordUpdate from "../../../components/profiles/ProfileUpdates/PasswordUpdate";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const PasswordUpdatePage = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"비밀번호 변경"}
      />
      <PasswordUpdate navigation={navigation} />
    </Container>
  );
};

export default PasswordUpdatePage;
