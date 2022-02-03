import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert, ScrollView, RefreshControl } from "react-native";
import { API_URL } from "@env";

import Header from "../../components/commons/Header";
import Bookmark from "../../components/communitys/mains/Bookmark";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import NoBookMark from "../../components/communitys/mains/NoBookMark";

const Container = styled.SafeAreaView`
  flex: 1;
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

function BookmarkPage({ navigation, route }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { headerTitle } = route?.params;

  useEffect(() => {
    _loadData();
  }, [isReady]);

  const _loadData = async () => {
    try {
      const userNo = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/bookmarks/${userNo}`,
        config
      ).then((res) => res.json());

      setBookmarks(response.bookmarks);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      setIsReady(true);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsReady(true);
    wait(2000).then(() => setIsReady(false));
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() =>
          navigation.navigate("Main", { headerTitle })
        }
        title={headerTitle}
      />
      {bookmarks?.length !== undefined ? (
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            keyExtractor={(bookmarks, index) => index.toString()}
            data={bookmarks}
            renderItem={({ item }) => (
              <Bookmark
                bookmarks={item}
                navigation={navigation}
                headerTitle={headerTitle}
                setIsReady={setIsReady}
              />
            )}
            windowSize={3} // 렌더링 되는양을 조절
          />
        </ScrollView>
      ) : (
        <NoBookMark />
      )}
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
}

export default BookmarkPage;
