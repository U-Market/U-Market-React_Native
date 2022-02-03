import React from "react";
import styled from "styled-components/native";
import { StyleSheet, View } from "react-native";
import t from "../../../../utils/translate/Translator";

const Text = styled.Text`
  justify-content: center;
  align-self: center;
  font-size: 14px;
  font-family: ROBOTO_REGULAR;
  font-weight: bold;
  color: ${({ theme }) => theme.placeholder};
`;

const StatusContainer = styled.View`
  padding: 10px 0 10px 4px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const StatusTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const TradeWayContainer = styled.View`
  padding: 10px 0 10px 4px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const TradeWayTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const TradingMethodTitle = styled.Text`
  justify-content: center;
  align-self: center;
  width: 56px;
  font-size: 14px;
  font-family: ROBOTO_REGULAR;
  font-weight: bold;
  color: ${({ theme }) => theme.subTitle};
`;

const StatusList = styled.View`
  flex: 5.5;
  flex-direction: row;
`;

const StatusBtn = styled.TouchableOpacity`
  border-width: 1px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px 10px 5px 10px;
  font-family: ROBOTO_REGULAR;
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.background : theme.mainOrange};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.mainOrange : theme.background};
`;

const StatusText = styled.Text`
  font-family: ROBOTO_REGULAR;
  color: ${({ theme, isActive }) =>
    isActive ? theme.background : theme.placeholder};
`;

const DetailInsert = ({
  setDamageStatus,
  setIsDirect,
  setIsDelivery,
  isDelivery,
  isDirect,
  damageStatus,
}) => {
  return (
    <>
      <StatusContainer>
        <StatusTitle>{t.print("DamageStatus")}</StatusTitle>
        <View style={styles.listTab}>
          <StatusList>
            <StatusBtn
              isActive={damageStatus === "최악"}
              onPress={() => setDamageStatus("최악")}
            >
              <StatusText isActive={damageStatus === "최악"}>
                {t.print("Worst")}
              </StatusText>
            </StatusBtn>
            <StatusBtn
              isActive={damageStatus === "양호"}
              onPress={() => setDamageStatus("양호")}
            >
              <StatusText isActive={damageStatus === "양호"}>
                {t.print("Good")}
              </StatusText>
            </StatusBtn>
            <StatusBtn
              isActive={damageStatus === "최상"}
              onPress={() => setDamageStatus("최상")}
            >
              <StatusText isActive={damageStatus === "최상"}>
                {t.print("Best")}
              </StatusText>
            </StatusBtn>
          </StatusList>
        </View>
      </StatusContainer>
      <TradeWayContainer>
        <TradeWayTitle>{t.print("TransactionMethods")}</TradeWayTitle>
        <View style={styles.listTab}>
          <TradingMethodTitle>{t.print("Direct")}</TradingMethodTitle>
          <StatusBtn isActive={isDirect} onPress={() => setIsDirect(true)}>
            <StatusText isActive={isDirect}>{t.print("Possible")}</StatusText>
          </StatusBtn>
          <StatusBtn isActive={!isDirect} onPress={() => setIsDirect(false)}>
            <StatusText isActive={!isDirect}>
              {t.print("Impossible")}
            </StatusText>
          </StatusBtn>
        </View>
        <View style={styles.listTab}>
          <TradingMethodTitle>{t.print("Delivery")}</TradingMethodTitle>
          <StatusBtn isActive={isDelivery} onPress={() => setIsDelivery(true)}>
            <StatusText isActive={isDelivery}>{t.print("Possible")}</StatusText>
          </StatusBtn>
          <StatusBtn
            isActive={!isDelivery}
            onPress={() => setIsDelivery(false)}
          >
            <StatusText isActive={!isDelivery}>
              {t.print("Impossible")}
            </StatusText>
          </StatusBtn>
        </View>
      </TradeWayContainer>
    </>
  );
};

export default DetailInsert;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
  },
  btnTab: {
    borderWidth: 1,
    borderColor: "#FFAE52",
    borderRadius: 5,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 10,
  },

  BtnTabActive: {
    backgroundColor: "#FFAE52",
  },

  textTab: {
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",

    color: "#979797",
  },

  TextTabActive: {
    color: "#fff",
  },
  Tag: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
    color: "#ffc352",
  },
});
