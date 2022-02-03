import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { API_URL } from "@env";

import TransactionItem from "./TransactionItem";
import { getItemFromAsync } from "../../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
  width: 100%;
  margin: 0;
  padding: 0;
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Transaction = ({ navigation }) => {
  const [status, setStatus] = useState("판매중");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const listTab = [
    { status: "판매중" },
    { status: "판매완료" },
    { status: "구매완료" },
  ];

  function _handleCurrentTab() {
    return listTab.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.btnTab,
            status === _menu.status && styles.btnTabActive,
          ]}
          onPress={() => {
            setStatusFilter(_menu.status);
          }}
        >
          <Text
            style={[
              styles.textTab,
              status === _menu.status && styles.TextTabActive,
            ]}
          >
            {_menu.status}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  const onRefresh = React.useCallback(() => {
    setIsLoading(false);
    wait(2000).then(() => setIsLoading(true));
  }, []);

  return (
    <Container>
      <View style={styles.listTab}>
        <>{_handleCurrentTab()}</>
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <TransactionItem
            navigation={navigation}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <ActivityIndicatorContainer color="#999999" />
        )}
      </ScrollView>
    </Container>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  btnTab: {
    width: 80,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnTabActive: {
    borderBottomWidth: 6,
    borderColor: "#FFC352",
    paddingBottom: 7,
  },

  textTab: {
    fontSize: 16,
    paddingTop: 10,
    color: "#979797",
  },
  TextTabActive: {
    color: "#222",
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
  },
});
