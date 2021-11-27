import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Alert, StyleSheet, Image } from "react-native";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../utills/AsyncStorage";

import SeeMore from "../commons/SeeMore";
import { ProgressContext } from "../../contexts";
import t from "../../utills/translate/Translator";

const Container = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 5px 0px 0px 40px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.label};
  flex: 1;
`;

const Icon = styled.View`
  position: absolute;
  left: 15px;
  top: 20px;
`;

const TextContainer = styled.View`
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 50px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
`;

const ItemShowContainer = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0px 0px 5px 20px;
  background-color: ${({ theme }) => theme.background};
`;

const ItemClickContainer = styled.TouchableOpacity``;

const ItemShowRightContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ItemThumbs = styled.Text`
  padding-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const Reply = React.memo(
  ({
    navigation,
    replies,
    setReplies,
    comment,
    setIsReplyReady,
    setIsUpdateReply,
    setReplyNo,
    userNo,
  }) => {
    const [isLikeFlag, setIsLikeFlag] = useState(replies.likeFlag);
    const [likeCnt, setIsLikeCnt] = useState(replies.likeCnt);

    const { spinner } = useContext(ProgressContext);

    const _handleIsLikeToggle = async () => {
      const id = await getItemFromAsync("userNo");
      if (Number(isLikeFlag)) {
        try {
          spinner.start();
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
            `${API_URL}/api/replies/${replies.replyNo}`,
            config
          ).then((res) => res.json());

          setIsLikeFlag("0");
          setIsLikeCnt(likeCnt - 1);
          console.log(response);
        } catch (e) {
          Alert.alert(t.print("FailedToCancelLike"), e.message);
        } finally {
          spinner.stop();
        }
      } else {
        try {
          spinner.start();
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
            `${API_URL}/api/replies/${replies.replyNo}`,
            config
          ).then((res) => res.json());

          setIsLikeFlag("1");
          setIsLikeCnt(likeCnt + 1);
        } catch (e) {
          Alert.alert(t.print("FailedToRegisterLike"), e.message);
        } finally {
          spinner.stop();
        }
      }
    };

    const _divideLikeFlag = () => {
      if (Number(isLikeFlag)) {
        return (
          <>
            <ItemThumbs>
              <FontAwesome name="thumbs-up" size={20} color="#FFC352" />
              {t.print("Like")} {likeCnt}
            </ItemThumbs>
          </>
        );
      } else {
        return (
          <>
            <ItemThumbs>
              <FontAwesome5 name="thumbs-up" size={18} color="#FFC352" />
              {t.print("Like")} {likeCnt}
            </ItemThumbs>
          </>
        );
      }
    };

    return (
      <>
        <Container>
          <Icon>
            <MaterialCommunityIcons
              name="subdirectory-arrow-right"
              size={24}
              color="black"
            />
          </Icon>
          <TextContainer>
            <RowContainer>
              <Image
                resizeMode="cover"
                style={styles.Image}
                source={{ uri: replies.profileUrl }}
              />
              <ItemStudent>{replies.nickname}</ItemStudent>
              <ItemTime>{replies.inDate}</ItemTime>
            </RowContainer>
            <ItemDescription>{replies.description}</ItemDescription>
          </TextContainer>
          {Number(userNo) === replies.writerNo ? (
            <SeeMore
              divide={"Reply"}
              comment={comment}
              setIsUpdateReply={setIsUpdateReply}
              navigation={navigation}
              setIsReplyReady={setIsReplyReady}
              setReplies={setReplies}
              replyNo={replies.replyNo}
              setReplyNo={setReplyNo}
            ></SeeMore>
          ) : (
            <></>
          )}
        </Container>

        <ItemShowContainer>
          <ItemShowRightContainer>
            <ItemClickContainer onPress={() => _handleIsLikeToggle()}>
              <>{_divideLikeFlag()}</>
            </ItemClickContainer>
          </ItemShowRightContainer>
        </ItemShowContainer>
      </>
    );
  }
);

export default Reply;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
