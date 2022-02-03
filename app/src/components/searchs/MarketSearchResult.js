import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import LookupList from "../markets/mains/LookupList";

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

const MarketSearchResult = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [products, setProducts] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const formatData = (searchList, NUMCOLUMNS) => {
    const totalRows = Math.floor(searchList.length / NUMCOLUMNS);
    let totalLastRow = searchList.length - totalRows * NUMCOLUMNS;
    while (totalLastRow !== 0 && totalLastRow !== NUMCOLUMNS) {
      searchList.push({ key: "blank", empty: true });
      totalLastRow++;
    }

    return searchList;
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

export default MarketSearchResult;
