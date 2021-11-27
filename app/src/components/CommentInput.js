import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { API_URL } from "@env";
import { getItemFromAsync } from "../utills/AsyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProgressContext, ReadyContext } from "../contexts";
import t from "../utills/translate/Translator";

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
  width: 60px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main};
`;

const CommentInput = ({
  navigation,
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
}) => {
  const [description, setDescription] = useState("");

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const _postComment = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      spinner.start();

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
      setIsReady(false);
      setDescription("");
      console.log(response);
      console.log(config);
      Alert.alert(t.print("RegisterCompleted"));
    } catch (e) {
      Alert.alert(t.print("FailedToRegisterComment"), e.message);
    } finally {
      spinner.stop();
    }
  };

  const _updateComment = async () => {
    try {
      spinner.start();

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
      setIsReady(false);
      setDescription("");
      setIsUpdateComment(false);
      Alert.alert(t.print("editIsComplete"));
    } catch (e) {
      Alert.alert(t.print("FailedToEditComment"), e.message);
    } finally {
      spinner.stop();
    }
  };

  const _postReply = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      spinner.start();

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
      setIsReplyReady(false);
      setDescription("");
      Alert.alert(t.print("RegisterCompleted"));
    } catch (e) {
      Alert.alert(t.print("FailedToRegisterComment"), e.message);
    } finally {
      spinner.stop();
    }
  };

  const _updateReply = async () => {
    try {
      spinner.start();

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
      setIsReplyReady(false);
      setDescription("");
      setIsUpdateReply(false);
      Alert.alert(t.print("editIsComplete"));
    } catch (e) {
      Alert.alert(t.print("FailedToEditReply"), e.message);
    } finally {
      spinner.stop();
    }
  };

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
