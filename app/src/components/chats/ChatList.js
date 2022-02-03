import React, { useLayoutEffect, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import { db } from "../../utils/firebase";

import TimeAgo from "react-native-timeago";
import { API_URL } from "@env";
import t from "../../utils/translate/Translator";

let moment = require("moment");

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  height: 90px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const Icon = styled.View`
  padding: 5px;
`;

const TextContainer = styled.View`
  height: 100%;
  justify-content: center;
  padding-left: 5px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const Content = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  padding-top: 3px;
`;

const InDate = styled.Text`
  color: #979797;
  font-size: 11px;
`;

const Thumbnail = styled.View`
  font-size: 12px;
  position: absolute;
  right: 15px;
`;

const ChatList = ({ navigation, chatList }) => {
  const [messages, setMessages] = useState([]);
  const [chatListToken, setChatListToken] = useState("");

  const moveChatRoomPage = () => {
    navigation.navigate("ChatScreenPage", {
      sellerNo: chatList.userNo,
      profileUrl: chatList.profileUrl,
      nickname: chatList.nickname,
      title: chatList.title,
      chatRoom: chatList.chatRoomNo,
      chatListToken: chatListToken,
    });
  };

  const getToken = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/notification/token/${chatList.userNo}`,
        config
      ).then((res) => res.json());

      setChatListToken(response[0].token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useLayoutEffect(() => {
    if (t.getLanguage() === "ko") {
      require("moment/locale/ko");
      moment.locale("ko");
    } else {
      require("moment/locale/en-au");
      moment.locale("en");
    }

    const unsubscribe = db
      .collection(`${chatList.chatRoomNo}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          //상대
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return () => unsubscribe;
  }, []);

  if (messages.length) {
    return (
      <Container onPress={moveChatRoomPage}>
        <Icon>
          <Image
            style={{
              height: 46,
              width: 46,
              borderRadius: 23,
              borderWidth: 1,
              borderColor: "#e3e3e3",
            }}
            source={{ uri: chatList.profileUrl }}
          />
        </Icon>
        <TextContainer>
          {t.getLanguage() === "ko" ? (
            <Title>{`${chatList.nickname} ${t.print("ChatWith")}`}</Title>
          ) : (
            <Title>{`${t.print("ChatWith")} ${chatList.nickname}`}</Title>
          )}

          <InDate>
            <TimeAgo time={messages[0].createdAt}></TimeAgo>
          </InDate>

          <Content>{messages[0].text}</Content>
        </TextContainer>

        <Thumbnail>
          <Image
            style={{
              height: 60,
              width: 60,
              borderRadius: 10,
            }}
            source={{ uri: chatList.thumbnail }}
          />
        </Thumbnail>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default ChatList;
