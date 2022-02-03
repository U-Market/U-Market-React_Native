import React from "react";
import styled from "styled-components/native";
import { Text, Image, View, Alert } from "react-native";

import t from "../../utils/translate/Translator";

const Container = styled.View`
  width: 100%;
  height: 170px;
  border: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-left: 31px;
  padding-top: 20px;
`;

const ActionBtnContainer = styled.View`
  width: 100%;
  flex-direction: row;

  align-items: flex-end;
  justify-content: center;
`;

const Icon = styled.TouchableOpacity`
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  width: 22%;
`;

const Line = styled.Text`
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
`;

const MyActivity = ({ navigation }) => {
  const moveTransactionHistroy = async () => {
    navigation.navigate("TransactionPage");
  };

  const moveWatchlist = async () => {
    navigation.navigate("WatchlistPage");
  };

  const moveReviewManagement = async () => {
    navigation.navigate("ReviewManagementPage");
  };

  const moveCoupon = async () => {
    // navigation.navigate("CouponPage");
    Alert.alert(`${t.print("TheresNoFunctionYet")}`);
  };

  return (
    <Container>
      <Title>{t.print("MyActivities")}</Title>
      <ActionBtnContainer>
        <Icon onPress={moveTransactionHistroy}>
          <View>
            <Image source={require("../../icons/mypage/tradeList.png")} />
          </View>
          <Text>{t.print("Tradings")}</Text>
        </Icon>
        <Line>│</Line>
        <Icon onPress={moveWatchlist}>
          <View>
            <Image source={require("../../icons/mypage/heart.png")} />
          </View>
          <Text style={{}}>{t.print("Interests")}</Text>
        </Icon>
        <Line>│</Line>
        <Icon onPress={moveReviewManagement}>
          <View>
            <Image source={require("../../icons/mypage/ReviewList.png")} />
          </View>
          <Text style={{}}>{t.print("Reviews")}</Text>
        </Icon>
        <Line>│</Line>
        <Icon onPress={moveCoupon}>
          <View>
            <Image source={require("../../icons/mypage/coupon.png")} />
          </View>
          <Text style={{}}>{t.print("Coupons")}</Text>
        </Icon>
      </ActionBtnContainer>
    </Container>
  );
};

export default MyActivity;
