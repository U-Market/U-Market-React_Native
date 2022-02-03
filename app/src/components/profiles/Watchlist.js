import React from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import WatchlistItem from "./WatchlistItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))``;

const Watchlist = ({ watchlists, navigation, setIsLoading }) => {
  const _watchlistItems = () => {
    const Items = watchlists.map((watchlist) => {
      return (
        <WatchlistItem
          key={watchlist.no}
          no={watchlist.no}
          imgUrl={watchlist.thumbnail}
          itemTitle={watchlist.title}
          price={watchlist.price}
          statusNum={watchlist.statusNum}
          commentCount={watchlist.commentCount}
          navigation={navigation}
          setIsLoading={setIsLoading}
        />
      );
    });

    return Items;
  };

  return (
    <ScrollView>
      <View style={styles.stylegridView}>{_watchlistItems()}</View>
    </ScrollView>
  );
};

export default Watchlist;

const styles = StyleSheet.create({
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 80,
  },
});
