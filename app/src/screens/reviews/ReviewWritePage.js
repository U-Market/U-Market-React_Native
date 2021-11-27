import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";

import { API_URL } from "@env";

import { ReadyContext, ProgressContext } from "../../contexts";
import Header from "../../components/commons/Header";
import ReviewWrite from "../../components/reviews/ReviewWrite";
import { getItemFromAsync } from "../../utills/AsyncStorage";

import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ReviewWritePage = ({ navigation, route }) => {
  const [description, setDescription] = useState("");
  const [userNo, setUserNo] = useState("");

  const [rating, setRating] = useState(3);

  const { spinner } = useContext(ProgressContext);

  const {
    productNo,
    writer,
    buyerNo,
    sellerNo,
    profileUrl,
    thumbnail,
    category,
    nickname,
    title,
    isSeller,
    setIsReady,
  } = route?.params;

  const handelRating = (rating) => {
    setRating(rating);
  };

  const postBuyerReview = async () => {
    try {
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
    } catch (e) {
      Alert.alert("실패", e.message);
    }

    try {
      spinner.start();

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

      setIsReady(false);
      navigation.navigate("ReviewManagementPage");
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  const postSellerReview = async () => {
    try {
      spinner.start();

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
      console.log(response);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }

    try {
      spinner.start();

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
      setIsReady(false);
      navigation.navigate("ReviewManagementPage");
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
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
        />
      )}
    </Container>
  );
};

export default ReviewWritePage;
