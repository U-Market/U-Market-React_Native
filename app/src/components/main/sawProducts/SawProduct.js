import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, ScrollView, Alert } from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utills/AsyncStorage";

import SawList from "./SawList";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background2};
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 20px;
  align-self: flex-start;
  padding: 10px 0px 10px 20px;
  font-weight: bold;
`;

const DeleteBtn = styled.TouchableOpacity`
  height: 25px;
  width: 80px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 12px;
  background-color: ${({ theme }) => theme.main};
`;

const SawProduct = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState([]);

  const _handleDelete = () => {
    Alert.alert(t.print("HasBeenDeleted"));
  };

  async function _setProductsByFetch() {
    const id = await getItemFromAsync("userNo");
    const response = await fetch(
      `${API_URL}/api/home/users/${Number(
        id
      )}/viewed-products?startNo=${1}&limit=${20}`
    ).then((res) => res.json());

    setProducts([...response.products]);
  }

  function MainContents() {
    return (
      <>
        <Title>{t.print("ViewedProducts")}</Title>
        <DeleteBtn onPress={_handleDelete}>
          <Text style={{ color: "#fff", fontSize: 11 }}>
            {t.print("DeleteAll")}
          </Text>
        </DeleteBtn>

        <ScrollView>
          <SawList navigation={navigation} products={products} />
        </ScrollView>
      </>
    );
  }

  return isReady ? (
    <Container>
      <>{MainContents()}</>
    </Container>
  ) : (
    <AppLoading
      startAsync={_setProductsByFetch}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default SawProduct;
