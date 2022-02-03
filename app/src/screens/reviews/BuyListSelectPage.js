import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { API_URL } from "@env";
import { FlatList } from "react-native-gesture-handler";

import { getItemFromAsync } from "../../utils/AsyncStorage";
import Header from "../../components/commons/Header";
import BuyerList from "../../components/reviews/BuyerList";

import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const BuyListSelectPage = ({ navigation, route }) => {
  const [buyerList, setBuyerList] = useState("");
  const [userNo, setUserNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { productNo, isSeller } = route?.params;

  const _loadDatas = async () => {
    try {
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
      setIsLoading(true);
    }
  };

  useEffect(() => {
    _loadDatas();
  }, [isLoading]);

  return isLoading ? (
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
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        windowSize={3}
      />
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default BuyListSelectPage;
