import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, View, StyleSheet } from "react-native";

import t from "../../../utills/translate/Translator";

const Container = styled.View`
  padding: 14px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  margin-bottom: 5px;
  font-size: 17px;
  font-family: ROBOTO_BOLD;
`;

const DamageStatusList = styled.View`
  flex: 7;
  flex-direction: row;
  margin-top: 6px;
`;

const SubTitle = styled.Text`
  flex: 1.5;
  margin-left: 14px;
  color: ${({ theme }) => theme.subTitle};
`;

const StatusList = styled.View`
  flex: 5.5;
  flex-direction: row;
`;

const StatusText = styled.Text`
  margin-right: 8px;

  font-family: ROBOTO_REGULAR;
  color: ${({ theme, isActive }) =>
    isActive ? theme.text : theme.placeholder};
`;

const DamageAndTradingMethod = ({ damageStatus, isDirect, isDelivery }) => {
  return (
    <>
      <Container>
        <Title>{t.print("DamageStatus")}</Title>
        <DamageStatusList>
          <SubTitle>{t.print("Status")}</SubTitle>
          <StatusList>
            <StatusText isActive={damageStatus === "최악"}>
              {t.print("Worst")}
            </StatusText>
            <StatusText isActive={damageStatus === "양호"}>
              {t.print("Good")}
            </StatusText>
            <StatusText isActive={damageStatus === "최상"}>
              {t.print("Best")}
            </StatusText>
          </StatusList>
        </DamageStatusList>
      </Container>
      <Container>
        <Title>{t.print("TransactionMethods")}</Title>
        <DamageStatusList style={styles.listTab}>
          <SubTitle style={styles.textTab}>{t.print("Direct")}</SubTitle>
          <StatusList>
            <StatusText isActive={isDirect === true}>
              {t.print("Possible")}
            </StatusText>
            <StatusText isActive={isDirect === false}>
              {t.print("Impossible")}
            </StatusText>
          </StatusList>
        </DamageStatusList>
        <DamageStatusList style={styles.listTab}>
          <SubTitle style={styles.textTab}>{t.print("Delivery")} </SubTitle>
          <StatusList>
            <StatusText isActive={isDelivery === true}>
              {t.print("Possible")}
            </StatusText>
            <StatusText isActive={isDelivery === false}>
              {t.print("Impossible")}
            </StatusText>
          </StatusList>
        </DamageStatusList>
      </Container>
    </>
  );
};

export default DamageAndTradingMethod;

const styles = StyleSheet.create({
  btnTab: {
    // flexDirection: "row",
    // justifyContent: "center",
  },
  textTab: {
    // fontSize: 14,
    // marginLeft: 15,
    // marginTop: 10,
    // color: "#404040",
  },
  TextTabActive: {
    // fontWeight: "600",
    // color: "#222222",
  },
  containerStyle: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "flex-end",
  },
  content: {
    // width: "95%",
    // height: "50%",
    // backgroundColor: "white",
    // overflow: "hidden",
  },
});
