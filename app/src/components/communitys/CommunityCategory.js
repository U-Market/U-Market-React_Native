import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text, Image, View } from "react-native";

import t from "../../utills/translate/Translator";

const Container = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  margin-top: 15px;
  height: 280px;
`;

const Icon = styled.TouchableOpacity`
  width: 85%;
  height: 25%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastIcon = styled.TouchableOpacity`
  width: 85%;
  height: 25%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
`;

const CommunityCategory = ({ iconSize, navigation }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Icon
        onPress={() =>
          navigation.navigate("FreeBoardPage", {
            categoryNo: 1,
            headerTitle: t.print("ForFree"),
          })
        }
      >
        <View>
          <Image source={require("../../icons/community/free.png")} />
        </View>
        <Text style={{ paddingLeft: 10 }}>{t.print("ForFree")}</Text>
      </Icon>
      <Icon
        onPress={() =>
          navigation.navigate("FreeBoardPage", {
            categoryNo: 2,
            headerTitle: t.print("ForLivingAlone"),
          })
        }
      >
        <View>
          <Image source={require("../../icons/community/alone.png")} />
        </View>
        <Text style={{ paddingLeft: 10 }}>{t.print("ForLivingAlone")}</Text>
      </Icon>
      <Icon
        onPress={() =>
          navigation.navigate("FreeBoardPage", {
            categoryNo: 3,
            headerTitle: t.print("ForPromotion"),
          })
        }
      >
        <View>
          <Image source={require("../../icons/community/promotion.png")} />
        </View>
        <Text style={{ paddingLeft: 10 }}>{t.print("ForPromotion")}</Text>
      </Icon>
      <LastIcon
        onPress={() => Alert.alert(`${t.print("TheresNoFunctionYet")}`)}
      >
        <View>
          <Image source={require("../../icons/community/AD.png")} />
        </View>
        <Text style={{ paddingLeft: 10 }}>{t.print("AdvertisingInquiry")}</Text>
      </LastIcon>
    </Container>
  );
};

export default CommunityCategory;
