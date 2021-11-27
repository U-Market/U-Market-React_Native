import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

import t from "../../../utills/translate/Translator";

const ItemContainer = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  height: 70px;
  border-bottom-width: 1px;
  flex-direction: row;
  border-bottom-color: ${({ theme }) => theme.label};
  width: 90%;
  padding-left: 15px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  padding-left: 10px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const CommunityCategorySelect = ({ navigation }) => {
  return (
    <>
      <ItemContainer
        onPress={() =>
          navigation.navigate("CommunityWritePage", {
            category: { no: 1, name: `${t.print("ForFree")}` },
          })
        }
      >
        <Image source={require("../../../icons/community/free.png")} />
        <ItemTitle>{t.print("ForFree")}</ItemTitle>
      </ItemContainer>
      <ItemContainer
        onPress={() =>
          navigation.navigate("CommunityWritePage", {
            category: { no: 2, name: `${t.print("ForLivingAlone")}` },
          })
        }
      >
        <Image source={require("../../../icons/community/alone.png")} />
        <ItemTitle>{t.print("ForLivingAlone")}</ItemTitle>
      </ItemContainer>
      <ItemContainer
        onPress={() =>
          navigation.navigate("CommunityWritePage", {
            category: { no: 3, name: `${t.print("ForPromotion")}` },
          })
        }
      >
        <Image source={require("../../../icons/community/promotion.png")} />
        <ItemTitle>{t.print("ForPromotion")}</ItemTitle>
      </ItemContainer>
      <ItemContainer
        onPress={() =>
          navigation.navigate("CommunityWritePage", {
            category: { no: 4, name: `${t.print("QNA")}` },
          })
        }
      >
        <Image source={require("../../../icons/community/question.png")} />
        <ItemTitle>{t.print("QNA")}</ItemTitle>
      </ItemContainer>
    </>
  );
};

export default CommunityCategorySelect;
