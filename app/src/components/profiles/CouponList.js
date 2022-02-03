import React from "react";
import styled from "styled-components/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  border-bottom-width: 1px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  height: 110px;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 15px 0px 15px;
  border-radius: 10px;
`;

const Icon = styled.View`
  border: 1px;
  margin: 0px 15px 0px 15px;
  padding: 5px;
  border-radius: 20px;
  border-color: ${({ theme }) => theme.label};
`;

const TextContainer = styled.View`
  height: 100%;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Event = styled.Text`
  color: ${({ theme }) => theme.text2};
  font-size: 12px;
`;

const RowContaienr = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  margin-left: 3px;
`;

const ArrowIcon = styled.Text`
  position: absolute;
  right: 15px;
`;

const CouponList = ({ navigation }) => {
  const _handleDetailPage = () => {
    navigation.navigate("아직 기능없음");
  };

  return (
    <>
      <Container onPress={_handleDetailPage}>
        <Icon>
          <MaterialIcons name="10k" size={40} color="#FFC352" />
        </Icon>
        <TextContainer>
          <Event>신규 회원가입 이벤트</Event>
          <RowContaienr>
            <Title>[거래장터]</Title>
            <SubTitle>물품 상단 고정 쿠폰</SubTitle>
          </RowContaienr>
        </TextContainer>

        <ArrowIcon>
          <AntDesign name="right" size={26} color="#FFC352" />
        </ArrowIcon>
      </Container>
      <Container onPress={_handleDetailPage}>
        <Icon>
          <MaterialIcons name="10k" size={40} color="#FFC352" />
        </Icon>
        <TextContainer>
          <Event>신규 회원가입 이벤트</Event>
          <RowContaienr>
            <Title>[거래장터]</Title>
            <SubTitle>물품 상단 고정 쿠폰</SubTitle>
          </RowContaienr>
        </TextContainer>

        <ArrowIcon>
          <AntDesign name="right" size={26} color="#FFC352" />
        </ArrowIcon>
      </Container>
    </>
  );
};

export default CouponList;
