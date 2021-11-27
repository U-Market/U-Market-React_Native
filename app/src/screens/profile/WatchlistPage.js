import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";

import { ReadyContext, ProgressContext } from "../../contexts";
import Watchlist from "../../components/profiles/Watchlist";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const WatchlistPage = ({ navigation }) => {
  const [watchlists, setWatchlists] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const { isReady, readyDispatch } = useContext(ReadyContext);

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
        `${API_URL}/api/watchlist/${Number(userNo)}`,
        config
      ).then((res) => res.json());

      setWatchlists(response.watchlists);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleDetailViewPress = () => {
    readyDispatch.notReady();
    navigation.navigate("MarketDetailPage", {
      productNo: watchlists.no,
      headerTitle: watchlists.title,
    });
  };

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"관심목록"}
      />
      <Watchlist
        navigation={navigation}
        watchlists={watchlists}
        onPress={_handleDetailViewPress}
      />
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadBoards}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
};

export default WatchlistPage;
