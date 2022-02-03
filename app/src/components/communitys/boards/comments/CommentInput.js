import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { API_URL, FIREBASE_API_KEY } from "@env";

import { getItemFromAsync } from "../../../../utils/AsyncStorage";
import t from "../../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  width: 100%;
  height: 55px;

  background-color: ${({ theme }) => theme.background};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  justify-content: center;
`;

const Input = styled.TextInput.attrs({
  placeholderPaddingLeft: 10,
})`
  background-color: ${({ theme }) => theme.background};
  width: 75%;
  border-radius: 10px;
  margin-left: 20px;
  border: 1px;
  border-color: ${({ theme }) => theme.main};
  height: 40px;
  padding-left: 10px;
`;

const InputBtn = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  right: 15px;
  width: 55px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main};
`;

const CommentInput = ({
  communityNo,
  setIsReady,
  setComments,
  commentNo,
  isUpdateComment,
  isUpdateReply,
  setIsUpdateComment,
  setIsUpdateReply,
  comment,
  setReplies,
  setIsReplyReady,
  divide,
  replyNo,
  communityToken,
  replyToken,
}) => {
  const [description, setDescription] = useState("");

  const _postComment = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      const request = {
        userNo: Number(id),
        description: description,
        communityNo: communityNo,
      };

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };

      const response = await fetch(`${API_URL}/api/comment`, config).then(
        (res) => res.json()
      );
      setComments([]);
      setDescription("");
      sendPushCommentNotification(communityToken);
    } catch (e) {
      Alert.alert(t.print("FailedToRegisterComment"), e.message);
    } finally {
      setIsReady(false);
      Alert.alert(t.print("RegisterCompleted"));
    }
  };

  const _updateComment = async () => {
    try {
      const request = {
        description: description,
      };

      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };

      const response = await fetch(
        `${API_URL}/api/comments/${commentNo}`,
        config
      ).then((res) => res.json());
      setComments([]);
      setDescription("");
      setIsUpdateComment(false);
    } catch (e) {
      Alert.alert(t.print("FailedToEditComment"), e.message);
    } finally {
      setIsReady(false);
      Alert.alert(t.print("editIsComplete"));
    }
  };

  const _postReply = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      const request = {
        userNo: Number(id),
        description: description,
        commentNo: comment.commentNo,
      };

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };

      const response = await fetch(`${API_URL}/api/reply`, config).then((res) =>
        res.json()
      );

      setReplies([]);
      setDescription("");
      setIsReplyReady(false);
      sendPushReplyNotification(replyToken);
      Alert.alert(t.print("RegisterCompleted"));
    } catch (e) {
      Alert.alert(t.print("FailedToRegisterComment"), e.message);
    }
  };

  const _updateReply = async () => {
    try {
      const request = {
        description: description,
      };

      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };

      const response = await fetch(
        `${API_URL}/api/replies/${replyNo}`,
        config
      ).then((res) => res.json());

      setReplies([]);
      setDescription("");
      setIsReplyReady(false);
      setIsUpdateReply(false);
      Alert.alert(t.print("editIsComplete"));
    } catch (e) {
      Alert.alert(t.print("FailedToEditReply"), e.message);
    }
  };

  async function sendPushCommentNotification(communityToken) {
    const nickname = await getItemFromAsync("nickname");

    const message = {
      to: communityToken,
      notification: {
        title: `${nickname}님이 댓글을 다셨습니다`,
        body: `${description}`,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `${nickname}님이 댓글을 다셨습니다`,
        body: `${description}`,
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
  }

  async function sendPushReplyNotification(replyToken) {
    const nickname = await getItemFromAsync("nickname");

    const message = {
      to: replyToken,
      notification: {
        title: `${nickname}님이 답글을 다셨습니다`,
        body: `${description}`,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "normal",
        content_available: true,
      },
      data: {
        experienceId: "@jsj4351/U-Market",
        title: `${nickname}님이 답글을 다셨습니다`,
        body: `${description}`,
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
  }

  if (divide === "Comment") {
    return (
      <Container>
        {isUpdateComment ? (
          <>
            <Input
              value={description}
              onChangeText={(description) => {
                setDescription(description);
              }}
              placeholder={t.print("PleaseEnterTheContentToBeEdited")}
            />
            <InputBtn onPress={_updateComment}>
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {t.print("Register")}
              </Text>
            </InputBtn>
          </>
        ) : (
          <>
            <Input
              value={description}
              onChangeText={(description) => {
                setDescription(description);
              }}
              placeholder={t.print("PleaseEnterAComment")}
            />
            <InputBtn onPress={_postComment}>
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {t.print("Register")}
              </Text>
            </InputBtn>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        {isUpdateReply ? (
          <>
            <Input
              value={description}
              onChangeText={(description) => {
                setDescription(description);
              }}
              placeholder={t.print("PleaseEnterTheContentToBeEdited")}
            />
            <InputBtn onPress={_updateReply}>
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {t.print("Register")}
              </Text>
            </InputBtn>
          </>
        ) : (
          <>
            <Input
              value={description}
              onChangeText={(description) => {
                setDescription(description);
              }}
              placeholder={t.print("PleaseEnterAComment")}
            />
            <InputBtn onPress={_postReply}>
              <Text
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {t.print("Register")}
              </Text>
            </InputBtn>
          </>
        )}
      </Container>
    );
  }
};

export default CommentInput;
