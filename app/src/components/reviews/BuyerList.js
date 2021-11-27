import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Alert,
  Text,
  Image,
  Modal,
  View,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "@env";
import t from "../../utills/translate/Translator";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  height: 90px;
  justify-content: flex-start;
  align-items: center;
`;

const Icon = styled.View`
  padding: 5px;
`;

const TextContainer = styled.View`
  height: 100%;
  justify-content: center;
  padding-left: 5px;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

const ModalRowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const ModalTextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
`;

const BuyList = ({
  navigation,
  buyerList,
  productNo,
  userNo,
  isSeller,
  setIsReady,
}) => {
  const handleBuyerListSelectPage = async () => {
    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 3,
        }),
      };
      const response = await fetch(
        `${API_URL}/api/products/${productNo}/status`,
        config
      ).then((res) => res.json());
    } catch (e) {
      Alert.alert(t.print("StateTransitionFailed"), e.message);
    }
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productNo: productNo,
        }),
      };
      const response = await fetch(
        `${API_URL}/api/review/${buyerList.userNo}`,
        config
      ).then((res) => res.json());

      navigation.navigate("ReviewWritePage", {
        productNo: productNo,
        sellerNo: userNo,
        buyerNo: buyerList.userNo,
        profileUrl: buyerList.profileUrl,
        thumbnail: buyerList.thumbnail,
        category: buyerList.category,
        nickname: buyerList.nickname,
        title: buyerList.title,
        isSeller: isSeller,
        writer: 0,
        setIsReady: setIsReady,
      });
    } catch (e) {
      Alert.alert(t.print("BuyerRegistrationFailed"), e.message);
    }
  };

  return (
    <>
      <Container onPress={handleBuyerListSelectPage}>
        <Icon>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#e3e3e3",
            }}
            source={{ uri: buyerList.profileUrl }}
          />
        </Icon>
        <TextContainer>
          {t.getLanguage() === "ko" ? (
            <Title>{`${buyerList.nickname}${t.print(
              "writeReviewToggle"
            )}`}</Title>
          ) : (
            <Title>{`${t.print("writeReviewToggle")} ${
              buyerList.nickname
            }`}</Title>
          )}
          <Content>{`${t.print("Title")}: ${buyerList.title}`}</Content>
        </TextContainer>
      </Container>
    </>
  );
};

export default BuyList;
