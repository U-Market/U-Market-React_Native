import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input, Button } from "../index";
import Agree from "./Agree";
import {
  validateEmail,
  removeWhitespace,
  checkNickname,
  checkPassword,
} from "../../utils/common";
import { ProgressContext } from "../../contexts";
import { API_URL } from "@env";
import { auth } from "../../utils/firebase";
const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  margin-top: 30px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 12px;
  font-size: 10px;
  line-height: 12px;
  padding-left: 60px;
  color: ${({ theme }) => theme.errorText};
`;

const SignUp = ({ navigation, name, selectedFilterData }) => {
  const { spinner } = useContext(ProgressContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorPasswordConfirmMessage, setErrorPasswordConfirmMessage] =
    useState("");
  const [errorNicknameMessage, setErrorNicknameMessage] = useState("");

  const [isAgree, setIsAgree] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nicknameRef = useRef();
  const didmountRef = useRef();

  const _handleLoginPage = () => {
    navigation.navigate("LoginQuestion");
  };

  const _handleSignUpSucess = async () => {
    //회원가입 fetch 추가
    const {
      selectedRegion,
      selectedSchool,
      selectedMajor,
      selectedDepartment,
    } = selectedFilterData;

    const request = {
      regionNum: selectedRegion.value,
      schoolNum: selectedSchool.value,
      majorNum: selectedMajor.value,
      departmentNum: selectedDepartment.value,
      email,
      name,
      nickname,
      psword: password,
    };

    try {
      spinner.start();
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(request),
      }).then((res) => res.json());

      if (response?.msg) {
        Alert.alert(response.msg);
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            user
              .updateProfile({
                nickname: name,
                photoUrl:
                  "https://d31w371p5vvb99.cloudfront.net/profile/basicprofile.png",
              })
              .catch(function (error) {
                alert(error.message);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        navigation.navigate("LoginQuestion");
      } else {
        Alert.alert(response.error);
      }
    } catch (e) {
      Alert.alert("잠시후 다시 시도해주십시오.");
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _emailErrorMessage = "";
      let _passwordMessage = "";
      let _passwordConfirmMessage = "";
      let _nicknameMessage = "";
      if (!validateEmail(email)) {
        _emailErrorMessage = "이메일 형식을 지켜주세요";
        setErrorEmailMessage(_emailErrorMessage);
      } else if (!checkPassword(password)) {
        _passwordMessage =
          "비밀번호는 영문,특수문자,숫자가 포함된 9자 이상이여야 합니다.";
        setErrorPasswordMessage(_passwordMessage);
      } else if (password !== passwordConfirm) {
        _passwordConfirmMessage = "비밀번호가 일치하지 않습니다.";
      } else if (!checkNickname(nickname)) {
        _nicknameMessage = "별명은 최대 8글자입니다 (모음,자음 불가)";
        setErrorNicknameMessage(_nicknameMessage);
      } else {
        _emailErrorMessage = "";
        _passwordMessage = "";
        _passwordConfirmMessage = "";
        _nicknameMessage = "";
      }
      setErrorPasswordConfirmMessage(_passwordConfirmMessage);
    } else {
      didmountRef.current = true;
    }
  }, [email, password, passwordConfirm, nickname]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorEmailMessage(
      validateEmail(changedEmail) ? "" : "이메일 형식을 지켜주세요"
    );
  };

  const _handlePasswordChange = (password) => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
    setErrorPasswordMessage(
      checkPassword(changedPassword)
        ? ""
        : "비밀번호는 영문,특수문자,숫자가 포함된 9자 이상이여야 합니다."
    );
  };

  const _handlePasswordConfirmChange = (passwordConfirm) => {
    const changedPasswordConfirm = removeWhitespace(passwordConfirm);
    setPasswordConfirm(changedPasswordConfirm);
    if (changedPasswordConfirm !== password) {
      setErrorPasswordConfirmMessage(
        changedPasswordConfirm ? "" : "비밀번호가 일치하지 않습니다."
      );
    }
  };

  const _handleNicknameChange = (nickname) => {
    const changedNickname = removeWhitespace(nickname);
    setNickname(changedNickname);
    setErrorNicknameMessage(
      checkNickname(changedNickname)
        ? ""
        : "별명은 최대 8글자입니다 (모음,자음 불가)"
    );
  };

  // const _handleKakaoLogin = async () => {
  //   navigation.navigate("Kakao");
  // };

  // const _handleGoogleLogin = async () => {
  //   navigation.navigate("Google");
  // };

  // useEffect(() => {
  //   setDisabled(
  //     !(
  //       email &&
  //       password &&
  //       passwordConfirm &&
  //       nickname &&
  //       isAgree &&
  //       !errorEmailMessage &&
  //       !errorPasswordMessage &&
  //       !errorPasswordConfirmMessage &&
  //       !errorNicknameMessage
  //     )
  //   );
  // }, [
  //   email,
  //   password,
  //   passwordConfirm,
  //   nickname,
  //   isAgree,
  //   errorEmailMessage,
  //   errorPasswordMessage,
  //   errorPasswordConfirmMessage,
  //   errorNicknameMessage,
  // ]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <Input
          label="이메일"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => {}}
          placeholder="email@naver.com"
          returnKeyType="next"
          keyboardType="email-address"
        />
        <ErrorText>{errorEmailMessage}</ErrorText>
        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={() => {}}
          placeholder="비밀번호"
          returnKeyType="next"
          isPassword
        />
        <ErrorText>{errorPasswordMessage}</ErrorText>
        <Input
          ref={passwordConfirmRef}
          label="비밀번호 확인"
          value={passwordConfirm}
          onChangeText={_handlePasswordConfirmChange}
          onSubmitEditing={() => {}}
          placeholder="비밀번호 확인"
          returnKeyType="next"
          isPassword
        />
        <ErrorText>{errorPasswordConfirmMessage}</ErrorText>
        <Input
          ref={nicknameRef}
          label="닉네임"
          value={nickname}
          onChangeText={_handleNicknameChange}
          onSubmitEditing={() => {}}
          placeholder="닉네임"
          returnKeyType="done"
        />
        <ErrorText>{errorNicknameMessage}</ErrorText>

        <Agree isAgree={(isAgree) => setIsAgree(isAgree)}></Agree>
        <Button
          title="회원가입"
          onPress={_handleSignUpSucess}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
