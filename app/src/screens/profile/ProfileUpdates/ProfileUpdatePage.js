import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../../contexts";
import Header from "../../../components/commons/Header";
import t from "../../../utills/translate/Translator";

import ProfileUpdate from "../../../components/profiles/ProfileUpdates/ProfileUpdate";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ProfileUpdatePage = ({ navigation, route }) => {
  const { setIsReady } = route.params;
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("Account")}
      />
      <ProfileUpdate navigation={navigation} setIsReady={setIsReady} />
    </Container>
  );
};

export default ProfileUpdatePage;
