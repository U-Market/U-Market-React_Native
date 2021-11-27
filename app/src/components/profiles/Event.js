import React from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { theme } from "../../theme";

const Container = styled.Pressable`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  height: 250px;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 160px;
  width: 90%;

  border-radius: 12px;
  border-width: 1px;
  border-color: gray;
`;

const ItemContent = styled.View`
  align-items: flex-start;
  margin-top: 10px;
  width: 88%;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.label};
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  margin-top: 5px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const ItemSubTitle = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 12px;
  padding-bottom: 8px;
  color: ${({ theme }) => theme.postdate};
`;

const Item = ({ onPress, imgUrl, itemTitle }) => {
  //if (0 <== grade <== 1)
  return (
    <TouchableOpacity style={styles.shoadowBox} onPress={onPress}>
      <Container>
        <StyledImage source={{ uri: imgUrl }} />

        <ItemContent>
          <ItemTitle>제목{itemTitle}</ItemTitle>
          <ItemSubTitle>
            베리베립레비립베베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베리베립레비립베베릴벨비립리베릴벨비립리길다?
          </ItemSubTitle>
        </ItemContent>
      </Container>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  shoadowBox: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: 10,
    height: 200,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
});
