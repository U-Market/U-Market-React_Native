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
  height: 22%;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-left: 31px;
  padding-top: 20px;
`;

const Category = styled.TouchableOpacity`
  width: 85%;
  height: 38%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.label};
`;

const LastCategory = styled.TouchableOpacity`
  width: 85%;
  height: 30%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-left: 30px;
`;

const Inquiry = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  const _handleInquiryPost = async () => {
    navigation.navigate("InquiryPage");
  };

  const _handleInquiryList = async () => {
    Alert.alert("아직기능없음");
  };

  return (
    <Container>
      <Title>1:1 문의</Title>
      <Category onPress={_handleInquiryPost}>
        <Text style={{ paddingLeft: 5, paddingRight: 260 }}>1:1문의 작성</Text>
      </Category>

      <LastCategory onPress={_handleInquiryList}>
        <Text style={{ paddingLeft: 5, paddingRight: 260 }}>1:1문의내역</Text>
      </LastCategory>
    </Container>
  );
};

export default Inquiry;
