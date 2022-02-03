import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import { FlatList } from "react-native-gesture-handler";

import ReviewList from "./ReviewList";
import t from "../../../utils/translate/Translator";

const NUMCOLUMNS = 1;
const INITIAL_START_NO = 0;

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

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  margin: 6px 0 0px 20px;
  color: ${({ theme }) => theme.placeholder};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Review = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(t.print("WrittenReview"));
  const [reviews, setReviews] = useState([]);
  const [userNo, setUserNo] = useState("");
  const [isSeller, setIsSeller] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [reviewsLength, setReviewLength] = useState(0);

  const listBtn = [
    { status: t.print("WrittenReview") },
    { status: t.print("ReceivedReview") },
    { status: t.print("NotWrittenReview") },
    { status: t.print("NotReceivedReview") },
  ];

  useEffect(() => {
    _setReviewsByFetch();
  }, [status, isLoading]);

  function selectCurrentReviewList() {
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

  const _setReviewsByFetch = async () => {
    const id = await getItemFromAsync("userNo");
    setUserNo(id);
    try {
      if (status === t.print("WrittenReview")) {
        const response = await fetch(`${API_URL}/api/review/${id}/writer`).then(
          (res) => res.json()
        );
        setReviewLength(response.writedReviews.length);
        setReviews([...response.writedReviews]);
        console.log(response.writedReviews);
      } else if (status === t.print("ReceivedReview")) {
        const response = await fetch(
          `${API_URL}/api/review/${id}/receiver`
        ).then((res) => res.json());
        setReviewLength(response.receivedReviews.length);
        setReviews([...response.receivedReviews]);
      } else if (status === t.print("NotWrittenReview")) {
        const response = await fetch(`${API_URL}/api/review/${id}/buyer`).then(
          (res) => res.json()
        );
        setIsSeller(false);
        setReviewLength(response.productList.length);
        setReviews([...response.productList]);
      } else {
        const response = await fetch(`${API_URL}/api/review/${id}/seller`).then(
          (res) => res.json()
        );
        setReviewLength(response.productList.length);
        setReviews([...response.productList]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(true);
    }
  };

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const formatData = (reviews, NUMCOLUMNS) => {
    const totalRows = Math.floor(reviews.length / NUMCOLUMNS);
    let totalLastRow = reviews.length - totalRows * NUMCOLUMNS;
    while (totalLastRow !== 0 && totalLastRow !== NUMCOLUMNS) {
      reviews.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return reviews;
  };

  const checkReviewsEmpty = () => {
    if (reviews.length) {
      if (reviewsLength === 20) {
        return (
          <FlatList
            keyExtractor={(reviews, index) => index.toString()}
            data={formatData(reviews, NUMCOLUMNS)}
            renderItem={({ item }) => (
              <ReviewList
                reviews={item}
                navigation={navigation}
                userNo={userNo}
                isSeller={isSeller}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            )}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refreshing}
            //     onRefresh={() => onRefresh()}
            //   />
            // }
            // onEndReached={_handleLoadMore}
            // onEndReachedThreshold={1}
            // ListFooterComponent={renderLoader}
          />
        );
      } else {
        return (
          <FlatList
            keyExtractor={(reviews, index) => index.toString()}
            data={formatData(reviews, NUMCOLUMNS)}
            renderItem={({ item }) => (
              <ReviewList
                reviews={item}
                navigation={navigation}
                userNo={userNo}
                isSeller={isSeller}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            )}
          />
        );
      }
    } else {
      return <Text>리뷰 목록이 없습니다.</Text>;
    }
  };

  return (
    <Container>
      <ScrollHorizontalView>
        <>{selectCurrentReviewList()}</>
      </ScrollHorizontalView>

      <ScrollView style={{ width: "100%" }}>
        {isLoading ? (
          <>{checkReviewsEmpty()}</>
        ) : (
          <ActivityIndicatorContainer color="#999999" />
        )}
      </ScrollView>
    </Container>
  );
};

export default Review;
