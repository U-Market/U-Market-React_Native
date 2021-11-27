import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  Text,
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import AlertIcon from "../alert/AlertIcon";
import Category from "./Category";
import Lookup from "./Lookup";
import FilterContainer from "../filter/FilterContainer";
import t from "../../utills/translate/Translator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: 60px;
  /* align-items: center; */
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  padding-left: 15px;
  font-size: 20px;
  font-weight: bold;
  font-family: APPLE_GOTHIC;
`;

const MainTop = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  padding-bottom: 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const SearchContainer = styled.TouchableOpacity`
  width: 100%;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 94%;
  border-radius: 5px;
  padding-left: 15px;
  height: 40px;
`;

const SearchTitle = styled.Text`
  font-size: 12px;
  height: 40px;
  line-height: 37px;
  color: ${({ theme }) => theme.text2};
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 40px;
`;

const Padding = styled.View`
  padding: 5px;
  width: 100%;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketComponent = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedSchool, setSelectedSchool] = useState({});
  const [selectedDepartment, setSelectedDepatments] = useState({});
  const [selectedMajor, setSelectedMajor] = useState({});

  const selectedFilterData = {
    selectedRegion,
    setSelectedRegion,
    selectedSchool,
    setSelectedSchool,
    selectedDepartment,
    setSelectedDepatments,
    selectedMajor,
    setSelectedMajor,
  };

  const _handelMarketSelectPage = () => {
    navigation.navigate("MarketSearchPage");
  };
  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <Container>
        <MainTop>
          <HeaderContainer>
            <HeaderTitle>{t.print("TradingMarket")}</HeaderTitle>
            <AlertIcon navigation={navigation}></AlertIcon>
          </HeaderContainer>
          <SearchContainer onPress={_handelMarketSelectPage}>
            <SearchInput>
              <SearchTitle>{t.print("searchComment")}</SearchTitle>
            </SearchInput>
            <Icon>
              <FontAwesome5 name="search" size={20} color="#FFC352" />
            </Icon>
          </SearchContainer>

          <FilterContainer
            selectedFilterData={selectedFilterData}
            isSchoolSelect={false}
          />
        </MainTop>
        <Category navigation={navigation} />
        <Padding />
        <>
          <Lookup
            navigation={navigation}
            selectedFilterData={selectedFilterData}
          />
        </>
      </Container>
    </ScrollView>
  );
};

export default MarketComponent;
