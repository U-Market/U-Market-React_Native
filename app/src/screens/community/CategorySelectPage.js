import React from "react";

import styled from "styled-components/native";

import Header from "../../components/commons/Header";
import CategorySelect from "../../components/markets/boards/writes/CategorySelect";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const CategorySelectPage = ({ navigation, route }) => {
  const { isMarket, isUpdate } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("CategorySettings")}
      />

      <CategorySelect
        navigation={navigation}
        isMarket={isMarket}
        isUpdate={isUpdate}
      />
    </Container>
  );
};

export default CategorySelectPage;
