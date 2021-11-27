import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";

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
        moveViewByNavigation={() => navigation.goBack()}
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
