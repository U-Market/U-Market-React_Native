import React, { useState, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

import Header from "../../../components/commons/Header";
import CategorySelect from "../../../components/boards/writes/CategorySelect";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const CategorySelectPage = ({ navigation, route }) => {
  const { isMarket } = route.params;
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("CategorySettings")}
      />

      <CategorySelect navigation={navigation} isMarket={isMarket} />
    </Container>
  );
};

export default CategorySelectPage;
