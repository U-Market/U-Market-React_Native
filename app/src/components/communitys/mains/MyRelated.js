import React from "react";
import styled from "styled-components/native";
import { Image, View, Alert } from "react-native";

import t from "../../../utils/translate/Translator";

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

const MyRelated = ({ navigation }) => {
  const moveMyPostPage = async () => {
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  const moveQnAPage = async () => {
    navigation.navigate("FreeBoardPage", {
      categoryNo: 4,
      headerTitle: t.print("QNA"),
    });
  };

  const moveBookmaPagerks = async () => {
    navigation.navigate("BookmarkPage", {
      headerTitle: t.print("Bookmark"),
    });
  };

  return (
    <Container>
      <Icon onPress={moveMyPostPage}>
        <View>
          <Image source={require("../../../icons/community/myPost.png")} />
        </View>
        <Text>{t.print("WhatIWrote")}</Text>
      </Icon>
      <Icon onPress={moveQnAPage}>
        <View>
          <Image source={require("../../../icons/community/question.png")} />
        </View>
        <Text>{t.print("QNA")}</Text>
      </Icon>
      <Icon onPress={moveBookmaPagerks}>
        <View>
          <Image source={require("../../../icons/community/star.png")} />
        </View>
        <Text>{t.print("Bookmark")}</Text>
      </Icon>
    </Container>
  );
};

export default MyRelated;
