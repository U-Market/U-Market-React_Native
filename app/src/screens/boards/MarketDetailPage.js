import React, { useContext, useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";
import { Entypo } from "@expo/vector-icons";

import { ProgressContext, ReadyContext } from "../../contexts";
import Header from "../../components/commons/Header";
import MarketDetailView from "../../components/boards/MarketDetail";
import { ScrollView } from "react-native-gesture-handler";
import MarketBottom from "../../components/boards/MarketBottom";
import SeeMore from "../../components/commons/SeeMore";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketDetailPage = ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [product, setProduct] = useState({});
  const [wish, setWish] = useState("");
  const [userNo, setUserNo] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [tradingStatus, setTradingStatus] = useState("");
  const [interestCnt, SetIntersetCnt] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);

  const { categoryNo, productNo, headerTitle, images } = route?.params
    ?.productNo
    ? route.params
    : { categoryNo: undefined, productNo: undefined, headerTitle: undefined };

  const { readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);

  const _loadDetailView = async () => {
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
        `${API_URL}/api/products/${productNo}/${id}`,
        config
      ).then((res) => res.json());

      if (response?.product) {
        setProduct(response.product);
        readyDispatch.notReady();
        setRelatedProducts(response.relatedProducts);
        setWish(response.product.watchlistFlag);
        setUserNo(id);
        setTradingStatus(response.product.tradingStatus);
        SetIntersetCnt(response.product.interestCnt);

        if (Number(id) === response.product.sellerNo) {
          setIsSeller(true);
        }
      } else {
        Alert.alert(t.print("FailedToBringUpThePost"));
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      spinner.stop();
    }

    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/products/${productNo}`,
        config
      ).then((res) => res.json());
    } catch (e) {
    } finally {
    }
  };

  const _togleWish = async () => {
    if (Number(wish)) {
      try {
        spinner.start();
        const config = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productNo: product.no,
            userNo: Number(userNo),
          }),
        };

        const response = await fetch(`${API_URL}/api/watchlist`, config).then(
          (res) => res.json()
        );
        setWish(!wish);
        SetIntersetCnt(interestCnt - 1);
      } catch (e) {
        Alert.alert(t.print("FailedToRemoveFromWatchlist"), e.message);
      } finally {
        spinner.stop();
      }
    } else {
      try {
        spinner.start();
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productNo: product.no,
            userNo: Number(userNo),
          }),
        };

        const response = await fetch(`${API_URL}/api/watchlist`, config).then(
          (res) => res.json()
        );
        setWish(!wish);
        SetIntersetCnt(interestCnt + 1);
      } catch (e) {
        Alert.alert(t.print("FailedToRegisterToWatchlist"), e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  const startChat = () => {
    navigation.navigate("ChatScreenPage", {
      sellerNo: product.sellerNo,
      profileUrl: product.profileUrl,
      nickname: product.nickname,
      title: product.title,
      productNo: product.no,
      thumbnail: product.thumbnail,
    });
  };

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={t.print(product.categoryName)}
      />

      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <MarketDetailView
          navigation={navigation}
          product={product}
          relatedProducts={relatedProducts}
          images={images}
          userNo={userNo}
          isSeller={isSeller}
          tradingStatus={tradingStatus}
          setTradingStatus={setTradingStatus}
          interestCnt={interestCnt}
        />
        {product.sellerNo === Number(userNo) ? (
          <SeeMore
            divide={"Market"}
            navigation={navigation}
            productNo={productNo}
            categoryNo={categoryNo}
            headerTitle={headerTitle}
            setIsReady={setIsReady}
          />
        ) : (
          <></>
        )}
      </ScrollView>
      {isSeller ? (
        <></>
      ) : (
        <MarketBottom
          navigation={navigation}
          onPress={_togleWish}
          chatStart={startChat}
          wish={wish}
        />
      )}
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadDetailView}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default MarketDetailPage;
