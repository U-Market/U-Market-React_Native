import React from "react";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import t from "../../../../utills/translate/Translator";

const Container = styled.TouchableOpacity`
  width: 48%;
  margin-bottom: 20px;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 200px;
  width: 100%;
  border-radius: 6px;
  border-width: 0.9px;
  border-color: ${({ theme }) => theme.greyBottomLine};
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  margin-left: 3px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text2};
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
  margin: 3px 0px 0px 3px;
  font-size: 18px;
  font-family: ROBOTO_BOLD;
`;

const Wish = styled.Text`
  font-size: 14px;
  margin: 0px 5px 0px 3px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.placeholder};
`;

const Item = ({
  imgUrl,
  itemTitle,
  price,
  commentCount,
  wish,
  productNo,
  navigation,
}) => {
  const _handleItemPress = () =>
    navigation.navigate("MarketDetailPage", {
      productNo: productNo,
    });

  return (
    <Container onPress={_handleItemPress}>
      <StyledImage source={{ uri: imgUrl }} />
      <ItemContent>
        <ItemPrice>{`${price}${t.print("Won")}`}</ItemPrice>
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
