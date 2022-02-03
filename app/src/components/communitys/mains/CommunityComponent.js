import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import AlertIcon from "../../alert/AlertIcon";
import MyRelated from "./MyRelated";
import CommunityCategory from "./CommunityCategory";
import FilterContainer from "../../filter/FilterContainer";
import t from "../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
  width: 100%;
`;

const MainTop = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  padding-bottom: 10px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
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

const CommunityComponent = ({ navigation }) => {
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

  const moveCommunitySearchPage = () => {
    navigation.navigate("CommunitySearchPage");
  };

  return (
    <Container>
      <MainTop>
        <HeaderContainer>
          <HeaderTitle>{t.print("Community")}</HeaderTitle>
          <AlertIcon navigation={navigation}></AlertIcon>
        </HeaderContainer>
        <SearchContainer onPress={moveCommunitySearchPage}>
          <SearchInput>
            <SearchTitle>{t.print("searchComment")}</SearchTitle>
          </SearchInput>
          <Icon>
            <FontAwesome5 name="search" size={20} color="#ffc352" />
          </Icon>
        </SearchContainer>

        <FilterContainer selectedFilterData={selectedFilterData} />
      </MainTop>
      <MyRelated navigation={navigation} />
      <CommunityCategory
        navigation={navigation}
        selectedFilterData={selectedFilterData}
      />
    </Container>
  );
};

export default CommunityComponent;
