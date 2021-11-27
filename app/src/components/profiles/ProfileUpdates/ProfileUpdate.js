import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";

import t from "../../../utills/translate/Translator";

const Container = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  height: 30%;
`;

const Category = styled.TouchableOpacity`
  width: 100%;
  height: 25%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastCategory = styled.TouchableOpacity`
  width: 100%;
  height: 25%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-left: 30px;
`;

const Icon = styled.View`
  position: absolute;
  right: 20px;
`;

const ProfileUpdate = ({ iconSize, navigation, setIsReady }) => {
  const theme = useContext(ThemeContext);

  const _handleIdUpdate = async () => {
    navigation.navigate("IdUpdatePage", { setIsReady: setIsReady });
  };

  const _handlePasswordUpdate = async () => {
    // navigation.navigate("PasswordUpdatePage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const _handletSecession = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const _handleLogout = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  return (
    <Container>
      <Category onPress={_handleIdUpdate}>
        <Text>{t.print("EditProfile")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={_handlePasswordUpdate}>
        <Text>{t.print("ChangePassword")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={_handletSecession}>
        <Text>{t.print("MembershipWithdrawal")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <LastCategory onPress={_handleLogout}>
        <Text>{t.print("Signout")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </LastCategory>
    </Container>
  );
};

export default ProfileUpdate;
