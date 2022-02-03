import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StudentContext } from "../../../contexts";

import t from "../../../utils/translate/Translator";

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

const Account = ({ navigation, setIsLoading }) => {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(StudentContext);

  const moveIdUpdatePage = async () => {
    navigation.navigate("IdUpdatePage", { setIsLoading });
  };

  const movePasswordUpdatePage = async () => {
    // navigation.navigate("PasswordUpdatePage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const movetSecessionPage = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    dispatch({});
  };

  return (
    <Container>
      <Category onPress={moveIdUpdatePage}>
        <Text>{t.print("EditProfile")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={movePasswordUpdatePage}>
        <Text>{t.print("ChangePassword")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <Category onPress={movetSecessionPage}>
        <Text>{t.print("MembershipWithdrawal")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </Category>
      <LastCategory onPress={logout}>
        <Text>{t.print("Signout")}</Text>
        <Icon>
          <AntDesign name="right" size={25} color={theme.main} />
        </Icon>
      </LastCategory>
    </Container>
  );
};

export default Account;
