import React, { useState, useEffect } from "react";
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
import { FlatList } from "react-native-gesture-handler";

import PriceList from "./PriceList";
import t from "../../../utils/translate/Translator";

const NUMCOLUMNS = 3;
const INITIAL_START_NO = 0;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Price = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(t.print("Lower"));
  const [startNo, setStartNo] = useState(INITIAL_START_NO);
  const [products, setProducts] = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const listBtn = [{ status: t.print("Lower") }, { status: t.print("High") }];

  useEffect(() => {
    setIsReady(false);
    _setProductsByFetch();
  }, [status]);

  async function _setProductsByFetch() {
    try {
      const sort = status === t.print("Lower") ? "asc" : "desc";
      const response = await fetch(
        `${API_URL}/api/home/by-price?startNo=${startNo}&limit=${21}&sort=${sort}`
      ).then((res) => res.json());

      setProducts([...response.products]);
      setProductsLength(response.products.length);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }

  async function _setInfiniteScrollData() {
    try {
      const sort = status === t.print("Lower") ? "asc" : "desc";
      const response = await fetch(
        `${API_URL}/api/home/by-price?startNo=${startNo}&limit=${21}&sort=${sort}`
      ).then((res) => res.json());

      setProducts([...products, ...response.products]);
      setProductsLength(response.products.length);
      setRefreshing(false);
      setStartNo(response?.products[response.products.length - 1]?.no);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }

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

  function MainContents() {
    return (
      <>
        <View style={styles.listBtn}>
          <>{_handleCurrentBtn()}</>
        </View>
      </>
    );
  }

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const onRefresh = React.useCallback(() => {
    setIsReady(false);
    setStartNo(0);
    _setProductsByFetch();
    setRefreshing(true);
  }, []);

  const formatData = (products, NUMCOLUMNS) => {
    const totalRows = Math.floor(products.length / NUMCOLUMNS);
    let totalLastRow = products.length - totalRows * NUMCOLUMNS;
    while (totalLastRow !== 0 && totalLastRow !== NUMCOLUMNS) {
      products.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return products;
  };

  const _handleLoadMore = () => {
    _setInfiniteScrollData();
  };

  const renderLoader = () => {
    return <ActivityIndicatorContainer color="#999999" />;
  };

  function SeeMainTab() {
    if (productsLength === 21) {
      return (
        <FlatList
          keyExtractor={(products, index) => index.toString()}
          data={formatData(products, NUMCOLUMNS)}
          columnWrapperStyle={{
            justifyContent: "space-between",

            maxWidth: "100%",
          }}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          numColumns={NUMCOLUMNS}
          renderItem={({ item }) => (
            <PriceList
              products={item}
              navigation={navigation}
              setIsReady={setIsReady}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={1}
          ListFooterComponent={renderLoader}
        />
      );
    } else {
      return (
        <FlatList
          keyExtractor={(products, index) => index.toString()}
          data={formatData(products, NUMCOLUMNS)}
          columnWrapperStyle={{
            justifyContent: "space-between",

            maxWidth: "100%",
          }}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          numColumns={NUMCOLUMNS}
          renderItem={({ item }) => (
            <PriceList
              products={item}
              navigation={navigation}
              setIsReady={setIsReady}
            />
          )}
        />
      );
    }
  }

  return isReady ? (
    <Container>
      <>{MainContents()}</>
      <ScrollView style={{ flex: 1, width: "100%" }}>{SeeMainTab()}</ScrollView>
    </Container>
  ) : (
    <>{renderLoader()}</>
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
