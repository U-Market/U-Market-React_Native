import React from "react";
import styled from "styled-components/native";

import Header from "../../components/commons/Header";
import MarketSearch from "../../components/searchs/MarketSearch";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketSelectPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={t.print("ProductSearch")}
      />
      <MarketSearch navigation={navigation} />
    </Container>
  );
};

export default MarketSelectPage;
