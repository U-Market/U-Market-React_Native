import React, { useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

import FindPw from "../../components/auth/FindPw";
import Header from "../../components/commons/Header";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
`;

function FindPage({ navigation }) {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("FindPassword")}
      />

      <FindPw navigation={navigation} />
    </Container>
  );
}

export default FindPage;
