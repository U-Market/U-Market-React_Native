import React, { useState } from "react";
import styled from "styled-components/native";

import MarketSearchResult from "../../components/searchs/MarketSearchResult";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const MarketSearchResultPage = ({ navigation, route }) => {
  const { headerTitle, categoryNo, searchList, selectedFilterData } =
    route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={headerTitle.replace(/\+/g, " ")}
      />
      <MarketSearchResult
        headerTitle={headerTitle}
        categoryNo={categoryNo}
        navigation={navigation}
        searchList={searchList}
        selectedFilterData={selectedFilterData}
      ></MarketSearchResult>
    </Container>
  );
};

export default MarketSearchResultPage;
