import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import t from "../../../utills/translate/Translator";

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

const DetailInsert = ({ setDamageStatusNo, setIsDirect, setIsDelivery }) => {
  const [status, setStatus] = useState({
    damageStatus: t.print("Good"),
    direct: t.print("Possible"),
    delivery: t.print("Possible"),
  });

  const mappingData = {
    damageStatus: [
      { itemStatus: t.print("Worst"), no: 1 },
      { itemStatus: t.print("Good"), no: 2 },
      { itemStatus: t.print("Best"), no: 3 },
    ],
    delivery: [
      { itemStatus: t.print("Possible"), isAbleTo: true },
      { itemStatus: t.print("Impossible"), isAbleTo: false },
    ],
    direct: [
      { itemStatus: t.print("Possible"), isAbleTo: true },
      { itemStatus: t.print("Impossible"), isAbleTo: false },
    ],
  };

  const setStatusFilter = (itemStatus, type) => {
    setStatus({
      ...status,
      [type]: itemStatus,
    });
  };

  function _damageStatus() {
    return mappingData.damageStatus.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.btnTab,
            status.damageStatus === _menu.itemStatus && styles.BtnTabActive,
          ]}
          onPress={() => {
            setStatusFilter(_menu.itemStatus, "damageStatus");
            setDamageStatusNo(_menu.no);
          }}
        >
          <Text
            style={[
              status.damageStatus === _menu.itemStatus && styles.TextTabActive,
            ]}
          >
            {_menu.itemStatus}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  function _directStatus() {
    return mappingData.direct.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.btnTab,
            status.direct === _menu.itemStatus && styles.BtnTabActive,
          ]}
          onPress={() => {
            setStatusFilter(_menu.itemStatus, "direct");
            setIsDirect(_menu.isAbleTo);
          }}
        >
          <Text
            style={[status.direct === _menu.itemStatus && styles.TextTabActive]}
          >
            {_menu.itemStatus}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  function _deliveryStatus() {
    return mappingData.delivery.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.btnTab,
            status.delivery === _menu.itemStatus && styles.BtnTabActive,
          ]}
          onPress={() => {
            setStatusFilter(_menu.itemStatus, "delivery");
            setIsDelivery(_menu.isAbleTo);
          }}
        >
          <Text
            style={[
              status.delivery === _menu.itemStatus && styles.TextTabActive,
            ]}
          >
            {_menu.itemStatus}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  return (
    <>
      <StatusContainer>
        <StatusTitle>{t.print("DamageStatus")}</StatusTitle>
        <View style={styles.listTab}>
          <Text style={styles.textTab}></Text>
          <>{_damageStatus()}</>
        </View>
      </StatusContainer>
      <TradeWayContainer>
        <TradeWayTitle>{t.print("TransactionMethods")}</TradeWayTitle>
        <View style={styles.listTab}>
          <TradingMethodTitle>{t.print("Direct")}</TradingMethodTitle>
          <>{_directStatus()}</>
        </View>
        <View style={styles.listTab}>
          <TradingMethodTitle>{t.print("Delivery")}</TradingMethodTitle>
          <>{_deliveryStatus()}</>
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
