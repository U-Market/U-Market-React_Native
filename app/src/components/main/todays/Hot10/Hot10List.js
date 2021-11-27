import React from "react";
import styled from "styled-components/native";

import Hot10Item from "./Hot10Item";
import t from "../../../../utills/translate/Translator";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  margin-top: 10px;
  padding-right: 20px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.placeholder};
`;

const ItemList = ({ onPress, hotProducts, navigation }) => {
  const isEmpty = !Boolean(hotProducts.length);

  const _hot10Items = () => {
    const Items = hotProducts.map((hotProduct) => {
      return (
        <Hot10Item
          key={hotProduct.no}
          onPress={onPress}
          imgUrl={hotProduct.thumbnail}
          itemTitle={hotProduct.title}
          price={hotProduct.price}
          commentCount={hotProduct.commentCnt}
          wish={hotProduct.interestCnt}
          productNo={hotProduct.no}
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

  return <ScrollView>{_hot10Items()}</ScrollView>;
};

export default ItemList;
