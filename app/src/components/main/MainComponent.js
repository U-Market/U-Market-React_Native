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
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Today from "./todays/Today";
import Price from "./prices/Price";
import SawProduct from "./sawProducts/SawProduct";
import AlertIcon from "../alert/AlertIcon";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

const MainTop = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.main};
`;

const SearchContainer = styled.TouchableOpacity`
  width: 100%;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.View`
  border: 2px;
  border-color: ${({ theme }) => theme.main};
  width: 94%;
  border-radius: 5px;
  padding-left: 15px;
  height: 40px;
`;

const SearchTitle = styled.Text`
  font-size: 12px;
  height: 40px;
  line-height: 32px;
  color: ${({ theme }) => theme.text2};
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 40px;
`;

const MainHeaderTitle = styled.View`
  width: 100%;
  margin-left: 15px;
`;

const MainComponent = ({ navigation }) => {
  const [status, setStatus] = useState("TODAY");
  const [search, setSearch] = useState("");

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const listTab = [
    { status: "TODAY" },
    { status: t.print("ByPrice") },
    // { status: t.print("ViewedProducts") },
  ];

  function _handleCurrentTab() {
    return listTab.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[styles.btnTab, status == _menu.status && styles.btnTabActive]}
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
    if (status === "TODAY") {
      return <Today navigation={navigation} />;
    } else if (status === t.print("ByPrice")) {
      return <Price navigation={navigation} />;
    }
    // else {
    //   return <SawProduct navigation={navigation} />;
    // }
  }

  const _handelMarketSelectPage = () => {
    navigation.navigate("MarketSearchPage");
  };

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <Container>
        <MainTop>
          <HeaderContainer>
            <MainHeaderTitle>
              <Image
                style={{ height: 40, width: 150 }}
                source={require("../../icons/umarket.png")}
              />
            </MainHeaderTitle>
            <AlertIcon navigation={navigation}></AlertIcon>
          </HeaderContainer>
          <SearchContainer onPress={_handelMarketSelectPage}>
            <SearchInput>
              <SearchTitle>{t.print("searchComment")}</SearchTitle>
            </SearchInput>
            <Icon>
              <FontAwesome5 name="search" size={20} color="#FFC352" />
            </Icon>
          </SearchContainer>
          <View style={styles.listTab}>
            <>{_handleCurrentTab()}</>
          </View>
        </MainTop>
        {SeeMainTab()}
      </Container>
    </ScrollView>
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    marginTop: 10,
    marginLeft: 20,
  },
  btnTab: {
    flexDirection: "row",
    marginLeft: 10,
    alignSelf: "center",
  },
  btnTabActive: {
    borderBottomWidth: 4,
    borderBottomColor: "#222",
  },
  textTab: {
    fontSize: 16,
    margin: 5,
    color: "#222",
    opacity: 0.5,
  },
  TextTabActive: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",

    opacity: 1,
  },
});
