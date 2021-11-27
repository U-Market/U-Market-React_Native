import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";

import t from "../../utills/translate/Translator";

const Container = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  margin-top: 15px;
  height: 35%;
`;

const Category = styled.TouchableOpacity`
  width: 85%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastCategory = styled.TouchableOpacity`
  width: 85%;
  height: 20%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
`;

const Icon = styled.View`
  position: absolute;
  right: 10px;
`;

const ProfileCategory = ({ iconSize, navigation }) => {
  const theme = useContext(ThemeContext);

  const _handleNotice = async () => {
    // navigation.navigate("NoticePage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const _handleEventPage = async () => {
    // navigation.navigate("EventPage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const _handleLanguage = async () => {
    navigation.navigate("LanguegePage");
  };

  const _handleServiceCenter = async () => {
    // navigation.navigate("ServiceCenterPage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  return (
    <Container>
      <Category onPress={_handleNotice}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Notice")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={_handleEventPage}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Event")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={_handleLanguage}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Languege")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={_handleServiceCenter}>
        <Text style={{ paddingLeft: 5 }}>{t.print("CustomerService")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      <LastCategory>
        <Text style={{ paddingLeft: 5 }}>{t.print("Version")}</Text>
        <Text style={{ paddingLeft: 5 }}>0.2</Text>
      </LastCategory>
    </Container>
  );
};

export default ProfileCategory;
