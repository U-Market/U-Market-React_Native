import React, { useState, useRef } from "react";
import { StyleSheet, Image, View } from "react-native";
import styled from "styled-components/native";
// import { Rating, TapRating } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Stars from "react-native-stars";
import { Button } from "../";

import t from "../../utills/translate/Translator";

const ProductInfoContainer = styled.SafeAreaView`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  height: 130px;
  margin-bottom: 5px;
  justify-content: center;
`;

const ProductInfoRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;

  padding: 10px 0px 15px 20px;
`;

const Thumbnail = styled.View``;

const ProductInfoTextContainer = styled.View`
  align-items: flex-start;
  width: 100%;
  padding-left: 10px;
`;

const SellerText = styled.Text`
  font-size: 14px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text2};
  padding-right: 5px;
`;

const ProductTitle = styled.Text`
  font-size: 18px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text};
  padding-right: 5px;
`;

const ProductCategory = styled.Text`
  font-size: 14px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text2};
  padding-right: 5px;
`;
const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  height: 100%;
  align-items: center;
`;

const StarContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  height: 150px;
`;

const StarRowContaienr = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const StarTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Description = styled.TextInput`
  height: 300px;
  width: 90%;
  margin-top: 20px;
  padding-left: 4px;
  background-color: ${({ theme }) => theme.background2};
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  border-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  border-radius: 10px;
`;

const ReviewWrite = ({
  navigation,
  setTitle,
  setDescription,
  thumbnail,
  category,
  nickname,
  title,
  handelRating,
  onPress,
  rating,
  isSeller,
}) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <KeyboardAwareScrollView>
      <ProductInfoContainer>
        <ProductInfoRowContainer>
          <Thumbnail>
            <Image
              style={{ height: 90, width: 100, borderRadius: 10 }}
              source={{ uri: thumbnail }}
            />
          </Thumbnail>
          <ProductInfoTextContainer>
            {isSeller ? (
              <SellerText>
                {t.print("buyer")}: {nickname}
              </SellerText>
            ) : (
              <SellerText>
                {t.print("seller")}: {nickname}
              </SellerText>
            )}

            <ProductTitle>{title}</ProductTitle>
            <ProductCategory>{t.print(category)}</ProductCategory>
          </ProductInfoTextContainer>
        </ProductInfoRowContainer>
      </ProductInfoContainer>

      <Container>
        <StarContainer>
          <StarRowContaienr>
            <StarTitle>{t.print("score")} </StarTitle>
            <StarTitle>{rating} / 5</StarTitle>
          </StarRowContaienr>
          <View style={{ alignItems: "center" }}>
            <Stars
              half={true}
              default={3}
              update={handelRating}
              spacing={4}
              starSize={65}
              count={5}
              fullStar={require("../../icons/star.png")}
              halfStar={require("../../icons/halfStar.png")}
              emptyStar={require("../../icons/emptyStar.png")}
            />
          </View>
        </StarContainer>

        <Description
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          placeholder={t.print("PleaseWriteItDown")}
          returnKeyType="done"
        />
        <Button title={t.print("등록하기")} onPress={onPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ReviewWrite;

const styles = StyleSheet.create({
  CheckBox: {
    alignSelf: "center",
    width: 15,
    height: 15,
    backgroundColor: "#222",
    borderColor: "#e3e3e3",
  },
});
