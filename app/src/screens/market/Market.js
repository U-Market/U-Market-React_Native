import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import FAB from "react-native-fab";
import { MaterialIcons } from "@expo/vector-icons";

import { ReadyContext } from "../../contexts";
import MarketComponent from "../../components/markets/MarketComponent";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Market = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  const _handleWritePress = (params) => {
    navigation.navigate("MarketWritePage");
  };

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <MarketComponent navigation={navigation} />
      <FAB
        buttonColor="#FFC352"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" size={28} />}
      />
    </Container>
  );
};

export default Market;
