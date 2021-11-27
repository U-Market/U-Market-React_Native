import React, { useContext, useState, useEffect } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

import Header from "../../components/commons/Header";
import { ProgressContext, ReadyContext } from "../../contexts";
import Bookmark from "../../components/communitys/Bookmark";
import { getItemFromAsync } from "../../utills/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

function BookmarkPage({ navigation, route }) {
  const [bookmarks, setBookmarks] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const { isReady, readyDispatch } = useContext(ReadyContext);

  const { headerTitle } = route?.params;

  const _loadBoards = async () => {
    try {
      spinner.start();
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
      console.log(response);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() =>
          navigation.navigate("Main", { headerTitle })
        }
        title={headerTitle}
      />

      <FlatList
        keyExtractor={(bookmarks, index) => index.toString()}
        data={bookmarks}
        renderItem={({ item }) => (
          <Bookmark
            bookmarks={item}
            navigation={navigation}
            headerTitle={headerTitle}
          />
        )}
        windowSize={3} // 렌더링 되는양을 조절
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
}

export default BookmarkPage;
