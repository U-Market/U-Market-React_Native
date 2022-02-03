import React from "react";
import styled from "styled-components/native";

import { Feather } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  width: 95%;
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  height: 50px;
`;

const RecentSearchTouch = styled.TouchableOpacity`
  padding: 10px;
`;
const RecentSearch = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text2};
`;
const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  padding: 10px;
`;

const RecentSearchList = ({ product, deleteSearchListBtn, onPress }) => {
  return (
    <Container>
      <RecentSearchTouch onPress={onPress}>
        <RecentSearch>{product.replace(/\+/g, " ")}</RecentSearch>
      </RecentSearchTouch>
      <Icon onPress={() => deleteSearchListBtn(product)}>
        <Feather name="x" size={20} color="#e3e3e3" />
      </Icon>
    </Container>
  );
};

export default RecentSearchList;
