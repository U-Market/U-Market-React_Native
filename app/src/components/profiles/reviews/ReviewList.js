import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";

import ReviewItem from "./ReviewItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const ItemList = ({ navigation, reviews, userNo, isSeller, setIsReady }) => {
  console.log(reviews, "review");
  const _priceItem = () => {
    const Items = reviews.map((review) => {
      return (
        <ReviewItem
          key={review.no}
          imgUrl={review.thumbnail}
          itemTitle={review.title}
          trustScore={review.trustScore}
          nickname={review.nickname}
          inDate={review.inDate}
          rating={review.trustScore}
          description={review.description}
          productNo={review.no}
          category={review.category}
          userNo={userNo}
          sellerNo={review.sellerNo}
          buyerNo={review.buyerNo}
          navigation={navigation}
          isSeller={isSeller}
          setIsReady={setIsReady}
        />
      );
    });

    return Items;
  };

  return (
    <ScrollView>
      <View style={styles.stylegridView}>{_priceItem()}</View>
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    // paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
