import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { StyleSheet, Image } from "react-native";

import t from "../../utills/translate/Translator";

const CommentContainer = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 5px 20px 10px 20px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.label};
`;

const CommentTextContainer = styled.SafeAreaView`
  width: 100%;
`;

const CommentRowContainer = styled.SafeAreaView`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 50px;
`;

const CommentRightRowContainer = styled.SafeAreaView`
  padding-top: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ItemStudent = styled.Text`
  font-size: 12px;
  padding-left: 5px;
  padding-bottom: 20px;
`;

const ItemTime = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.text};
  position: absolute;
  left: 44px;
  bottom: 5px;
`;

const ItemDescription = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
`;

const ItemThumbs = styled.Text`
  padding-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const ItemComment = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ navigation, numberOfLines, comment }) => {
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
              <ItemStudent>{comment.nickname}</ItemStudent>
              <ItemTime>{comment.inDate}</ItemTime>
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
