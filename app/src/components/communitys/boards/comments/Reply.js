import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Alert, StyleSheet, Image } from "react-native";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../../../utils/AsyncStorage";
import SeeMore from "../../../commons/SeeMore";
import { ProgressContext } from "../../../../contexts";
import t from "../../../../utils/translate/Translator";

const Container = styled.View`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 0px 0px 40px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.label};
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

const ItemShowRightContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 5px;
  background-color: ${({ theme }) => theme.background};
`;

const ItemClickContainer = styled.TouchableOpacity`
  padding: 5px 5px 0px 5px;
`;

const ItemThumbs = styled.Text`
  padding-right: 15px;

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

    const toggleIsLike = async () => {
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

    const divideLikeFlag = () => {
      if (Number(isLikeFlag)) {
        return (
          <>
            <ItemThumbs>
              <FontAwesome name="thumbs-up" size={20} color="#FFC352" />{" "}
              {t.print("Like")}
              {likeCnt}
            </ItemThumbs>
          </>
        );
      } else {
        return (
          <>
            <ItemThumbs>
              <FontAwesome5 name="thumbs-up" size={18} color="#FFC352" />{" "}
              {t.print("Like")}
              {likeCnt}
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
              <PostInfo>
                <ItemStudent>{replies.nickname}</ItemStudent>
                <ItemTime>{replies.inDate}</ItemTime>
              </PostInfo>
            </RowContainer>
            <ItemDescription>{replies.description}</ItemDescription>
          </TextContainer>

          <SeeMore
            divide={"Reply"}
            comment={comment}
            setIsUpdateReply={setIsUpdateReply}
            navigation={navigation}
            setIsReplyReady={setIsReplyReady}
            setReplies={setReplies}
            replyNo={replies.replyNo}
            setReplyNo={setReplyNo}
            userNo={userNo}
            writerNo={replies.writerNo}
          ></SeeMore>
        </Container>

        <ItemShowRightContainer>
          <ItemClickContainer onPress={() => toggleIsLike()}>
            <>{divideLikeFlag()}</>
          </ItemClickContainer>
        </ItemShowRightContainer>
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
