import React from "react";
import styled from "styled-components/native";

import Header from "../../../components/commons/Header";
import Transaction from "../../../components/profiles/transactions/Transaction";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const TransactionPage = ({ navigation }) => {
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"거래내역"}
      />
      <Transaction navigation={navigation} />
    </Container>
  );
};

export default TransactionPage;
