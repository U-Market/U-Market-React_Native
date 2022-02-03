import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";

import { TearmsContext } from "../../contexts";

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

const LoginQuestionPage = ({ navigation }) => {
  const { agreeDispatch } = useContext(TearmsContext);

  useEffect(() => {
    agreeDispatch.disAgree();
  }, []);

  return (
    <Container>
      <LoginQuestionText></LoginQuestionText>
      <LoginQuestionBtn
        navigation={navigation}
        onPress={() => navigation.replace("LoginPage")}
      ></LoginQuestionBtn>
    </Container>
  );
};

export default LoginQuestionPage;
