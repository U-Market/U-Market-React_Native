import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";

import PriceItem from "./PriceItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const ItemList = ({ navigation, products }) => {
  const _priceItem = () => {
    const Items = products.map((product) => {
      return (
        <PriceItem
          key={product.no}
          imgUrl={product.thumbnail}
          itemTitle={product.title}
          price={product.price}
          commentCount={product.commentCnt}
          wish={product.interestCnt}
          productNo={product.no}
          navigation={navigation}
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
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
