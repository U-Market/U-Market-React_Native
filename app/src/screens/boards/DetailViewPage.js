import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProgressContext, ReadyContext } from "../../contexts";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import Header from "../../components/commons/Header";
import DetailView from "../../components/boards/DetailView";
import Comments from "../../components/comments/Comments";
import CommentInput from "../../components/CommentInput";
import SeeMore from "../../components/commons/SeeMore";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const CommentTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding: 5px 0px 5px 20px;
  width: 100%;

  background-color: ${({ theme }) => theme.background2};
`;

const NoCommentTitle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text2};
  padding: 5px 0px 5px 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.background2};
`;

const DetailViewPage = ({ route, navigation }) => {
  const [community, setCommunity] = useState({});

  const [comments, setComments] = useState([]);
  const [hit, setHit] = useState(hit);
  const [isReady, setIsReady] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentNo, setCommentNo] = useState("");

  const [userNo, setUserNo] = useState("");
  const [likeCnt, setLikeCnt] = useState("");

  const { spinner } = useContext(ProgressContext);

  const { categoryNo, communityNo, headerTitle, images } = route?.params;

  const _loadDetailView = async () => {
    try {
      spinner.start();
      const id = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/communities/${communityNo}/${id}`,
        config
      ).then((res) => res.json());
      // setIsLikeFlag(response.community.likeFlag);
      // setIsBookmarkFlag(response.community.bookmarkFlag);
      setCommunity(response.community);
      setComments([...comments, ...response.community.comments]);
      setLikeCnt(response.community.likeCnt);
      setUserNo(id);
    } catch (e) {
      console.log(t.print("FailedToBringUpThePost"), e.message);
    } finally {
      spinner.stop();
    }

    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hit: hit,
        }),
      };

      const response = await fetch(
        `${API_URL}/api/communities/${communityNo}/hit`,
        config
      ).then((res) => res.json());
      setHit(response.hit);
    } catch (e) {
    } finally {
    }
  };

  const noComment = () => {
    if (comments.length) {
      return (
        <FlatList
          keyExtractor={(comments, index) => index.toString()}
          data={comments}
          renderItem={({ item }) => (
            <Comments
              comments={item}
              navigation={navigation}
              categoryNo={categoryNo}
              headerTitle={headerTitle}
              numberOfLines={2}
              setIsUpdateComment={setIsUpdateComment}
              setCommentNo={setCommentNo}
              setComments={setComments}
              setIsReady={setIsReady}
              userNo={userNo}
            />
          )}
          windowSize={3} //렌더링 되는양을 조절
        />
      );
    }
    return (
      <NoCommentTitle>
        {t.print("ThereAreCurrentlyNoCommentsBeTheFirstToComment")}
      </NoCommentTitle>
    );
  };

  return isReady ? (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={20}
        behavior="padding"
      >
        <Header
          moveViewByNavigation={() =>
            // navigation.navigate("FreeBoardPage", { categoryNo, headerTitle })
            navigation.goBack()
          }
          title={headerTitle}
        />
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <DetailView
            navigation={navigation}
            community={community}
            images={images}
            communityNo={communityNo}
            userNo={userNo}
            likeCnt={likeCnt}
            setLikeCnt={setLikeCnt}
          />
          <CommentTitle>{t.print("Comment")}</CommentTitle>
          <>{noComment()}</>
          {community.writerNo === Number(userNo) ? (
            <SeeMore
              divide={"Community"}
              navigation={navigation}
              communityNo={communityNo}
              categoryNo={categoryNo}
              headerTitle={headerTitle}
              setIsReady={setIsReady}
            />
          ) : (
            <></>
          )}
        </ScrollView>

        <CommentInput
          communityNo={communityNo}
          setIsReady={setIsReady}
          setComments={setComments}
          comments={comments}
          commentNo={commentNo}
          isUpdateComment={isUpdateComment}
          setIsUpdateComment={setIsUpdateComment}
          community={community}
          divide={"Comment"}
        />
      </KeyboardAwareScrollView>
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadDetailView}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default DetailViewPage;
