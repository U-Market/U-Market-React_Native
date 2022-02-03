import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { RefreshControl, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../../utils/AsyncStorage";
import LookupList from "../../markets/mains/LookupList";
import t from "../../../utils/translate/Translator";

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
  margin-top: 10px;
  background-color: ${({ theme }) => theme.background};
`;

const MarketCategory = ({
  navigation,
  categoryNo,
  status,
  detail,
  selectedFilterData,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [userNo, setUserNo] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [startNo, setStartNo] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    _setProductsByFetch();
    setIsReady(false);
  }, [status]);

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

  async function _setProductsByFetch() {
    const query = getHttpQueryAboutFilter();
    const id = await getItemFromAsync("userNo");

    setUserNo(id);

    try {
      if (status === t.print("All")) {
        const response = await fetch(
          `${API_URL}/api/products/categories/${categoryNo}?startNo=${
            INITIAL_START_NO - 1
          }&limit=${20}${query}`
        ).then((res) => res.json());

        setProducts([...response.products]);
        setRefreshing(false);
        setProductsLength(response.products.length);
        setStartNo(response?.products[response.products.length - 1]?.no);
      } else {
        const response = await fetch(
          `${API_URL}/api/products/category?detailCategoryName=${detail}&startNo=${
            INITIAL_START_NO - 1
          }&limit=${20}${query}`
        ).then((res) => res.json());
        setProducts([...response.products]);
        setProductsLength(response.products.length);
        setRefreshing(false);
        setStartNo(response?.products[response.products.length - 1]?.no);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }

  async function _setInfiniteScrollData() {
    const query = getHttpQueryAboutFilter();
    const id = await getItemFromAsync("userNo");

    setUserNo(id);

    try {
      if (status === t.print("All")) {
        const response = await fetch(
          `${API_URL}/api/products/categories/${categoryNo}?startNo=${
            startNo - 1
          }&limit=${20}${query}`
        ).then((res) => res.json());

        setProducts([...products, ...response.products]);
        setRefreshing(false);
        setProductsLength(response.products.length);
        setStartNo(response?.products[response.products.length - 1]?.no);
      } else {
        const response = await fetch(
          `${API_URL}/api/products/category?detailCategoryName=${detail}&startNo=${
            startNo - 1
          }&limit=${20}${query}`
        ).then((res) => res.json());

        setProducts([...products, ...response.products]);
        setProductsLength(response.products.length);
        setRefreshing(false);
        setStartNo(response?.products[response.products.length - 1]?.no);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }

  const onRefresh = () => {
    setIsReady(false);
    _setProductsByFetch();
    setStartNo(0);
    setRefreshing(true);
  };

  const _handleLoadMore = () => {
    _setInfiniteScrollData();
  };

  const renderLoader = () => {
    return <ActivityIndicatorContainer color="#999999" size="large" />;
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
    <ScrollView>
      <Container>
        <>{checkProductsEmpty()}</>
      </Container>
    </ScrollView>
  ) : (
    <>{renderLoader()}</>
  );
};

export default MarketCategory;
