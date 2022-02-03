import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { API_URL } from "@env";

import Watchlist from "../../../components/profiles/Watchlist";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import Header from "../../../components/commons/Header";
import NoWatchList from "../../../components/profiles/NoWatchlist";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const WatchlistPage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchlists, setWatchlists] = useState([]);

  const _loadBoards = async () => {
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
        `${API_URL}/api/watchlist/${Number(userNo)}`,
        config
      ).then((res) => res.json());

      setWatchlists(response.watchlists);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    _loadBoards();
  }, [isLoading]);

  return isLoading ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"관심목록"}
      />
      {watchlists?.length !== 0 ? (
        <Watchlist
          navigation={navigation}
          watchlists={watchlists}
          setIsLoading={setIsLoading}
        />
      ) : (
        <NoWatchList />
      )}
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default WatchlistPage;
