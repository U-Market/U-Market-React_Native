import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { db } from "../../utils/firebase";
import initialMessages from "./message";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "./InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from "./MessageContainer";

import { GiftedChat } from "../../../react-native-gifted-chat";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import { FIREBASE_API_KEY } from "@env";

const ChatScreen = ({
  chatRoomNo,
  profileUrl,
  nickname,
  chatToken,
  chatListToken,
}) => {
  const [messages, setMessages] = useState([]);
  const [userNo, setUserNo] = useState("");

  const setID = async () => {
    const id = await getItemFromAsync("userNo");
    setUserNo(id);
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection(`${chatRoomNo}`)
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

  useEffect(() => {
    setID();
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    if (chatListToken !== undefined) {
      sendPushChatListNotification(chatListToken);
      console.log("1");
    } else {
      sendPushChatNotification(chatToken);
      console.log("2");
    }
    const { _id, createdAt, text, user } = messages[0];
    db.collection(`${chatRoomNo}`).add({
      //자신
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  async function sendPushChatNotification(chatToken) {
    const nickname = await getItemFromAsync("nickname");

    const message = {
      to: chatToken,
      notification: {
        title: `${nickname}님이 메시지를 보내셨습니다`,
        body: ``,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `${nickname}님이 메시지를 보내셨습니다`,
        body: ``,
        score: 50,
        wicket: 1,
      },
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `key=${FIREBASE_API_KEY}`,
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    response = await response.json();
    console.log(response);
  }

  async function sendPushChatListNotification(chatListToken) {
    const nickname = await getItemFromAsync("nickname");

    const message = {
      to: chatListToken,
      notification: {
        title: `${nickname}님이 메시지를 보내셨습니다`,
        body: ``,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `${nickname}님이 메시지를 보내셨습니다`,
        body: ``,
        score: 50,
        wicket: 1,
      },
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `key=${FIREBASE_API_KEY}`,
    });

    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    response = await response.json();
    console.log(response);
  }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      //자신
      user={{
        _id: userNo,
        displyName: nickname,
        avatar: profileUrl,
      }}
      alignTop
      alwaysShowSend
      scrollToBottom
      // showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      // bottomOffset={26}
      onPressAvatar={console.log}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      // renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      // renderSystemMessage={renderSystemMessage}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
      // renderMessageImage
      // renderCustomView={renderCustomView}
      isCustomViewBottom
      messagesContainerStyle={{ backgroundColor: "#f5f5f5" }}
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  );
};

export default ChatScreen;
