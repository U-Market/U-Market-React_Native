import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";

const Container = styled.Pressable`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  margin: 0px 0 0px 40px;
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
`;

const ItemIcon = styled.TouchableOpacity`
  position: absolute;
  right: 30px;
`;

const Postdate = styled.Text`
  font-size: 12px;
  padding-left: 40px;
  color: ${({ theme }) => theme.greytext};
`;

const Item = ({ onPress, itemTitle, date }) => {
  const theme = useContext(ThemeContext);
  return (
    <Container onPress={onPress}>
      <ItemTitle>{itemTitle}</ItemTitle>
      <Postdate>{date}</Postdate>
      <ItemIcon>
        <AntDesign name="right" size={30} color={theme.main} />
      </ItemIcon>
    </Container>
  );
};

export default Item;
