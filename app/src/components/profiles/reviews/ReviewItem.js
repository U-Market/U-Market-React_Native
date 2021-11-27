import React from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity, Dimensions, View } from "react-native";

import { theme } from "../../../theme";
import Stars from "react-native-stars";
import t from "../../../utills/translate/Translator";

const Container = styled.Pressable`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  margin-bottom: 5px;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 80px;
  width: 80px;

  border-radius: 12px;

  border-color: gray;
`;

const ItemContent = styled.View`
  padding-left: 20px;
`;

const MainContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: flex-start;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.placeholder};
`;

const MainPressContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: flex-start;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  margin-top: 5px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const ItemSubTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 12px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.postdate};
`;

const ItemCategory = styled.Text`
  font-size: 12px;
  font-weight: bold;
  padding-left: 10px;
  color: ${({ theme }) => theme.postdate};
`;

const PostDate = styled.Text`
  color: ${({ theme }) => theme.text2};
  margin-top: 10px;
  font-size: 11px;
`;

const GradeTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  padding: 0px 5px 0px 20px;
  font-weight: bold;
`;

const GradeContent = styled.Text.attrs(() => ({
  numberOfLines: 3,
}))`
  font-size: 12px;
  padding-left: 20px;
  padding-top: 5px;
  color: ${({ theme }) => theme.postdate};
`;

const Item = ({
  imgUrl,
  itemTitle,
  trustScore,
  inDate,
  nickname,
  rating,
  description,
  productNo,
  userNo,
  category,
  buyerNo,
  navigation,
  isSeller,
  setIsReady,
  sellerNo,
}) => {
  //if (0 <== grade <== 1)
  const _handleItemPress = () => {
    if (isSeller) {
      navigation.navigate("ReviewWritePage", {
        productNo: productNo,
        sellerNo: userNo,
        buyerNo: buyerNo,
        thumbnail: imgUrl,
        category: category,
        nickname: nickname,
        title: itemTitle,
        writer: 0,
        isSeller: isSeller,
        setIsReady: setIsReady,
      });
    } else {
      navigation.navigate("ReviewWritePage", {
        productNo: productNo,
        sellerNo: sellerNo,
        buyerNo: buyerNo,
        thumbnail: imgUrl,
        category: category,
        nickname: nickname,
        title: itemTitle,
        writer: 1,
        isSeller: isSeller,
        setIsReady: setIsReady,
      });
    }
  };

  if (description !== undefined) {
    return (
      <TouchableOpacity style={styles.shoadowBox}>
        <Container>
          <MainContainer>
            <StyledImage source={{ uri: imgUrl }} />
            <ItemContent>
              <ItemTitle>{itemTitle}</ItemTitle>
              <ItemSubTitle>{nickname}</ItemSubTitle>
              <PostDate>{inDate}</PostDate>
            </ItemContent>
          </MainContainer>
          <RowContainer>
            <GradeTitle>{t.print("score")}</GradeTitle>
            <Stars
              display={rating}
              spacing={8}
              count={5}
              starSize={30}
              fullStar={require("../../../icons/star.png")}
              emptyStar={require("../../../icons/emptyStar.png")}
            />
          </RowContainer>
          <GradeContent>{description}</GradeContent>
        </Container>
      </TouchableOpacity>
    );
  } else {
    return (
      <Container>
        <MainPressContainer onPress={_handleItemPress}>
          <StyledImage source={{ uri: imgUrl }} />
          <ItemContent>
            {t.getLanguage("en") ? (
              <ItemTitle>{`${t.print(
                "writeReviewToggle"
              )}${nickname}`}</ItemTitle>
            ) : (
              <ItemTitle>{`${nickname} ${t.print(
                "writeReviewToggle"
              )}`}</ItemTitle>
            )}
            <ItemSubTitle>{itemTitle}</ItemSubTitle>

            <PostDate>{inDate}</PostDate>
          </ItemContent>
        </MainPressContainer>
      </Container>
    );
  }
};

export default Item;

const styles = StyleSheet.create({
  shoadowBox: {
    // width: Dimensions.get("window").width,
    backgroundColor: theme.background,

    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: 10,
    height: 200,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
});
