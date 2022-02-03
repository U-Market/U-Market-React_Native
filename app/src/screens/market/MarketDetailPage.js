import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { API_URL } from "@env";

import Header from "../../components/commons/Header";
import MarketDetailView from "../../components/markets/boards/marketDetails/MarketDetail";
import { ScrollView } from "react-native-gesture-handler";
import MarketBottom from "../../components/markets/boards/marketDetails/MarketBottom";
import SeeMore from "../../components/commons/SeeMore";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import t from "../../utils/translate/Translator";
import { ProgressContext } from "../../contexts";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketDetailPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [wish, setWish] = useState("");
  const [userNo, setUserNo] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [tradingStatus, setTradingStatus] = useState("");
  const [interestCnt, SetIntersetCnt] = useState("");

  const [relatedProducts, setRelatedProducts] = useState([]);
  const { spinner } = useContext(ProgressContext);

  const { categoryNo, productNo, headerTitle, images, write } = route?.params
    ?.productNo
    ? route.params
    : { categoryNo: undefined, productNo: undefined, headerTitle: undefined };

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
        `${API_URL}/api/products/${productNo}/${id}`,
        config
      ).then((res) => res.json());

      if (response?.product) {
        setProduct(response.product);
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
      setIsLoading(true);
    }
  };

  const increaseHit = async () => {
    try {
      spinner.start();
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
      console.log(e);
    } finally {
      spinner.stop();
    }
  };

  const _togleWatchlist = async () => {
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

  useEffect(() => {
    _loadDatas();
  }, [isLoading]);

  useEffect(() => {
    increaseHit();
  }, []);

  const moveBackNavigation = () => {
    write !== undefined ? navigation.navigate("Main") : navigation.goBack();
  };

  return isLoading ? (
    <Container>
      <Header moveViewByNavigation={moveBackNavigation} title={product.title} />

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

        <SeeMore
          divide={"Market"}
          navigation={navigation}
          productNo={productNo}
          categoryNo={categoryNo}
          headerTitle={headerTitle}
          setIsLoading={setIsLoading}
          userNo={userNo}
          writerNo={product.sellerNo}
        />
      </ScrollView>
      {isSeller ? (
        <></>
      ) : (
        <MarketBottom
          navigation={navigation}
          onPress={_togleWatchlist}
          chatStart={startChat}
          wish={wish}
        />
      )}
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default MarketDetailPage;
