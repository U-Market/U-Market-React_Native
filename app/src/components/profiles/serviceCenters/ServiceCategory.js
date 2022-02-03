import React, { useContext } from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";

const Container = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  margin-top: 15px;
  height: 25%;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-left: 31px;
  padding-top: 20px;
`;

const Category = styled.TouchableOpacity`
  width: 85%;
  height: 24%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastCategory = styled.TouchableOpacity`
  width: 85%;
  height: 24%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
`;

const ServiceCategory = ({ navigation }) => {
  const _handleTradeRelated = async () => {
    navigation.navigate("TradeRelatedPage");
  };

  const _handleFilterHowToUse = async () => {
    Alert.alert("아직기능없음");
  };

  const _handleADRelated = async () => {
    navigation.navigate("ServiceCenterPage");
    Alert.alert("아직기능없음");
  };

  return (
    <Container>
      <Title>FAQ</Title>
      <Category onPress={_handleTradeRelated}>
        <Text style={{ paddingLeft: 5, paddingRight: 260 }}>거래 관련</Text>
        <AntDesign name="right" size={20} color={theme.main} />
      </Category>
      <Category onPress={_handleFilterHowToUse}>
        <Text style={{ paddingLeft: 5, paddingRight: 248 }}>필터 사용법</Text>
        <AntDesign name="right" size={20} color={theme.main} />
      </Category>
      <LastCategory onPress={_handleADRelated}>
        <Text style={{ paddingLeft: 5, paddingRight: 262 }}>광고 관련</Text>
        <AntDesign name="right" size={20} color={theme.main} />
      </LastCategory>
    </Container>
  );
};

export default ServiceCategory;
