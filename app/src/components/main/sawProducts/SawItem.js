import React from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { theme } from "../../../theme";
import t from "../../../utills/translate/Translator";

const Container = styled.Pressable``;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 110px;
  width: 30%;
  margin: 8px;
  border-radius: 6px;
  border-width: 1px;
  border-color: gray;
`;

const DeleteBtn = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
`;

const ItemContent = styled.View`
  align-items: flex-start;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
`;

const ItemPrice = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
`;

const ItemStauts = styled.Text`
  font-size: 12px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.green};
`;

const RowContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const Wish = styled.Text`
  color: ${({ theme }) => theme.text};
  padding: 0px 5px 0px 3px;
`;

const PostDate = styled.Text`
  color: ${({ theme }) => theme.postdate};
  font-size: 10px;
  position: absolute;
  right: 15px;
  bottom: 16px;
`;

const Item = ({ onPress, imgUrl, itemTitle, price, date, wish }) => {
  return (
    <TouchableOpacity style={styles.shoadowBox} onPress={onPress}>
      <StyledImage source={{ uri: imgUrl }} />
      <DeleteBtn>
        <Feather name="x" size={22} color="#ADADAD" />
      </DeleteBtn>
      <ItemContent>
        <ItemStauts>판매중</ItemStauts>
        <ItemPrice>{price}원</ItemPrice>

        <ItemTitle>{itemTitle}</ItemTitle>
        <RowContainer>
          <Wish>{wish}</Wish>
          <FontAwesome name="heart" size={14} color="pink" />
        </RowContainer>
      </ItemContent>
      <PostDate>등록일 {date}</PostDate>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  shoadowBox: {
    flex: 1,
    marginRight: 20,

    backgroundColor: theme.background,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 140,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
});
