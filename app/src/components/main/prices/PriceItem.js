import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

import t from "../../../utils/translate/Translator";

const Container = styled.TouchableOpacity`
  width: 100%;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 140px;
  width: 100%;
  border-radius: 6px;
  border-width: 1px;
  border-color: gray;
`;

const ItemTitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
  margin-left: 3px;
`;

const ItemPrice = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0 0 3px;
  color: ${({ theme }) => theme.text};
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Wish = styled.Text`
  color: ${({ theme }) => theme.greytext};
  padding: 0px 10px 0px 0px;
`;

const Item = ({ products, navigation }) => {
  const moveProductDetailPage = () =>
    navigation.navigate("MarketDetailPage", {
      productNo: products.no,
    });

  const conversionPrice = () => {
    if (products !== undefined)
      return products?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container onPress={moveProductDetailPage}>
      <StyledImage source={{ uri: products.thumbnail }}></StyledImage>

      <ItemContent>
        <ItemPrice>{`${conversionPrice()} ${t.print("Won")}`}</ItemPrice>
      </ItemContent>
      <ItemTitle>{products.title}</ItemTitle>

      <ItemContent>
        <Wish>{products.interestCnt}</Wish>
        <FontAwesome name="heart" size={14} color="pink" />
      </ItemContent>
    </Container>
  );
};

export default Item;
