import React, { useContext, useState, useEffect, useRef } from "react";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import { Input, Button } from "../index";
import { ProgressContext } from "../../contexts";
import { removeWhitespace, validateEmail } from "../../utills/common";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  margin: 0;
  width: 100%;
  border-top-left-radius: 60px;
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

function FindId() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const didmountRef = useRef();

  const { spinner } = useContext(ProgressContext);

  const _handleEmailChange = (email) => {
    setEmail(removeWhitespace(email));
  };
  const _handleFindIdSucess = (json) => {
    // setFindId(json);
    Alert.alert("해당 이메일로 ID가 발송되었습니다.");
  };

  const _handleLoginPage = () => {
    navigation.navigate("LoginQuestion");
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!validateEmail(email)) {
        _errorMessage = "이메일 형식을 지켜주세요";
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
        label="이메일"
        value={email}
        onChangeText={_handleEmailChange}
        onSubmitEditing={() => {}}
        placeholder="이메일 (연락가능한 이메일을 적어주시면 됩니다)"
        returnKeyType="done"
      />
      <ErrorText>{errorMessage}</ErrorText>
      <LoginPageMove>
        <Text
          style={{
            color: "#FFC352",
            paddingHorizontal: 5,
            alignSelf: "center",
            justifyContent: "flex-end",
          }}
        >
          로그인 페이지로 이동
        </Text>
        <Icon onPress={_handleLoginPage}>
          <AntDesign name="arrowright" size={24} color="#FFC352" />
        </Icon>
      </LoginPageMove>
      <ButtonContainer>
        <Button
          title="이메일 찾기"
          onPress={_handleFindIdSucess}
          disabled={disabled}
        />
      </ButtonContainer>
    </Container>
  );
}

export default FindId;
