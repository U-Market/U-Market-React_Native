import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert, RefreshControl } from "react-native";
import { API_URL } from "@env";
import Header from "../../components/commons/Header";

import Lookup from "../../components/markets/mains/Lookup";
import LookupList from "../../components/markets/mains/LookupList";

const MAX_PRICE = 4200000000;
const NUMCOLUMNS = 2;
const INITIAL_START_NO = 0;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  margin: 6px 0 0px 20px;
  color: ${({ theme }) => theme.placeholder};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

function LookupPage({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [startNo, setStartNo] = useState(INITIAL_START_NO);
  const [products, setProducts] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [newStartPrice, setNewStartPrice] = useState(0);
  const [newEndPrice, setNewEndPrice] = useState(MAX_PRICE);
  const [productsLength, setProductsLength] = useState(0);
  const [updatedStartPrice, setUpdatedStartPrice] = useState(0);

  const { startPrice, endPrice, selectedFilterData } = route?.params;

  useEffect(() => {
    _setProductsByFetch();
  }, []);

  function getHttpQueryAboutFilter() {
    let query = "";
    // 필터 중 선택된게 있으면 Query를 추가한다.
    if (selectedFilterData.selectedRegion.item) {
      query += `&regionNo=${selectedFilterData.selectedRegion.value}`;
    }
    if (selectedFilterData.selectedSchool.item) {
      query += `&schoolNo=${selectedFilterData.selectedSchool.value}`;
    }
    if (selectedFilterData.selectedDepartment.item) {
      query += `&departmentNo=${selectedFilterData.selectedDepartment.value}`;
    }
    if (selectedFilterData.selectedMajor.item) {
      query += `&majorNo=${selectedFilterData.selectedMajor.value}`;
    }
    return query;
  }

  const _setProductsByFetch = async () => {
    try {
      const query = getHttpQueryAboutFilter();
      const response = await fetch(
        `${API_URL}/api/products?startNo=${
          startNo - 1
        }&limit=${20}&startPriceRange=${startPrice}&endPriceRange=${endPrice}${query}`
      ).then((res) => res.json());

      setProducts([...products, ...response.products]);
      setProductsLength(response.products.length);
      setRefreshing(false);
      setStartNo(response?.products[response.products.length - 1]?.no);
      setUpdatedStartPrice(
        response.products[response.products.length - 1].price
      );
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  async function _setInfiniteScrollData() {
    try {
      const query = getHttpQueryAboutFilter();
      const response = await fetch(
        `${API_URL}/api/products?startNo=${
          startNo - 1
        }&limit=${20}&startPriceRange=${updatedStartPrice}&endPriceRange=${newEndPrice}${query}`
      ).then((res) => res.json());

      setProducts([...products, ...response.products]);
      setProductsLength(response.products.length);
      setRefreshing(false);
      setStartNo(response?.products[response.products.length - 1]?.no);
      setUpdatedStartPrice(response.products[0].price);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }

  const pressLookupButton = async () => {
    try {
      setIsReady(false);
      const query = getHttpQueryAboutFilter();
      const response = await fetch(
        `${API_URL}/api/products?startNo=${INITIAL_START_NO}&limit=${20}&startPriceRange=${newStartPrice}&endPriceRange=${newEndPrice}${query}`
      ).then((res) => res.json());

      if (response?.products.length !== 0) {
        setProducts([...response.products]);
        setProductsLength(response.products.length);
        setRefreshing(false);
        setStartNo(response?.products[response.products.length - 1]?.no);
        setUpdatedStartPrice(
          response.products[response.products.length - 1].price
        );
      } else {
        setProducts([...response.products]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  const formatData = (products, NUMCOLUMNS) => {
    const totalRows = Math.floor(products.length / NUMCOLUMNS);
    let totalLastRow = products.length - totalRows * NUMCOLUMNS;
    while (totalLastRow !== 0 && totalLastRow !== NUMCOLUMNS) {
      products.push({ key: "blank", empty: true });
      totalLastRow++;
    }
    return products;
  };

  const onRefresh = React.useCallback(() => {
    setIsReady(false);
    setStartNo(0);
    _setProductsByFetch();
    setRefreshing(true);
  }, []);

  const _handleLoadMore = () => {
    _setInfiniteScrollData();
  };

  const renderLoader = () => {
    return <ActivityIndicatorContainer color="#999999" />;
  };

  const checkProductsEmpty = () => {
    if (products.length) {
      if (productsLength === 20) {
        return (
          <FlatList
            keyExtractor={(products, index) => index.toString()}
            data={formatData(products, NUMCOLUMNS)}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 12,
              maxWidth: "100%",
            }}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            numColumns={NUMCOLUMNS}
            renderItem={({ item }) => (
              <LookupList
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
              marginBottom: 12,
              maxWidth: "100%",
            }}
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
            numColumns={NUMCOLUMNS}
            renderItem={({ item }) => (
              <LookupList
                products={item}
                navigation={navigation}
                setIsReady={setIsReady}
              />
            )}
          />
        );
      }
    } else {
      return <Text>해당 중고물품이 없습니다.</Text>;
    }
  };

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title="가격별 조회"
      />
      <Lookup
        navigation={navigation}
        setIsReady={setIsReady}
        isReady={isReady}
        onPress={pressLookupButton}
        setEndPrice={setNewEndPrice}
        setStartPrice={setNewStartPrice}
        isTitle={false}
      />
      <>{checkProductsEmpty()}</>
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
}

export default LookupPage;
