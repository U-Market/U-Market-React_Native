import React from "react";
import styled from "styled-components/native";

import RelatedItem from "./RelatedItem";
import t from "../../../../utils/translate/Translator";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-left: 20px;
  padding-bottom: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.subTitle};
`;

const ItemList = ({ relatedProducts, navigation }) => {
  const _RelatedItems = () => {
    const Items = relatedProducts.map((relatedProduct) => {
      const pressItem = () => {
        navigation.push("MarketDetailPage", {
          productNo: relatedProduct.no,
        });
      };
      return (
        <RelatedItem
          key={relatedProduct.no}
          imgUrl={relatedProduct.thumbnail}
          onPress={pressItem}
          itemTitle={relatedProduct.title}
          price={relatedProduct.price}
          commentCount={relatedProduct.commentCnt}
          wish={relatedProduct.interestCnt}
          navigation={navigation}
        />
      );
    });
    if (Items.length === 0)
      return <Text>{t.print("ThereAreNoRelatedProducts")}</Text>;
    return Items;
  };

  return <ScrollView>{_RelatedItems()}</ScrollView>;
};

export default ItemList;
