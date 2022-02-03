import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import LookupItem from "./LookupItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const ItemList = ({ navigation, products }) => {
  const _lookupItems = () => {
    const moveMarketDetailPage = () => {
      navigation.navigate("MarketDetailPage", {
        productNo: products.no,
      });
    };

    return (
      <LookupItem
        key={products.no}
        onPress={moveMarketDetailPage}
        product={products}
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.stylegridView}>{_lookupItems()}</View>
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
