import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlatList } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utills/AsyncStorage";

import { ReadyContext, ProgressContext } from "../../../contexts";
import Header from "../../../components/commons/Header";
import Comment from "../../../components/comments/Comment";
import Reply from "../../../components/comments/Reply";
import CommentInput from "../../../components/CommentInput";
import { ScrollView } from "react-native-gesture-handler";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ReplyPage = ({ navigation, route }) => {
  const [replies, setReplies] = useState([]);
  const [isReplyReady, setIsReplyReady] = useState(false);
  const [isUpdateReply, setIsUpdateReply] = useState(false);
  const [isLikeFlag, setIsLikeFlag] = useState("");
  const [replyNo, setReplyNo] = useState("");

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const { comment, userNo } = route.params;

  const _loadReplyView = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      spinner.start();

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
    } finally {
      spinner.stop();
    }
  };

  return isReplyReady ? (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={20}
        // behavior="padding"
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
        {/* <ScrollView scrollIndicatorInsets={{ right: 1 }}> */}
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
          windowSize={3} //렌더링 되는양을 조절
        />
        {/* </ScrollView> */}
        <CommentInput
          setReplies={setReplies}
          comment={comment}
          replyNo={replyNo}
          divide={"Reply"}
          setIsReplyReady={setIsReplyReady}
          setIsUpdateReply={setIsUpdateReply}
          isUpdateReply={isUpdateReply}
        />
      </KeyboardAwareScrollView>
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadReplyView}
      onFinish={() => setIsReplyReady(true)}
      onError={console.error}
    />
  );
};

export default ReplyPage;
