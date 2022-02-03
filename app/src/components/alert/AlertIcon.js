import React from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
const Container = styled.TouchableOpacity`
  padding: 10px;

  width: 50px;
  position: absolute;
  right: 0px;
`;

const AlertIcon = ({ navigation }) => {
  const _handleAlertListPage = () => {
    // navigation.navigate("Alert");
    Alert.alert("아직 기능이 준비되지 않았습니다");
  };

  return (
    <Container onPress={_handleAlertListPage}>
      <MaterialIcons name="notifications-none" size={32} color="black" />
    </Container>
  );
};

export default AlertIcon;
