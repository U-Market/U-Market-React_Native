import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import TransactionItem from "./TransactionItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const ItemList = ({
  navigation,
  reviews,
  userNo,
  isSeller,
  setIsLoading,
  isLoading,
}) => {
  const transactionsItem = () => {
    const Items = reviews.map((review) => {
      return (
        <TransactionItem
          key={review.no}
          imgUrl={review.thumbnail}
          itemTitle={review.title}
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
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
    });

    return Items;
  };

  return (
    <ScrollView>
      <View style={styles.stylegridView}>{transactionsItem()}</View>
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
