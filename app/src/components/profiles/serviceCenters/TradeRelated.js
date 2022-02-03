import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  width: 100%;
  border: 1px;
  border-color: ${({ theme }) => theme.label};
  background-color: ${({ theme }) => theme.background};
  margin-top: 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-left: 31px;
  padding-top: 20px;
`;

const Question = styled.TouchableOpacity`
  width: 85%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const SelectedQuestion = styled.TouchableOpacity`
  width: 85%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  background-color: ${({ theme }) => theme.background2};
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.label};
  border-radius: 10px;
  margin-bottom: 10px;
`;

const LastQuestion = styled.TouchableOpacity`
  width: 85%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
`;

const TradeRelated = () => {
  const [isTradeFirstQuestion, setIsTradeFirstQuestion] = useState(false);
  const [isTradeSecondQuestion, setIsTradeSecondQuestion] = useState(false);
  const [isTradeThirdQuestion, setIsTradeThridQuestion] = useState(false);

  const _selectTradeFirstQuestion = () => {
    setIsTradeFirstQuestion((isTradeFirstQuestion) => !isTradeFirstQuestion);
  };

  const _selectTradeSecondQuestion = () => {
    setIsTradeSecondQuestion((isTradeSecondQuestion) => !isTradeSecondQuestion);
  };

  const _selectTradeThirdQuestion = () => {
    setIsTradeThridQuestion((isTradeThirdQuestion) => !isTradeThirdQuestion);
  };

  return (
    <>
      <Container>
        <Title>거래</Title>
        <Question onPress={_selectTradeFirstQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        {isTradeFirstQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. 이건 왜 이런 그런것 일까요?
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
        <Question onPress={_selectTradeSecondQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        {isTradeSecondQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. 이건 왜 이런 그런것 일까요?
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
        <LastQuestion onPress={_selectTradeThirdQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </LastQuestion>
        {isTradeThirdQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. 이건 왜 이런 그런것 일까요?
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
      </Container>

      <Container>
        <Title>사기</Title>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        <LastQuestion>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </LastQuestion>
      </Container>

      <Container>
        <Title>후기</Title>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </Question>
        <LastQuestion>
          <Text style={{ paddingLeft: 5 }}>Q. 이건 왜 이런 그런것 일까요?</Text>
        </LastQuestion>
      </Container>
    </>
  );
};

export default TradeRelated;
