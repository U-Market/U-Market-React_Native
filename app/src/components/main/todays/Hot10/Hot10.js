import React from "react";
import styled from "styled-components/native";

import Hot10List from "./Hot10List";
import t from "../../../../utils/translate/Translator";

const Container = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: ROBOTO_BOLD;
`;

const SubTitle = styled.Text`
  font-size: 13px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.subTitle};
`;

const Hot10 = ({ navigation, hotProducts }) => {
  const _handleItemPress = () => {
    navigation.navigate("CategoryDetailPage");
  };

  return (
    <Container>
      <Title>HOT 10</Title>
      <SubTitle>{t.print("RealTimePopularProducts")}</SubTitle>
      <Hot10List
        onPress={_handleItemPress}
        hotProducts={hotProducts}
        navigation={navigation}
      />
    </Container>
  );
};

export default Hot10;
