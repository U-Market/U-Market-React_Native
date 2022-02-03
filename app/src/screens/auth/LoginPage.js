import React from "react";
import styled from "styled-components/native";

import { ScrollView } from "react-native";

import Login from "../../components/auth/Login";
import Header from "../../components/commons/Header";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const LoginPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.replace("LoginQuestion")}
        title={t.print("Login")}
      />
      <ScrollView scrollEnabled={false}>
        <Login navigation={navigation} />
      </ScrollView>
    </Container>
  );
};

export default LoginPage;
