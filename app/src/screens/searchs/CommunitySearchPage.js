import React from "react";
import styled from "styled-components/native";

import Header from "../../components/commons/Header";
import CommunitySearch from "../../components/searchs/CommunitySearch";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const CommunitySelectPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={t.print("CommunitySearch")}
      />
      <CommunitySearch navigation={navigation} />
    </Container>
  );
};

export default CommunitySelectPage;
