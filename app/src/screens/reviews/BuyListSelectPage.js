import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";

import { ReadyContext, ProgressContext } from "../../contexts";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import Header from "../../components/commons/Header";
import BuyerList from "../../components/reviews/BuyerList";

import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const BuyListSelectPage = ({ navigation, route }) => {
  const [buyerList, setBuyerList] = useState("");
  const [userNo, setUserNo] = useState("");
  const [isReady, setIsReady] = useState(false);

  const { productNo, isSeller } = route?.params;

  const { spinner } = useContext(ProgressContext);

  const _loaddatas = async () => {
    try {
      spinner.start();
      const id = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/review/${id}?product=${productNo}`,
        config
      ).then((res) => res.json());
      setUserNo(id);
      setBuyerList(response.buyerList);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={t.print("구매자 리스트")}
      />
      <FlatList
        keyExtractor={(buyerList, index) => index.toString()}
        data={buyerList}
        renderItem={({ item }) => (
          <BuyerList
            buyerList={item}
            navigation={navigation}
            productNo={productNo}
            userNo={userNo}
            isSeller={isSeller}
            setIsReady={setIsReady}
          />
        )}
        windowSize={3} //렌더링 되는양을 조절
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loaddatas}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default BuyListSelectPage;
