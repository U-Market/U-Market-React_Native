import React, { useContext, useState, useEffect, useRef } from "react";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { Input, Button } from "../index";
import { ProgressContext } from "../../contexts";
import { removeWhitespace, validateEmail } from "../../utills/common";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding-top: 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 60px;
  color: ${({ theme }) => theme.errorText};
`;

const LoginPageMove = styled.SafeAreaView`
  flex-direction: row;
  width: 80%;
  margin-top: 80%;
`;
const Icon = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 40%;
`;

const ButtonContainer = styled.View`
  align-items: center;
  width: 100%;
`;

function FindPw({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const didmountRef = useRef();
  const emailRef = useRef();

  const { spinner } = useContext(ProgressContext);

  const _handleEmailChange = (email) => {
    setEmail(removeWhitespace(email));
  };

  const _handleNameChange = (name) => {
    setEmail(removeWhitespace(name));
  };

  const _handleFindPwSucess = (json) => {
    // setFindPw(json);
    Alert.alert(t.print("TemporaryPasswordWillBeSentToTheEmailYouEntered"));
  };

  const _handleLoginPage = () => {
    navigation.navigate("LoginQuestion");
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!validateEmail(email)) {
        _errorMessage = t.print("PleaseFollowTheEmailFormat");
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [email]);

  useEffect(() => {
    setDisabled(!(email && !errorMessage));
  }, [email, errorMessage]);

  return (
    <Container>
      <Input
        label={t.print("Name")}
        value={name}
        onChangeText={_handleNameChange}
        onSubmitEditing={() => {}}
        placeholder={t.print("Name")}
        returnKeyType="next"
      />
      <Input
        ref={emailRef}
        label={t.print("Email")}
        value={email}
        onChangeText={_handleEmailChange}
        onSubmitEditing={() => {}}
        placeholder={t.print("Email")}
        returnKeyType="done"
      />
      <ErrorText>{errorMessage}</ErrorText>
      <LoginPageMove>
        <Text
          style={{
            color: "#FFAE52",
            paddingHorizontal: 5,
            alignSelf: "center",
            justifyContent: "flex-end",
          }}
        >
          {t.print("MoveToLoginPage")}
        </Text>
        <Icon onPress={_handleLoginPage}>
          <AntDesign name="arrowright" size={24} color="#FFAE52" />
        </Icon>
      </LoginPageMove>
      <ButtonContainer>
        <Button
          title={t.print("FindPassword")}
          onPress={_handleFindPwSucess}
          disabled={disabled}
        />
      </ButtonContainer>
    </Container>
  );
}

export default FindPw;
