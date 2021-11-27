import React from "react";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import t from "../../../utills/translate/Translator";

const Container = styled.TouchableOpacity`
  width: 31%;
  padding-bottom: 10px;
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
`;

const ItemPrice = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0 0 0px;
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

const Item = ({
  productNo,
  imgUrl,
  itemTitle,
  price,
  commentCount,
  wish,
  navigation,
}) => {
  const _handleItemPress = () =>
    navigation.navigate("MarketDetailPage", {
      productNo: productNo,
    });
  return (
    <Container onPress={_handleItemPress}>
      <StyledImage source={{ uri: imgUrl }}></StyledImage>
      <ItemContent>
        <ItemPrice>{`${price} ${t.print("Won")}`}</ItemPrice>
      </ItemContent>
      <ItemTitle>{itemTitle}</ItemTitle>
      <ItemContent>
        <Wish>{wish}</Wish>
        <FontAwesome name="heart" size={14} color="pink" />
      </ItemContent>
    </Container>
  );
};

export default Item;
