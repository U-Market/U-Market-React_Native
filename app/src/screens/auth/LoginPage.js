import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";

import Login from "../../components/auth/Login";
import Header from "../../components/commons/Header";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const LoginPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("Login")}
      />
      <Login navigation={navigation} />
    </Container>
  );
};

export default LoginPage;
