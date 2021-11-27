import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../contexts";
import SignUp from "../../components/auth/SignUp";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const SignUpPage = ({ navigation, route }) => {
  const { name, selectedFilterData } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"회원가입"}
      />

      <SignUp
        navigation={navigation}
        name={name}
        selectedFilterData={selectedFilterData}
      />
    </Container>
  );
};

export default SignUpPage;
