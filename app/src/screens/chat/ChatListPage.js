import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";

import { ReadyContext, ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import Header from "../../components/commons/Header";

import ChatList from "../../components/chats/ChatList";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ChatListPage = ({ navigation }) => {
  const [chatList, setChatList] = useState("");

  const { isReady, readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);
  const _loaddatas = async () => {
    try {
      spinner.start();
      const userNo = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/chat/${userNo}`,
        config
      ).then((res) => res.json());

      setChatList(response.chatlist);
      console.log(response);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("Chat")}
      />
      <FlatList
        keyExtractor={(chatList, index) => index.toString()}
        data={chatList}
        renderItem={({ item }) => (
          <ChatList chatList={item} navigation={navigation} />
        )}
        windowSize={3} //렌더링 되는양을 조절
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loaddatas}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
};

export default ChatListPage;
