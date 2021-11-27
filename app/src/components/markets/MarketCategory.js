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
import { getItemFromAsync } from "../../utills/AsyncStorage";

import CategoryList from "../markets/CategoryList";
import Header from "../commons/Header";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketCategory = ({
  navigation,
  headerTitle,
  categoryNo,
  status,
  detail,
  searchList,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [userNo, setUserNo] = useState("");

  useEffect(() => {
    setIsReady(false);
  }, [status]);

  async function _setProductsByFetch() {
    const id = await getItemFromAsync("userNo");

    setUserNo(id);

    if (status === t.print("All")) {
      const response = await fetch(
        `${API_URL}/api/products/category/${categoryNo}`
      ).then((res) => res.json());

      setProducts([...response.products]);
      console.log(response);
    } else {
      const response = await fetch(
        `${API_URL}/api/products/category?detail=${detail}`
      ).then((res) => res.json());
      setProducts([...response.products]);
      console.log(response);
    }
  }

  return isReady ? (
    <Container>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <CategoryList
          navigation={navigation}
          products={products}
          searchList={searchList}
        />
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

export default MarketCategory;
