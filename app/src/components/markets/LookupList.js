import React, { useState, useEffect, useContext } from "react";
import { Alert, View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import LookupItem from "./LookupItem";
import t from "../../utills/translate/Translator";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  margin: 6px 0 0px 4px;
  color: ${({ theme }) => theme.placeholder};
`;

const ItemList = ({ navigation, products }) => {
  const _lookupItems = () => {
    const Items = products.map((product) => {
      const moveMarketDetailPage = () => {
        navigation.navigate("MarketDetailPage", {
          productNo: product.no,
        });
      };

      return (
        <LookupItem
          key={product.no}
          onPress={moveMarketDetailPage}
          imgUrl={product.thumbnail}
          itemTitle={product.title}
          price={product.price}
          commentCount={product.commentCnt}
          wish={product.interestCnt}
        />
      );
    });

    if (!Items.length)
      return <Text>{t.print("ThereAreNoSecondHandProducts")}</Text>;
    return Items;
  };

  useEffect(() => {}, []);

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
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
