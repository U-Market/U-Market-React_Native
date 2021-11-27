import React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
  flex: 1;
  margin-right: 20px;
  width: 120px;
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

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  margin: 0px 0 0px 3px;
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 3px 0 0 0px;
`;

const ItemPrice = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0 0 0px;
`;

const Wish = styled.Text`
  font-size: 14px;
  padding-left: 3px;
  padding-right: 5px;
  color: ${({ theme }) => theme.greytext};
`;

const Item = ({ imgUrl, itemTitle, price, productNo, wish, navigation }) => {
  const _handleItemPress = () => {
    console.log(productNo);
    navigation.replace("MarketDetailPage", {
      productNo: productNo,
    });
  };
  return (
    <Container onPress={_handleItemPress}>
      <StyledImage source={{ uri: imgUrl }} />
      <ItemPrice>{price}</ItemPrice>
      <ItemTitle>{itemTitle}</ItemTitle>

      <ItemContent>
        <Wish>{wish}</Wish>
        <FontAwesome name="heart" size={14} color="pink" />
      </ItemContent>
    </Container>
  );
};

export default Item;
