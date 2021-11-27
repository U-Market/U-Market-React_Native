import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import SawList from "../../main/sawProducts/SawList";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background2};
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Transaction = ({ navigation }) => {
  const [status, setStatus] = useState("판매중");

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
          style={[styles.btnTab]}
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

  function SeeMainTab() {
    // if (status === "판매중") {
    //   return <SawList navigation={navigation} />;
    // } else if (status === "판매완료") {
    //   return <SawList navigation={navigation} />;
    // } else {
    //   return <SawList navigation={navigation} />;
    // }
    <Text>기능아직없음</Text>;
  }

  // function SeeMainTab() {
  //   if (status === "판매중") {
  //     return <SaleIng navigation={navigation} />;
  //   } else if (status === "판매완료") {
  //     return <SoldOut navigation={navigation} />;
  //   } else {
  //     return <Purchase navigation={navigation} />;
  //   }
  // }
  useEffect(() => {}, []);
  // if (isReady) {

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <Container>
        <View style={styles.listTab}>
          <>{_handleCurrentTab()}</>
        </View>
        {SeeMainTab()}
      </Container>
    </ScrollView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    alignItems: "flex-start",

    width: Dimensions.get("window").width,
  },
  btnTab: {
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
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
    borderTopWidth: 4,
    borderTopColor: "#FFC352",
  },
});
