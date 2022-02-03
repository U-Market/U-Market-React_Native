import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";

import t from "../../../utils/translate/Translator";

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
  height: 25%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastCategory = styled.TouchableOpacity`
  width: 85%;
  height: 25%;
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

  const moveNoticePage = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const moveEventPage = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  // const moveLanguagePage = async () => {
  //   navigation.navigate("LanguegePage");
  // };

  const moveServiceCenterPage = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  return (
    <Container>
      <Category onPress={moveNoticePage}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Notice")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={moveEventPage}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Event")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category>
      {/* <Category onPress={moveLanguagePage}>
        <Text style={{ paddingLeft: 5 }}>{t.print("Languege")}</Text>
        <Icon>
          <AntDesign name="right" size={20} color={theme.main} />
        </Icon>
      </Category> */}
      <Category onPress={moveServiceCenterPage}>
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
