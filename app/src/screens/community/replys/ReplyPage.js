import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Alert, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlatList } from "react-native-gesture-handler";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../../utils/AsyncStorage";
import Header from "../../../components/commons/Header";
import Comment from "../../../components/communitys/boards/comments/Comment";
import Reply from "../../../components/communitys/boards/comments/Reply";
import CommentInput from "../../../components/communitys/boards/comments/Comment";
import t from "../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const ReplyPage = ({ navigation, route }) => {
  const [replies, setReplies] = useState([]);
  const [isReplyReady, setIsReplyReady] = useState(false);
  const [isUpdateReply, setIsUpdateReply] = useState(false);
  const [replyNo, setReplyNo] = useState("");
  const [replyToken, setReplyToken] = useState("");

  const { comment, userNo } = route.params;

  useEffect(() => {
    _loadData();
  }, [isReplyReady]);

  const _loadData = async () => {
    const id = await getItemFromAsync("userNo");
    if (isReplyReady === false) {
      try {
        const config = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${API_URL}/api/replies/comment/${comment.commentNo}/${Number(id)}`,
          config
        ).then((res) => res.json());
        setReplies([...replies, ...response.replies]);
      } catch (e) {
        Alert.alert(t.print("FailedToBringUpThePost"), e.message);
      }
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
        `${API_URL}/api/notification/token/${comment.writerNo}`,
        config
      ).then((res) => res.json());

      setReplyToken(response[0].token);
    } catch (e) {
    } finally {
      setIsReplyReady(true);
    }
  };

  return isReplyReady ? (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={20}
      >
        <Header
          moveViewByNavigation={() => navigation.goBack()}
          title={t.print("Reply")}
        />

        <Comment
          navigation={navigation}
          numberOfLines={1000}
          comment={comment}
        />

        <FlatList
          keyExtractor={(replies, index) => index.toString()}
          data={replies}
          renderItem={({ item }) => (
            <Reply
              replies={item}
              navigation={navigation}
              setReplies={setReplies}
              setIsReplyReady={setIsReplyReady}
              setIsUpdateReply={setIsUpdateReply}
              comment={comment}
              setReplyNo={setReplyNo}
              userNo={userNo}
            />
          )}
          windowSize={3}
        />

        <CommentInput
          setReplies={setReplies}
          comment={comment}
          replyNo={replyNo}
          divide={"Reply"}
          setIsReplyReady={setIsReplyReady}
          setIsUpdateReply={setIsUpdateReply}
          isUpdateReply={isUpdateReply}
          replyToken={replyToken}
        />
      </KeyboardAwareScrollView>
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default ReplyPage;
