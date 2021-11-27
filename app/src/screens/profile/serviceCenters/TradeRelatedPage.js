import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

import { ReadyContext } from "../../../contexts";
import Header from "../../../components/commons/Header";
import TradeRelated from "../../../components/profiles/serviceCenters/TradeRelated";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ServiceCenterPage = ({ navigation }) => {
  const { readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return (
    <Container>
      <Header moveViewByNavigation={() => navigation.goBack()} title={"FAQ"} />
      <TradeRelated />
    </Container>
  );
};

export default ServiceCenterPage;
