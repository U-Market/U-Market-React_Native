import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

import t from "../../../utils/translate/Translator";

const Container = styled.Pressable`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 5px 12px 5px 12px;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 200px;
  width: 100%;
  border-radius: 6px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text2};
`;

const ItemContent = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 3px 0px 0px 3px;
`;

const ItemPrice = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  margin: 3px 0px 0px 3px;
  font-size: 18px;
  font-family: ROBOTO_BOLD;
`;

const Wish = styled.Text`
  font-size: 14px;
  margin: 0px 5px 0px 3px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.inputPlaceholder};
`;

const BlankContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 10px;
  border-radius: 5px;
`;

const Item = ({ onPress, product }) => {
  const conversionPrice = () => {
    if (product !== undefined)
      return product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product.empty) {
    return (
      <Container onPress={onPress}>
        <StyledImage source={{ uri: product.thumbnail }} />
        <ItemContent>
          <ItemPrice>{`${conversionPrice()}${t.print("Won")}`}</ItemPrice>
        </ItemContent>
        <ItemTitle>{product.title}</ItemTitle>
        <ItemContent>
          <Wish>{product.interestCnt}</Wish>
          <FontAwesome name="heart" size={14} color="pink" />
        </ItemContent>
      </Container>
    );
  } else return <BlankContainer />;
};

export default Item;
