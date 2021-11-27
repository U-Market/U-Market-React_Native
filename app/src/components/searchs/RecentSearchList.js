import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert, View } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";
import { Feather } from "@expo/vector-icons";

import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  width: 90%;
  flex-direction: row;
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
  right: 10px;
`;

const RecentSearchList = ({
  navigation,
  product,
  deleteSearchListBtn,
  onPress,
}) => {
  return (
    <Container>
      <RecentSearchTouch onPress={onPress}>
        <RecentSearch>{product}</RecentSearch>
      </RecentSearchTouch>
      <Icon onPress={() => deleteSearchListBtn(product)}>
        <Feather name="x" size={20} color="#e3e3e3" />
      </Icon>
    </Container>
  );
};

export default RecentSearchList;
