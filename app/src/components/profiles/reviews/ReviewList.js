import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import ReviewItem from "./ReviewItem";

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
  const _priceItem = () => {
    return (
      <ReviewItem
        key={reviews.no}
        review={reviews}
        navigation={navigation}
        isSeller={isSeller}
        isLoading={isLoading}
        userNo={userNo}
        setIsLoading={setIsLoading}
      />
    );
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
    paddingTop: 10,
    justifyContent: "space-between",
  },
});
