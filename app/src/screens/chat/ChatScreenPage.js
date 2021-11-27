import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert, Image, View } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/commons/Header";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import ChatScreen from "../../components/chats/ChatScreen";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const HeaderContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  border-color: ${({ theme }) => theme.listBorder};
  border-bottom-width: 2px;
  background-color: ${({ theme }) => theme.background};
`;

const Icon = styled.TouchableOpacity`
  padding: 10px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  padding-left: 5px;
`;

const ChatScreenPage = ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [chatRoomNo, setChatRoomNo] = useState("");
  const [userNo, setUserNo] = useState("");
  const {
    sellerNo,
    profileUrl,
    nickname,
    title,
    chatRoom,
    productNo,
    thumbnail,
  } = route?.params;

  const _loaddatas = async () => {
    if (chatRoom === undefined) {
      try {
        const id = await getItemFromAsync("userNo");
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sellerNo: sellerNo,
            buyerNo: id,
            productNo: productNo,
          }),
        };

        const response = await fetch(`${API_URL}/api/chat`, config).then(
          (res) => res.json()
        );
        setUserNo(id);
        setChatRoomNo(response.chatRoomNo);
      } catch (e) {
        Alert.alert("실패", e.message);
      }
    } else {
      setChatRoomNo(chatRoom);
    }
  };

  return isReady ? (
    <Container>
      <HeaderContainer>
        <Icon onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFAE52" />
        </Icon>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#e3e3e3",
          }}
          source={{ uri: profileUrl }}
        />
        <Title>{nickname}</Title>
      </HeaderContainer>

      <ChatScreen
        navigation={navigation}
        chatRoomNo={chatRoomNo}
        profileUrl={profileUrl}
        nickname={nickname}
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loaddatas}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default ChatScreenPage;
