import React from "react";
import styled from "styled-components/native";

import RecentList from "./RecentList";
import t from "../../../../utils/translate/Translator";

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
`;

const Title = styled.Text`
  font-size: 19px;
  font-family: ROBOTO_BOLD;
  padding-left: 20px;
`;

const SubTitle = styled.Text`
  font-size: 13px;
  font-family: ROBOTO_REGULAR;
  padding-left: 20px;
  color: ${({ theme }) => theme.subTitle};
`;

const Recent = ({ navigation, newProducts }) => {
  return (
    <Container>
      <Title>{t.print("NewProducts")}</Title>
      <SubTitle>{t.print("RealTimeNewProducts")}</SubTitle>
      <RecentList newProducts={newProducts} navigation={navigation} />
    </Container>
  );
};

export default Recent;
