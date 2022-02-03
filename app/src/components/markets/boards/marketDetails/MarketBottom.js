import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import t from "../../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.background};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const WishBtn = styled.TouchableOpacity`
  width: 80px;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.background};
  border: 1px;
  border-color: ${({ theme }) => theme.mainOrange};
`;

const ChatBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 70%;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.mainOrange};
`;

const MarketBottom = ({ onPress, wish, chatStart }) => {
  return (
    <Container>
      <WishBtn onPress={onPress}>
        <Text
          style={{
            color: "#222",
            alignSelf: "center",

            justifyContent: "center",
            fontWeight: "bold",
            paddingRight: 5,
          }}
        >
          {t.print("Interest")}
        </Text>
        {wish ? (
          <FontAwesome name="heart" size={14} color="red" />
        ) : (
          <FontAwesome name="heart" size={14} color="pink" />
        )}
      </WishBtn>

      <ChatBtn onPress={chatStart}>
        <Ionicons name="chatbox" size={24} color="white" />
        <Text
          style={{
            color: "#fff",
            paddingLeft: 5,
          }}
        >
          {t.print("Chat")}
        </Text>
      </ChatBtn>
    </Container>
  );
};

export default MarketBottom;
