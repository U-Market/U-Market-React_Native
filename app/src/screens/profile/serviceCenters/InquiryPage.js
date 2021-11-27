import React, { useState, useRef } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../../../components/commons/Header";
import Write from "../../../components/boards/writes/Write";

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.mainOrange};
  position: absolute;
  right: 20px;

  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
  width: 70px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const WriteViewContainer = styled.View`
  height: 100%;
  padding: 20px;
`;

const InquiryPage = ({ navigation }) => {
  const _handlePostBtnPress = (params) => {
    Alert.alert(
      "", // 제목
      "등록 하시겠습니까?", // 부제목
      [
        // 버튼 배열
        {
          text: "예",
          onPress: _handleAlertOkPress,
          style: "cancel",
        },
        {
          text: "아니요",
          onPress: () => Alert.alert("취소 되었습니다"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const _handleAlertOkPress = () => {
    Alert.alert("등록 되었습니다");
    navigation.navigate("ServiceCenterPage");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"1:1문의 작성"}
      />
      <PostBtn onPress={_handlePostBtnPress}>
        <Text style={{ color: "#fff" }}>작성</Text>
      </PostBtn>

      <WriteViewContainer>
        <ScrollView>
          <Write isPrice={false} navigation={navigation} isCategory={false} />
        </ScrollView>
      </WriteViewContainer>
    </KeyboardAwareScrollView>
  );
};

export default InquiryPage;
