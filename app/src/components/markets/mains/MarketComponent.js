import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, RefreshControl } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AlertIcon from "../../alert/AlertIcon";
import Category from "./Category";
import Lookup from "./Lookup";
import FilterContainer from "../../filter/FilterContainer";
import t from "../../../utils/translate/Translator";

const MAX_PRICE = 4200000000;
const NUMCOLUMNS = 2;
const INITIAL_START_NO = 0;

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  z-index: 1;
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
const HeaderContainer = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  padding-left: 15px;
  font-size: 20px;
  font-weight: bold;
  font-family: APPLE_GOTHIC;
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
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedSchool, setSelectedSchool] = useState({});
  const [selectedDepartment, setSelectedDepatments] = useState({});
  const [selectedMajor, setSelectedMajor] = useState({});

  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(MAX_PRICE);

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

  const moveMarketSearchPage = () => {
    navigation.navigate("MarketSearchPage");
  };

  const pressLookupButton = async () => {
    navigation.navigate("LookupPage", {
      selectedFilterData,
      startPrice,

      endPrice,
    });
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={20}
      >
        <Container>
          <MainTop>
            <HeaderContainer>
              <HeaderTitle>{t.print("TradingMarket")}</HeaderTitle>
              <AlertIcon navigation={navigation}></AlertIcon>
            </HeaderContainer>
            <SearchContainer onPress={moveMarketSearchPage}>
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
          <Category
            navigation={navigation}
            selectedFilterData={selectedFilterData}
          />

          <Padding />

          <Lookup
            navigation={navigation}
            setIsReady={setIsReady}
            isReady={isReady}
            onPress={pressLookupButton}
            setEndPrice={setEndPrice}
            setStartPrice={setStartPrice}
            isTitle={true}
          />
        </Container>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default MarketComponent;
