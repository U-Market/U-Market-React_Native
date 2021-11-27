import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ReadyContext } from "../../contexts";

const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  border-color: ${({ theme }) => theme.listBorder};
  border-bottom-width: 2px;
  background-color: ${({ theme }) => theme.background};
`;

const Icon = styled.TouchableOpacity`
  padding: 10px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

const Header = ({ title, moveViewByNavigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    return () => {
      readyDispatch.notReady();
    };
  }, []);

  return (
    <Container>
      <Icon onPress={moveViewByNavigation}>
        <Feather name="chevron-left" size={24} color="#FFAE52" />
      </Icon>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
