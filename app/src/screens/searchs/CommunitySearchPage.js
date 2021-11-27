import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";

import { ReadyContext, ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import Header from "../../components/commons/Header";
import CommunitySearch from "../../components/searchs/CommunitySearch";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const CommunitySelectPage = ({ navigation, route }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("CommunitySearch")}
      />
      <CommunitySearch navigation={navigation} />
    </Container>
  );
};

export default CommunitySelectPage;
