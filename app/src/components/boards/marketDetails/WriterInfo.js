import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import styled from "styled-components/native";

import t from "../../../utills/translate/Translator";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 10px 20px;
`;

const TextContainer = styled.View`
  margin-left: 8px;
`;

const NickName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const DateTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.subTitle};
`;

const WriterInfo = ({ nickname, inDate, image }) => {
  return (
    <Container>
      <Image resizeMode="cover" style={styles.Image} source={{ uri: image }} />
      <TextContainer>
        <NickName>{nickname}</NickName>
        <DateTime>{`${t.print("등록일")} ${inDate}`}</DateTime>
      </TextContainer>
    </Container>
  );
};

export default WriterInfo;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
