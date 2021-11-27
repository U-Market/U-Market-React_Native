import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as App from "expo-updates";

import { getItemFromAsync, setItemToAsync } from "../../utills/AsyncStorage";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const HeaderContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-color: ${({ theme }) => theme.listBorder};
  border-bottom-width: 2px;
  background-color: ${({ theme }) => theme.background};
`;

const HeaderTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderIcon = styled.TouchableOpacity`
  margin: 10px;
`;

const HeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

const SaveButtonContainer = styled.TouchableOpacity`
  align-items: center;
  margin-right: 30px;
`;

const SaveButtonText = styled.Text`
  color: orange;
`;

const LanguageList = styled.View``;

const LanguageBox = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 20px 50px 20px 40px;
`;

const LanguageText = styled.Text``;

const LanguageCheckBox = styled.View`
  align-self: center;
  height: 12px;
  width: 12px;
  padding: 4px;
  border-width: 0.5px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.placeholder};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.mainOrange : theme.background};
`;

const LanguegePage = ({ navigation }) => {
  const [isSelectedEnglish, setIsSelectedEnglish] = useState(false);
  const [isSelectedKorean, setIsSelectedKorean] = useState(false);

  const changeLanguege = async () => {
    if (isSelectedEnglish) {
      await setItemToAsync("lang", "en");
      t.setLanguage("en");
    } else if (isSelectedKorean) {
      await setItemToAsync("lang", "ko");
      t.setLanguage("ko");
    } else {
      Alert.alert("언어를 선택해주십시오.");
    }
    App.reloadAsync();
  };

  useEffect(() => {
    const lang = t.getLanguage();
    switch (lang) {
      case "en":
        setIsSelectedEnglish(true);
        break;
      case "ko":
        setIsSelectedKorean(true);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitleContainer>
          <HeaderIcon onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color="#FFAE52" />
          </HeaderIcon>
          <HeaderTitle>{t.print("Languege")}</HeaderTitle>
        </HeaderTitleContainer>

        <SaveButtonContainer onPress={changeLanguege}>
          <SaveButtonText>저장하기</SaveButtonText>
        </SaveButtonContainer>
      </HeaderContainer>

      <LanguageList>
        <LanguageBox
          onPress={() => {
            setIsSelectedEnglish(!isSelectedEnglish);
            setIsSelectedKorean(false);
          }}
        >
          <LanguageText>English</LanguageText>
          <LanguageCheckBox isSelected={isSelectedEnglish}></LanguageCheckBox>
        </LanguageBox>
        <LanguageBox
          onPress={() => {
            setIsSelectedKorean(!isSelectedKorean);
            setIsSelectedEnglish(false);
          }}
        >
          <LanguageText>한글</LanguageText>
          <LanguageCheckBox isSelected={isSelectedKorean}></LanguageCheckBox>
        </LanguageBox>
      </LanguageList>
    </Container>
  );
};

export default LanguegePage;
