import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, Image } from "react-native";
import { API_URL, FIREBASE_API_KEY } from "@env";

import t from "../../utils/translate/Translator";

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

const BuyList = ({
  navigation,
  buyerList,
  productNo,
  userNo,
  isSeller,
  isLoading,
  setIsLoading,
}) => {
  const [buyerSelectToken, setBuyerSelectToken] = useState("");

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/notification/token/${buyerList.userNo}`,
        config
      ).then((res) => res.json());

      setBuyerSelectToken(response[0].token);
    } catch (e) {
      console.log(e);
    }
  };

  const moveReviewWritePage = async () => {
    let buyerToken;
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
      sendPushBuyerSelectNotification(buyerSelectToken);
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
        setIsLoading: setIsLoading,
        isLoading: isLoading,
        buyerToken: buyerToken,
      });
    } catch (e) {
      Alert.alert(t.print("BuyerRegistrationFailed"), e.message);
    }
  };

  async function sendPushBuyerSelectNotification(buyerSelectToken) {
    const message = {
      to: buyerSelectToken,
      notification: {
        title: `거래완료된 상품이 있습니다. 리뷰를 작성해주세요`,
        body: ``,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `거래완료된 상품이 있습니다. 리뷰를 작성해주세요`,
        body: ``,
        score: 50,
        wicket: 1,
      },
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `key=${FIREBASE_API_KEY}`,
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    response = await response.json();
  }

  return (
    <>
      <Container onPress={moveReviewWritePage}>
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
