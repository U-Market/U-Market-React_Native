import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";

import { ReadyContext } from "../../contexts";
import LookupList from "./LookupList";
import t from "../../utills/translate/Translator";

const MAX_PRICE = 4200000000;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin-top: 20px;
  padding: 0;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 20px;
  width: 100%;
  align-self: flex-start;
  padding: 0px 0px 0px 20px;
  font-weight: bold;
`;

const SubTitleContainer = styled.View`
  width: 100%;
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
`;

const SubTitle = styled.Text`
  background-color: ${({ theme }) => theme.background};
  width: 80%;
  color: ${({ theme }) => theme.label};
`;

const PriceInputContainer = styled.View`
  width: 100%;
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
`;

const PriceInput = styled.TextInput.attrs({
  keyboardType: "numeric",
})`
  background-color: ${({ theme }) => theme.background};
  width: 20%;
  height: 30px;
  margin-top: 2px;
  padding-left: 6px;
  border: solid 1px ${({ theme }) => theme.main};
  border-radius: 4px;
`;

const PriceViewableBtn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 30px;
  margin-left: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

const PriceViewableText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.background};
  text-align: center;
  align-items: center;
`;

const Lookup = ({ navigation, selectedFilterData }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(MAX_PRICE);
  const [products, setProducts] = useState([]);

  const { isReady, readyDispatch } = useContext(ReadyContext);

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
    const response = await fetch(
      `${API_URL}/api/products?startNo=${1}&limit=${20}&startPriceRange=${startPrice}&endPriceRange=${endPrice}${query}`
    ).then((res) => res.json());

    setProducts([...response.products]);
  }

  return isReady ? (
    <Container>
      <Title>{t.print("ViewByPrice")}</Title>
      <SubTitleContainer>
        <SubTitle>{t.print("YouCanSearchThePriceRangeYouWant")}</SubTitle>
      </SubTitleContainer>
      <PriceInputContainer>
        <PriceInput
          onChangeText={(price) => setStartPrice(price.length ? price : 0)}
          placeholder={t.print("Won")}
        />
        <Text> ~ </Text>
        <PriceInput
          onChangeText={(price) =>
            setEndPrice(price.length ? price : MAX_PRICE)
          }
          placeholder={t.print("Won")}
        />
        <PriceViewableBtn onPress={_setProductsByFetch}>
          <PriceViewableText>{t.print("View")}</PriceViewableText>
        </PriceViewableBtn>
      </PriceInputContainer>
      <LookupList navigation={navigation} products={products} />
    </Container>
  ) : (
    <AppLoading
      startAsync={_setProductsByFetch}
      onFinish={() => readyDispatch.ready()}
      onError={console.warn}
    />
  );
};

export default Lookup;
