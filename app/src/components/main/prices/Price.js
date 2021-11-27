import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";

import PriceList from "./PriceList";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Title = styled.Text`
  font-size: 20px;
  align-self: flex-start;
  padding: 10px 0px 10px 20px;
  font-weight: bold;
`;

const Price = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(t.print("Lower"));
  const [products, setProducts] = useState([]);

  const listBtn = [{ status: t.print("Lower") }, { status: t.print("High") }];

  function _handleCurrentBtn() {
    return listBtn.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[styles.btnTab, status === _menu.status && styles.BtnActive]}
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

  async function _setProductsByFetch() {
    const sort = status === t.print("Lower") ? "asc" : "desc";
    const response = await fetch(
      `${API_URL}/api/home/by-price?startNo=${1}&limit=${21}&sort=${sort}`
    ).then((res) => res.json());

    setProducts([...response.products]);
  }

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  function SeeMainTab() {
    return <PriceList navigation={navigation} products={products} />;
  }

  function MainContents() {
    return (
      <>
        <View style={styles.listBtn}>
          <>{_handleCurrentBtn()}</>
        </View>
      </>
    );
  }

  useEffect(() => {
    setIsReady(false);
  }, [status]);

  return isReady ? (
    <Container>
      <>{MainContents()}</>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Title>{status}</Title>
        {SeeMainTab()}
      </ScrollView>
    </Container>
  ) : (
    <AppLoading
      startAsync={_setProductsByFetch}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default Price;

const styles = StyleSheet.create({
  listBtn: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 5,
    flexDirection: "row",
    justifyContent: "center",
    margin: 3,
    borderWidth: 1,
    borderColor: "#FFDD9C",
    borderRadius: 10,
  },
  textTab: {
    fontSize: 14,
    margin: 5,
    color: "#222",
    alignSelf: "center",
  },
  TextTabActive: {
    color: "#fff",
  },
  BtnActive: {
    backgroundColor: "#FFC352",
  },
});
