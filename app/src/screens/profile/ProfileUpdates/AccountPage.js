import React from "react";
import styled from "styled-components/native";

import Header from "../../../components/commons/Header";
import t from "../../../utils/translate/Translator";

import ProfileUpdate from "../../../components/profiles/ProfileUpdates/Account";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const AccountPage = ({ navigation, route }) => {
  const { setIsLoading } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("Account")}
      />
      <ProfileUpdate navigation={navigation} setIsLoading={setIsLoading} />
    </Container>
  );
};

export default AccountPage;
