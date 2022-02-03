import React from "react";
import styled from "styled-components/native";

import t from "../../../../utils/translate/Translator";

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
        <DamageStatusList>
          <SubTitle>{t.print("Direct")}</SubTitle>
          <StatusList>
            <StatusText isActive={isDirect}>{t.print("Possible")}</StatusText>
            <StatusText isActive={!isDirect}>
              {t.print("Impossible")}
            </StatusText>
          </StatusList>
        </DamageStatusList>
        <DamageStatusList>
          <SubTitle>{t.print("Delivery")} </SubTitle>
          <StatusList>
            <StatusText isActive={isDelivery}>{t.print("Possible")}</StatusText>
            <StatusText isActive={!isDelivery}>
              {t.print("Impossible")}
            </StatusText>
          </StatusList>
        </DamageStatusList>
      </Container>
    </>
  );
};

export default DamageAndTradingMethod;
