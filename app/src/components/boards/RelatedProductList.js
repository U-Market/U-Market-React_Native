import React from "react";
import styled from "styled-components/native";

import RelatedItem from "./RelatedItem";
import t from "../../utills/translate/Translator";

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

const ItemList = ({ onPress, relatedProducts, navigation }) => {
  const _RelatedItems = () => {
    const Items = relatedProducts.map((relatedProduct) => {
      return (
        <RelatedItem
          key={relatedProduct.no}
          onPress={onPress}
          imgUrl={relatedProduct.thumbnail}
          itemTitle={relatedProduct.title}
          price={relatedProduct.price}
          commentCount={relatedProduct.commentCnt}
          wish={relatedProduct.interestCnt}
          productNo={relatedProduct.no}
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
