import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert, Text } from "react-native";

import { checkPassword, removeWhitespace } from "../../../utills/common";
import { Button } from "../../index";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding-top: 40px;
  width: 100%;
`;

const IDShow = styled.Text`
  padding-left: 20px;
  padding-top: 5px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
`;

const IDInputContainer = styled.View`
  padding-left: 20px;
  padding-top: 40px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
`;

const IDInputText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const IDInput = styled.TextInput.attrs({
  placeholderPaddingLeft: 20,
})`
  background-color: ${({ theme }) => theme.background};
  width: 90%;
  padding-top: 10px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.main};
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;

  font-size: 12px;
  color: ${({ theme }) => theme.errorText};
  margin-bottom: 30px;
`;

const IdUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errorCurrentMessage, setErrorCurrentMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorPasswordConfirmMessage, setErrorPasswordConfirmMessage] =
    useState("");
  const didmountRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const _handlePasswordUpdate = () => {
    Alert.alert("아직기능없음");
  };

  useEffect(() => {
    // 오류메시지가 바로뜨는걸 막는다.
    if (didmountRef.current) {
      let _passwordMessage = "";
      let _passwordConfirmMessage = "";

      if (!checkPassword(password)) {
        _passwordMessage = t.print("PasswordWarning");
        setErrorPasswordMessage(_passwordMessage);
      } else if (password !== passwordConfirm) {
        _passwordConfirmMessage = t.print("NotMatchPassword");
      } else {
        _passwordMessage = "";
        _passwordConfirmMessage = "";
      }
      setErrorPasswordConfirmMessage(_passwordConfirmMessage);
    } else {
      didmountRef.current = true;
    }
  }, [password, passwordConfirm]);

  const _handleCurrentPassword = (currentPassword) => {
    //공백제거 형식체크
    const currentPasswordRmSpace = removeWhitespace(currentPassword);
    if (currentPasswordRmSpace !== currentPassword) {
      setErrorCurrentMessage(
        currentPasswordRmSpace ? "" : t.print("NotMatchPassword")
      );
    }
  };

  const _handlePasswordChange = (password) => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
    setErrorPasswordMessage(
      checkPassword(changedPassword) ? "" : t.print("PasswordWarning")
    );
  };
  const _handlePasswordConfirmChange = (passwordConfirm) => {
    const changedPasswordConfirm = removeWhitespace(passwordConfirm);
    setPasswordConfirm(changedPasswordConfirm);
    if (changedPasswordConfirm !== password) {
      setErrorPasswordConfirmMessage(
        changedPasswordConfirm ? "" : t.print("NotMatchPassword")
      );
    }
  };

  useEffect(() => {
    setDisabled(
      !(
        password &&
        passwordConfirm &&
        !errorPasswordMessage &&
        !errorPasswordConfirmMessage
      )
    );
  }, [
    password,
    passwordConfirm,
    errorPasswordMessage,
    errorPasswordConfirmMessage,
  ]);

  return (
    <Container>
      <IDInputContainer>
        <IDInputText>{t.print("currentPassword")}</IDInputText>
        <IDInput
          value={currentPassword}
          onChangeText={_handleCurrentPassword}
          placeholder={t.print("currentPassword")}
          secureTextEntry={true}
        />
        <ErrorText>{errorCurrentMessage}</ErrorText>

        <IDInputText>{t.print("PasswordToChange")}</IDInputText>
        <IDInput
          ref={passwordRef}
          value={password}
          onChangeText={_handlePasswordChange}
          placeholder={t.print("password")}
          secureTextEntry={true}
          returnKeyType='next'
        />
        <ErrorText>{errorPasswordMessage}</ErrorText>

        <IDInputText>{t.print("Verifypassword")}</IDInputText>
        <IDInput
          ref={passwordConfirmRef}
          value={passwordConfirm}
          onChangeText={_handlePasswordConfirmChange}
          placeholder={t.print("Verifypassword")}
          secureTextEntry={true}
          returnKeyType='done'
        />
        <ErrorText>{errorPasswordConfirmMessage}</ErrorText>

        <Button
          title={t.print("ChangePassword")}
          disabled={disabled}
          onPress={_handlePasswordUpdate}
        />
      </IDInputContainer>
    </Container>
  );
};

export default IdUpdate;
