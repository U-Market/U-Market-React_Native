import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Image, View, Alert } from "react-native";

import t from "../../utills/translate/Translator";

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  margin-top: 20px;
`;

const Icon = styled.TouchableOpacity`
  width: 33%;
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.Text`
  margin-bottom: 10px;
`;

const MyRelated = ({ iconSize, navigation }) => {
  const theme = useContext(ThemeContext);

  const _handleMyPost = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const _handleQnA = async () => {
    navigation.navigate("FreeBoardPage", {
      categoryNo: 4,
      headerTitle: t.print("QNA"),
    });
  };

  const _handleBookmarks = async () => {
    navigation.navigate("BookmarkPage", {
      headerTitle: t.print("Bookmark"),
    });
  };

  return (
    <Container>
      <Icon onPress={_handleMyPost}>
        <View>
          <Image source={require("../../icons/community/myPost.png")} />
        </View>
        <Text>{t.print("WhatIWrote")}</Text>
      </Icon>
      <Icon onPress={_handleQnA}>
        <View>
          <Image source={require("../../icons/community/question.png")} />
        </View>
        <Text>{t.print("QNA")}</Text>
      </Icon>
      <Icon onPress={_handleBookmarks}>
        <View>
          <Image source={require("../../icons/community/star.png")} />
        </View>
        <Text>{t.print("Bookmark")}</Text>
      </Icon>
    </Container>
  );
};

export default MyRelated;
