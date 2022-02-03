import React, { useState } from "react";
import styled from "styled-components/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

import { Alert, Image, StyleSheet } from "react-native";
import { getItemFromAsync } from "../../../../utils/AsyncStorage";
import t from "../../../../utils/translate/Translator";
import { API_URL } from "@env";
import SeeMore from "../../../commons/SeeMore";

const CommentContainer = styled.TouchableOpacity`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.label};
  padding: 0px 10px 10px 10px;
`;

const CommentTextContainer = styled.SafeAreaView`
  width: 100%;
`;

const CommentRowContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 5px;
`;

const PostInfo = styled.View``;

const ItemStudent = styled.Text`
  font-size: 12px;
  padding-left: 5px;
  padding-bottom: 3px;
`;

const ItemTime = styled.Text`
  font-size: 10px;
  padding-left: 5px;
  color: ${({ theme }) => theme.text2};
`;

const ItemDescription = styled.Text`
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 5px;
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const ItemClickContainer = styled.TouchableOpacity`
  padding: 5px 5px 0px 5px;
`;

const ItemShowRightContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ItemThumbs = styled.Text`
  padding-right: 5px;
  color: ${({ theme }) => theme.text};
`;

const ItemComment = styled.Text`
  color: ${({ theme }) => theme.text};
  padding: 4px 5px 0px 0px;
`;

const Comments = React.memo(
  ({
    comments,
    navigation,
    numberOfLines,
    setIsUpdateComment,
    setCommentNo,
    setIsReady,
    setComments,
    userNo,
  }) => {
    const [isLikeFlag, setIsLikeFlag] = useState(comments.likeFlag);
    const [likeCnt, setIsLikeCnt] = useState(comments.likeCnt);

    const toggleIsLike = async () => {
      const id = await getItemFromAsync("userNo");

      if (Number(isLikeFlag)) {
        try {
          const config = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              flag: 0,
              userNo: Number(id),
            }),
          };

          const response = await fetch(
            `${API_URL}/api/comments/${comments.commentNo}`,
            config
          ).then((res) => res.json());

          setIsLikeFlag("0");
          setIsLikeCnt(likeCnt - 1);
        } catch (e) {
          Alert.alert(t.print("FailedToCancelLike"), e.message);
        }
      } else {
        try {
          const config = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              flag: 1,
              userNo: Number(id),
            }),
          };

          const response = await fetch(
            `${API_URL}/api/comments/${comments.commentNo}`,
            config
          ).then((res) => res.json());

          setIsLikeFlag("1");
          setIsLikeCnt(likeCnt + 1);
        } catch (e) {
          Alert.alert(t.print("FailedToRegisterLike"), e.message);
        }
      }
    };

    const divideLikeFlag = () => {
      if (Number(isLikeFlag)) {
        return (
          <ItemThumbs>
            <FontAwesome name="thumbs-up" size={20} color="#FFC352" />{" "}
            {t.print("Like")} {likeCnt}
          </ItemThumbs>
        );
      } else {
        return (
          <ItemThumbs>
            <FontAwesome5 name="thumbs-up" size={18} color="#FFC352" />{" "}
            {t.print("Like")} {likeCnt}
          </ItemThumbs>
        );
      }
    };

    // const divideUserNo = () => {
    //   if (Number(userNo) === comments.writerNo) {
    //     return (

    //     );
    //   }
    //   return <></>;
    // };

    const moveReplyPage = () => {
      navigation.navigate("ReplyPage", {
        comment: comments,
        userNo: userNo,
      });
    };

    if (comments !== undefined) {
      return (
        <>
          <CommentContainer onPress={moveReplyPage}>
            <CommentTextContainer>
              <CommentRowContainer>
                <Image
                  resizeMode="cover"
                  style={styles.Image}
                  source={{ uri: comments.profileUrl }}
                />
                <PostInfo>
                  <ItemStudent>{comments.nickname}</ItemStudent>
                  <ItemTime>{comments.inDate}</ItemTime>
                </PostInfo>
              </CommentRowContainer>

              <ItemDescription
                numberOfLines={numberOfLines}
                ellipsizeMode="tail"
              >
                {comments.description}
              </ItemDescription>
            </CommentTextContainer>

            <SeeMore
              divide={"Comment"}
              setIsUpdateComment={setIsUpdateComment}
              commentNo={comments.commentNo}
              navigation={navigation}
              setCommentNo={setCommentNo}
              setIsReady={setIsReady}
              setComments={setComments}
              writerNo={comments.writerNo}
              userNo={userNo}
            />
            <ItemShowRightContainer>
              <ItemClickContainer onPress={() => toggleIsLike()}>
                <>{divideLikeFlag()}</>
              </ItemClickContainer>

              <ItemComment>
                <FontAwesome name="commenting-o" size={20} color="#FFC352" />{" "}
                {t.print("Reply")} {comments.replyCnt}
              </ItemComment>
            </ItemShowRightContainer>
          </CommentContainer>
        </>
      );
    }
    return <></>;
  }
);

export default Comments;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
