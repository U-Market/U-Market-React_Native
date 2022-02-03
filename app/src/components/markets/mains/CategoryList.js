import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import LookupItem from "./LookupItem";
import t from "../../../utils/translate/Translator";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  margin: 6px 0 0px 4px;
  color: ${({ theme }) => theme.placeholder};
`;

const ItemList = ({ navigation, products, searchList, setIsReady }) => {
  const _lookupItems = () => {
    if (products.length) {
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
    } else if (searchList) {
      if (!searchList.length) return <Text>{t.print("NoItemsWerefound")}</Text>;

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
    }
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
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
