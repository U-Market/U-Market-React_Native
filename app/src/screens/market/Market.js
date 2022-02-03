import React from "react";
import styled from "styled-components/native";
import FAB from "react-native-fab";
import { MaterialIcons } from "@expo/vector-icons";

import MarketComponent from "../../components/markets/mains/MarketComponent";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Market = ({ navigation }) => {
  const _handleWritePress = (params) => {
    navigation.navigate("MarketWritePage");
  };

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
