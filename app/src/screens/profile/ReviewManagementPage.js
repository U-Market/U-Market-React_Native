import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../contexts";

import Header from "../../components/commons/Header";
import Review from "../../components/profiles/reviews/Review";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ReviewManagementPage = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("후기 관리")}
      />
      <Review navigation={navigation} />
    </Container>
  );
};

export default ReviewManagementPage;
