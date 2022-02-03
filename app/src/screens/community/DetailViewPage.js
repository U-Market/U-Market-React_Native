import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { RefreshControl, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { API_URL } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import Header from "../../components/commons/Header";
import DetailView from "../../components/communitys/boards/communityDetails/DetailView";
import Comments from "../../components/communitys/boards/comments/Comments";
import CommentInput from "../../components/communitys/boards/comments/CommentInput";
import SeeMore from "../../components/commons/SeeMore";
import t from "../../utils/translate/Translator";

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

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailViewPage = ({ route, navigation }) => {
  const [community, setCommunity] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState([]);
  const [hit, setHit] = useState(hit);
  const [isReady, setIsReady] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentNo, setCommentNo] = useState("");
  const [communityToken, setCommunityToken] = useState("");

  const [userNo, setUserNo] = useState("");
  const [likeCnt, setLikeCnt] = useState("");

  const { spinner } = useContext(ProgressContext);

  const { categoryNo, communityNo, headerTitle, images, write } = route?.params;

  useEffect(() => {
    increaseHit();
  }, []);

  useEffect(() => {
    _loadData();
  }, [isReady]);

  const _loadData = async () => {
    let writerNo;
    if (isReady === false) {
      try {
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

        setCommunity(response.community);
        setComments([...comments, ...response.community.comments]);
        setLikeCnt(response.community.likeCnt);
        setUserNo(id);

        writerNo = response.community.writerNo;
        setIsReady(true);
      } catch (e) {
        console.log(t.print("FailedToBringUpThePost"), e.message);
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
        `${API_URL}/api/notification/token/${writerNo}`,
        config
      ).then((res) => res.json());
      setCommunityToken(response[0].token);
    } catch (e) {}
  };

  const increaseHit = async () => {
    try {
      spinner.start();
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
      spinner.stop();
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
          windowSize={3}
        />
      );
    }
    return (
      <NoCommentTitle>
        {t.print("ThereAreCurrentlyNoCommentsBeTheFirstToComment")}
      </NoCommentTitle>
    );
  };

  const onRefresh = React.useCallback(() => {
    setIsReady(false);
    setComments([]);
    wait(2000).then(() => setIsReady(true));
  }, []);

  const moveBackNavigation = () => {
    write !== undefined
      ? navigation.navigate("FreeBoardPage", { categoryNo, headerTitle })
      : navigation.goBack();
  };

  return isReady ? (
    <Container>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Header moveViewByNavigation={moveBackNavigation} title={headerTitle} />

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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

          <SeeMore
            divide={"Community"}
            navigation={navigation}
            communityNo={communityNo}
            categoryNo={categoryNo}
            headerTitle={headerTitle}
            setIsReady={setIsReady}
            userNo={userNo}
            writerNo={community.writerNo}
          />
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
          communityToken={communityToken}
        />
      </KeyboardAwareScrollView>
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" size="large" />
  );
};

export default DetailViewPage;
