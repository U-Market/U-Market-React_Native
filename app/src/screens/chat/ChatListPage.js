import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, ScrollView, RefreshControl } from "react-native";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";

import { getItemFromAsync } from "../../utils/AsyncStorage";
import Header from "../../components/commons/Header";

import ChatList from "../../components/chats/ChatList";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ChatListPage = ({ navigation }) => {
  const [chatList, setChatList] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    _loadData();
  }, [isReady]);

  const _loadData = async () => {
    try {
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
      setIsReady(true);
    } catch (e) {
      Alert.alert("실패", e.message);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsReady(false);
    wait(2000).then(() => setIsReady(true));
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("Chat")}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          keyExtractor={(chatList, index) => index.toString()}
          data={chatList}
          refreshing={isReady}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <ChatList chatList={item} navigation={navigation} />
          )}
          windowSize={3}
        />
      </ScrollView>
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default ChatListPage;
