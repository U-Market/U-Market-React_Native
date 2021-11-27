import React, {
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { auth, db } from "../../utills/firebase";
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
import { getItemFromAsync } from "../../utills/AsyncStorage";

const ChatScreen = ({
  navigation,

  chatRoomNo,
  profileUrl,
  nickname,
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
    console.log(messages);
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
    const { _id, createdAt, text, user } = messages[0];
    db.collection(`${chatRoomNo}`).add({
      //자신
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

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
