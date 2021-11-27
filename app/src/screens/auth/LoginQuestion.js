import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext, TearmsContext } from "../../contexts";

import Login from "../../components/auth/Login";

import SchoolSelectPage from "./SchoolSelectPage";
import LoginQuestionText from "../../components/auth/LoginQuestionText";
import LoginQuestionBtn from "../../components/auth/LoginQuestionBtn";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const LoginQuestionPage = ({ navigation, props }) => {
  const { isAgree, agreeDispatch } = useContext(TearmsContext);

  useEffect(() => {
    agreeDispatch.disAgree();
  }, []);

  return (
    <Container>
      <LoginQuestionText></LoginQuestionText>
      <LoginQuestionBtn
        navigation={navigation}
        onPress={() => navigation.navigate("LoginPage")}
      ></LoginQuestionBtn>
    </Container>
  );
};

export default LoginQuestionPage;
