import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";

import { API_URL, FIREBASE_API_KEY } from "@env";

import { ProgressContext } from "../../contexts";
import Header from "../../components/commons/Header";
import ReviewWrite from "../../components/reviews/ReviewWrite";
import { getItemFromAsync } from "../../utils/AsyncStorage";

import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const ReviewWritePage = ({ navigation, route }) => {
  const [description, setDescription] = useState("");
  const [userNo, setUserNo] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [rating, setRating] = useState(3);

  const {
    productNo,
    writer,
    buyerNo,
    sellerNo,
    thumbnail,
    category,
    nickname,
    title,
    isSeller,
    setIsLoading,
    buyerToken,
    isLoading,
  } = route?.params;

  const handelRating = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    setDisabled(!description);
  }, [description]);

  const postBuyerReview = async () => {
    try {
      setIsLoading(false);
      const id = await getItemFromAsync("userNo");
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productNo: productNo,
          sellerNo: sellerNo,
          buyerNo: Number(id),
          description: description,
          trustScore: rating,
          writer: writer,
        }),
      };

      const response = await fetch(`${API_URL}/api/review`, config).then(
        (res) => res.json()
      );

      setUserNo(id);
      sendPushReviewNotification(buyerToken);
    } catch (e) {
      Alert.alert("실패", e.message);
    }

    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trustScore: rating,
        }),
      };

      const response = await fetch(
        `${API_URL}/api/review/${Number(userNo)}`,
        config
      ).then((res) => res.json());

      navigation.navigate("ReviewManagementPage");
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      setIsLoading(true);
    }
  };

  const postSellerReview = async () => {
    try {
      setIsLoading(false);

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productNo: productNo,
          sellerNo: sellerNo,
          buyerNo: buyerNo,
          description: description,
          trustScore: rating,
          writer: writer,
        }),
      };

      const response = await fetch(`${API_URL}/api/review`, config).then(
        (res) => res.json()
      );
      sendPushReviewNotification(buyerToken);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
    }

    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trustScore: rating,
        }),
      };

      const response = await fetch(
        `${API_URL}/api/review/${buyerNo}`,
        config
      ).then((res) => res.json());

      navigation.navigate("ReviewManagementPage");
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function sendPushReviewNotification(buyerToken) {
    const nickname = await getItemFromAsync("nickname");

    const message = {
      to: buyerToken,
      notification: {
        title: `${nickname}님이 리뷰를 남기셨습니다`,
        body: ``,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `${nickname}님이 리뷰를 남기셨습니다`,
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

  return isLoading ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("후기 작성")}
      />

      {isSeller ? (
        <ReviewWrite
          navigation={navigation}
          setDescription={setDescription}
          thumbnail={thumbnail}
          category={category}
          nickname={nickname}
          title={title}
          rating={rating}
          handelRating={handelRating}
          onPress={postSellerReview}
          isSeller={isSeller}
          disabled={disabled}
        />
      ) : (
        <ReviewWrite
          navigation={navigation}
          setDescription={setDescription}
          thumbnail={thumbnail}
          category={category}
          nickname={nickname}
          rating={rating}
          title={title}
          handelRating={handelRating}
          onPress={postBuyerReview}
          isSeller={isSeller}
          disabled={disabled}
        />
      )}
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default ReviewWritePage;
