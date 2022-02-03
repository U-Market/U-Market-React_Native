import React from "react";
import styled from "styled-components/native";

import Header from "../../components/commons/Header";
import CommunitySearchResult from "../../components/searchs/CommunitySearchResult";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const CommunitySearchResultPage = ({ navigation, route }) => {
  const { headerTitle, searchList } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.replace("CommunitySearchPage")}
        title={headerTitle}
      />
      <CommunitySearchResult
        navigation={navigation}
        searchList={searchList}
        headerTitle={headerTitle}
      />
    </Container>
  );
};

export default CommunitySearchResultPage;
