import React from "react";
import styled from "styled-components/native";
import { StyleSheet, Image } from "react-native";

import t from "../../../../utils/translate/Translator";

const CommentContainer = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 15px 10px 15px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.label};
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
  padding-bottom: 20px;
  padding-left: 5px;
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

const CommentRightRowContainer = styled.SafeAreaView`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ItemThumbs = styled.Text`
  padding-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const ItemComment = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const Comment = ({ numberOfLines, comment }) => {
  if (comment !== undefined) {
    return (
      <>
        <CommentContainer>
          <CommentTextContainer>
            <CommentRowContainer>
              <Image
                resizeMode="cover"
                style={styles.Image}
                source={{ uri: comment.profileUrl }}
              />
              <PostInfo>
                <ItemStudent>{comment.nickname}</ItemStudent>
                <ItemTime>{comment.inDate}</ItemTime>
              </PostInfo>
            </CommentRowContainer>

            <ItemDescription numberOfLines={numberOfLines} ellipsizeMode="tail">
              {comment.description}
            </ItemDescription>
          </CommentTextContainer>
          <CommentRightRowContainer>
            <ItemThumbs>
              {t.print("Like")}
              {comment.likeCnt}
            </ItemThumbs>

            <ItemComment>
              {t.print("Reply")} {comment.replyCnt}
            </ItemComment>
          </CommentRightRowContainer>
        </CommentContainer>
      </>
    );
  }
  return <></>;
};

export default Comment;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
