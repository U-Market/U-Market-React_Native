import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, Image } from "react-native";
import { API_URL } from "@env";
import { Feather } from "@expo/vector-icons";

import { getItemFromAsync } from "../../utils/AsyncStorage";
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

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const ChatScreenPage = ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [chatRoomNo, setChatRoomNo] = useState("");
  const [chatToken, setChatToken] = useState("");
  const [userNo, setUserNo] = useState("");

  const {
    sellerNo,
    profileUrl,
    nickname,
    title,
    chatRoom,
    productNo,
    thumbnail,
    chatListToken,
  } = route?.params;

  useEffect(() => {
    _loadData();
  }, [isReady]);

  const _loadData = async () => {
    const id = await getItemFromAsync("userNo");
    if (chatRoom === undefined) {
      try {
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
        setIsReady(true);
      } catch (e) {
        Alert.alert("실패", e.message);
      }
    } else {
      setChatRoomNo(chatRoom);
      setIsReady(true);
    }

    try {
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/notification/token/${sellerNo}`,
        config
      ).then((res) => res.json());

      setChatToken(response[0].token);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
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
        chatToken={chatToken}
        chatListToken={chatListToken}
      />
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default ChatScreenPage;
