import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import PriceItem from "./PriceItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const ItemList = ({ navigation, products }) => {
  const _priceItem = () => {
    return (
      <PriceItem
        key={products.no}
        products={products}
        navigation={navigation}
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
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: "space-between",
  },
});
