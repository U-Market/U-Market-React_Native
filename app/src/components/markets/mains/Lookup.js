import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import LookupList from "./LookupList";
import t from "../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin-top: 10px;
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
  color: ${({ theme }) => theme.text2};
`;

const PriceInputContainer = styled.View`
  width: 100%;
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
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

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const Lookup = ({
  navigation,
  setEndPrice,
  setStartPrice,
  isReady,
  onPress,
  isTitle,
}) => {
  return isReady ? (
    <Container>
      {isTitle ? <Title>{t.print("ViewByPrice")}</Title> : <></>}

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
        <PriceViewableBtn onPress={onPress}>
          <PriceViewableText>{t.print("View")}</PriceViewableText>
        </PriceViewableBtn>
      </PriceInputContainer>
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default Lookup;
