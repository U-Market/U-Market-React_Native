import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Text } from "react-native";

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

const TradeRelated = ({ navigation }) => {
  const [isTradeFirstQuestion, setIsTradeFirstQuestion] = useState(false);
  const [isTradeSecondQuestion, setIsTradeSecondQuestion] = useState(false);
  const [isTradeThirdQuestion, setIsTradeThridQuestion] = useState(false);
  const theme = useContext(ThemeContext);

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
        <Title>??????</Title>
        <Question onPress={_selectTradeFirstQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        {isTradeFirstQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. ?????? ??? ?????? ????????? ??????????
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
        <Question onPress={_selectTradeSecondQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        {isTradeSecondQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. ?????? ??? ?????? ????????? ??????????
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
        <LastQuestion onPress={_selectTradeThirdQuestion}>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </LastQuestion>
        {isTradeThirdQuestion ? (
          <SelectedQuestion>
            <Text style={{ paddingLeft: 5 }}>
              Q. ?????? ??? ?????? ????????? ??????????
            </Text>
          </SelectedQuestion>
        ) : (
          <></>
        )}
      </Container>

      <Container>
        <Title>??????</Title>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        <LastQuestion>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </LastQuestion>
      </Container>

      <Container>
        <Title>??????</Title>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        <Question>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </Question>
        <LastQuestion>
          <Text style={{ paddingLeft: 5 }}>Q. ?????? ??? ?????? ????????? ??????????</Text>
        </LastQuestion>
      </Container>
    </>
  );
};

export default TradeRelated;
