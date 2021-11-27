import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utills/AsyncStorage";

import ReviewList from "./ReviewList";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
`;

const ScrollHorizontalView = styled.ScrollView.attrs({
  horizontal: true,
})`
  flex-direction: row;
  align-self: flex-start;
  height: 50px;
  width: 100%;
  max-height: 50px;
  background-color: ${({ theme }) => theme.background};
`;

const TopBarText = styled.Text`
  height: 100%;
  margin: 14px 0px 0px 20px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "300")};
  color: ${({ theme, isActive }) => (isActive ? theme.mainOrange : theme.text)};
`;

const Review = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(t.print("WrittenReview"));
  const [reviews, setReviews] = useState([]);
  const [userNo, setUserNo] = useState("");
  const [isSeller, setIsSeller] = useState(true);

  const listBtn = [
    { status: t.print("WrittenReview") },
    { status: t.print("ReceivedReview") },
    { status: t.print("NotWrittenReview") },
    { status: t.print("NotReceivedReview") },
  ];

  function _handleCurrentBtn() {
    return listBtn.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          onPress={() => {
            setStatusFilter(_menu.status);
          }}
        >
          <TopBarText isActive={status === _menu.status}>
            {_menu.status}
          </TopBarText>
        </TouchableOpacity>
      );
    });
  }

  async function _setProductsByFetch() {
    const id = await getItemFromAsync("userNo");

    setUserNo(id);
    if (status === t.print("WrittenReview")) {
      const response = await fetch(`${API_URL}/api/review/${id}/writer`).then(
        (res) => res.json()
      );

      setReviews([...response.writedReviews]);
    } else if (status === t.print("ReceivedReview")) {
      const response = await fetch(`${API_URL}/api/review/${id}/receiver`).then(
        (res) => res.json()
      );

      setReviews([...response.receivedReviews]);
    } else if (status === t.print("NotWrittenReview")) {
      const response = await fetch(`${API_URL}/api/review/${id}/buyer`).then(
        (res) => res.json()
      );
      setIsSeller(false);
      setReviews([...response.productList]);
    } else {
      const response = await fetch(`${API_URL}/api/review/${id}/seller`).then(
        (res) => res.json()
      );

      setReviews([...response.productList]);
    }
  }

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    setIsReady(false);
  }, [status]);

  return isReady ? (
    <Container>
      <ScrollHorizontalView>
        <>{_handleCurrentBtn()}</>
      </ScrollHorizontalView>

      <ScrollView style={{ width: "100%" }}>
        <ReviewList
          navigation={navigation}
          reviews={reviews}
          userNo={userNo}
          isSeller={isSeller}
          setIsReady={setIsReady}
        />
      </ScrollView>
    </Container>
  ) : (
    <AppLoading
      startAsync={_setProductsByFetch}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default Review;
