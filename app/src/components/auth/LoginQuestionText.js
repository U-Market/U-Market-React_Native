import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin-top: 40px;
`;

const TextContainer = styled.View`
  margin-left: 20px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.main};
  font-size: 18px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.Text`
  color: ${({ theme }) => theme.text2};
`;

const LoginQuestionText = ({}) => {
  return (
    <Container>
      <TextContainer>
        <Title>U-MARKET</Title>
        <SubTitle>{t.print("Student_")}</SubTitle>
        <SubTitle>{t.print("OnlyForYou_")}</SubTitle>
        <Content>{t.print("SecondHandTradingForUniversityStudents")}</Content>
      </TextContainer>
    </Container>
  );
};

export default LoginQuestionText;
