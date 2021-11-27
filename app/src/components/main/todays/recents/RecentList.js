import React from "react";
import styled from "styled-components/native";

import RecentItem from "./RecentItem";
import t from "../../../../utills/translate/Translator";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))`
  flex: 1;
  width: 100%;
  margin-top: 10px;
`;

const RecentGridView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-horizontal: 16px;
  padding-top: 10px;
  justify-content: space-between;
  padding-bottom: 80px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  margin-left: 4px;
  color: ${({ theme }) => theme.placeholder};
`;

const ItemList = ({ onPress, newProducts, navigation }) => {
  const isEmpty = !Boolean(newProducts.length);

  const _recentItems = () => {
    const Items = newProducts.map((newProduct) => {
      return (
        <RecentItem
          key={newProduct.no}
          onPress={onPress}
          imgUrl={newProduct.thumbnail}
          itemTitle={newProduct.title}
          price={newProduct.price}
          commentCount={newProduct.commentCnt}
          wish={newProduct.interestCnt}
          productNo={newProduct.no}
          navigation={navigation}
        />
      );
    });

    if (isEmpty)
      return (
        <>
          <Text>{t.print("ThereAreNoSecondHandProducts")}</Text>
          <Text style={{ opacity: 0 }}>
            {t.print("ThereAreNoSecondHandProducts")}
          </Text>
        </>
      );

    return Items;
  };

  return (
    <ScrollView>
      <RecentGridView>{_recentItems()}</RecentGridView>
    </ScrollView>
  );
};

export default ItemList;
