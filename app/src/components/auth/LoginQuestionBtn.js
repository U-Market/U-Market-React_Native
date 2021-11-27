import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, View, Image } from "react-native";

import { Button } from "../";
import { ReadyContext, TearmsContext } from "../../contexts";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  margin-bottom: 30px;
`;

const OuathBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  width: 90%;
  height: 54px;
  border-radius: 10px;
  border: 1px;
  border-color: ${({ theme }) => theme.mainOrange};
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View`
  position: absolute;
  left: 15px;
  border-right-width: 1px;
  padding-right: 10px;
  border-color: ${({ theme }) => theme.label};
`;

const OuathText = styled.Text`
  color: ${({ theme }) => theme.mainOrange};
  font-weight: bold;
`;

const LoginQuestionBtn = ({ navigation, isReady, onPress, disabled }) => {
  return (
    <Container>
      <Button title={t.print("Login")} onPress={onPress} disabled={disabled} />
      <Button
        title={t.print("SignUp")}
        onPress={() => navigation.navigate("SchoolSelectPage")}
      />
      <OuathBtn>
        <Icon>
          <View>
            <Image source={require("../../icons/google.png")} />
          </View>
        </Icon>
        <OuathText>{t.print("ContinueWithGoogle")}</OuathText>
      </OuathBtn>
      <OuathBtn>
        <Icon>
          <View>
            <Image source={require("../../icons/kakao.png")} />
          </View>
        </Icon>
        <OuathText>{t.print("ContinueWithKakao")}</OuathText>
      </OuathBtn>
    </Container>
  );
};

export default LoginQuestionBtn;
