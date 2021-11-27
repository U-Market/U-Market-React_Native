import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import Auth from "../../components/auth/Auth";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const AuthPage = ({ navigation, route }) => {
  const { selectedFilterData } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"학생 인증"}
      />
      <Auth navigation={navigation} selectedFilterData={selectedFilterData} />
    </Container>
  );
};

export default AuthPage;
