import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Text, View, Image, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_URL } from "@env";
import { auth } from "../../utills/firebase";

import LoginQuestionBtn from "./LoginQuestionBtn";
import {
  validateEmail,
  checkPassword,
  removeWhitespace,
} from "../../utills/common";
import { Input } from "../index";
import { getItemFromAsync, setItemToAsync } from "../../utills/AsyncStorage";
import t from "../../utills/translate/Translator";
import { ProgressContext } from "../../contexts";

const Container = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  flex: 2;
`;

const InputContainer = styled.SafeAreaView`
  margin-top: 5%;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  border-radius: 40px;
  align-items: center;
`;

const FindIdContainer = styled.SafeAreaView`
  flex-direction: row;
  width: 80%;
  height: 40px;
  margin-bottom: 50px;
`;

const ArrowIcon = styled.TouchableOpacity`
  padding: 10px;
  padding-left: 35px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 60px;
  font-size: 10px;
  color: ${({ theme }) => theme.errorText};
`;

const Icon = styled.TouchableOpacity`
  padding: 10px;
`;

const Login = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const { spinner } = useContext(ProgressContext);

  const passwordRef = useRef();
  const didmountRef = useRef();

  useEffect(() => {
    // 오류메시지가 바로뜨는걸 막는다.
    if (didmountRef.current) {
      let _emailErrorMessage = "";
      let _passwordMessage = "";
      if (!validateEmail(email)) {
        _emailErrorMessage = t.print("PleaseFollowTheEmailFormat");
        setErrorEmailMessage(_emailErrorMessage);
      } else if (!checkPassword(password)) {
        _passwordMessage = t.print(
          "PasswordMustBeAtLeast9CharactersIncludingEnglishSpecialCharactersAndNumbers"
        );
        setErrorPasswordMessage(_passwordMessage);
      } else {
        _emailErrorMessage = "";
        _passwordMessage = "";
      }
    } else {
      didmountRef.current = true;
    }
  }, [email, password]);

  // useEffect(() => {
  //   setDisabled(
  //     !(email && password && !errorEmailMessage && !errorPasswordMessage)
  //   );
  // }, [email, password, errorEmailMessage, errorPasswordMessage]);

  useEffect(() => {}, []);

  const _handleEmailChange = (email) => {
    //공백제거 형식체크
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorEmailMessage(
      validateEmail(changedEmail) ? "" : t.print("PleaseFollowTheEmailFormat")
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
    setErrorPasswordMessage(
      checkPassword(password)
        ? ""
        : t.print(
            "PasswordMustBeAtLeast9CharactersIncludingEnglishSpecialCharactersAndNumbers"
          )
    );
  };

  const _handleLoginButtonPress = async () => {
    // setIsLogined(true);
    const request = {
      email: email,
      psword: password,
    };
    try {
      spinner.start();
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(request),
      }).then((res) => res.json());
      console.log(response);
      console.log(request);
      if (response?.email) {
        setItemToAsync("userNo", String(response.userNo));
        setItemToAsync("departmentNo", String(response.departmentNo));
        setItemToAsync("schoolNo", String(response.schoolNo));
        setItemToAsync("majorNo", String(response.majorNo));
        setItemToAsync("regionNo", String(response.regionNo));
        // console.log(response);

        auth.signInWithEmailAndPassword(email, password).catch((error) => {
          let errorMessage = error.message;
          alert(errorMessage);
        });

        const unsubscribe = auth.onAuthStateChanged(function (user) {
          if (user) {
            navigation.replace("Main");
          } else {
            // No user is signed in.
            navigation.canGoBack() && navigation.popToTop();
          }
        });
        Alert.alert(`${t.print("LoginSuccess")}`);

        return unsubscribe;
      } else {
        console.log(response);
        Alert.alert(response.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      spinner.stop();
    }
  };

  const _handleFindPage = () => {
    navigation.navigate("FindPage");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <InputContainer>
          <Input
            label={t.print("Email")}
            value={email}
            onChangeText={_handleEmailChange}
            onSubmitEditing={() => {}}
            placeholder={t.print("Email")}
            returnKeyType='next'
          />
          <ErrorText>{errorEmailMessage}</ErrorText>
          <Input
            ref={passwordRef}
            label={t.print("Password")}
            value={password}
            onChangeText={_handlePasswordChange}
            onSubmitEditing={() => {}}
            placeholder={t.print("Password")}
            returnKeyType='done'
            isPassword
          />
          <ErrorText>{errorPasswordMessage}</ErrorText>
        </InputContainer>

        {/* <FindIdContainer>
          <Icon>
            <AntDesign name="questioncircleo" size={24} color="#FFC352" />
          </Icon>
          <Text
            style={{
              color: "#FFC352",
              paddingHorizontal: 5,
              alignSelf: "center",
              justifyContent: "flex-end",
            }}
          >
            {t.print("DidYouForgetThePassword")}
          </Text>
          <ArrowIcon onPress={_handleFindPage}>
            <AntDesign name="arrowright" size={24} color="#FFC352" />
          </ArrowIcon>
        </FindIdContainer> */}
        <LoginQuestionBtn
          navigation={navigation}
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
