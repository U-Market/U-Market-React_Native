import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Stars from "react-native-stars";
import { API_URL } from "@env";

import { theme } from "../../../theme";
import t from "../../../utils/translate/Translator";

const Container = styled.Pressable`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
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
  margin-bottom: 5px;
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

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  margin-top: 3px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const ItemSubTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 12px;
  margin-bottom: 3px;
  color: ${({ theme }) => theme.text2};
`;

const PostDate = styled.Text`
  color: ${({ theme }) => theme.postdate};
  margin-top: 10px;
  font-size: 11px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
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
  color: ${({ theme }) => theme.text2};
`;

const Item = ({
  review,
  navigation,
  isSeller,
  setIsLoading,
  isLoading,
  userNo,
}) => {
  useEffect(() => {
    getToken();
  }, []);

  let buyerToken;

  const getToken = async () => {
    if (isSeller) {
      try {
        const config = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${API_URL}/api/notification/token/${review.buyerNo}`,
          config
        ).then((res) => res.json());

        buyerToken = response[0].token;
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const config = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `${API_URL}/api/notification/token/${review.sellerNo}`,
          config
        ).then((res) => res.json());

        buyerToken = response[0].token;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const moveReviewWritePage = () => {
    if (isSeller) {
      navigation.navigate("ReviewWritePage", {
        no: review.no,
        sellerNo: userNo,
        buyerNo: review.buyerNo,
        thumbnail: review.thumbnail,
        category: review.category,
        nickname: review.nickname,
        title: review.title,
        writer: 0,
        isSeller: isSeller,
        setIsLoading: setIsLoading,
        isLoading: isLoading,
        buyerToken: buyerToken,
      });
    } else {
      navigation.navigate("ReviewWritePage", {
        no: review.no,
        sellerNo: review.sellerNo,
        buyerNo: review.buyerNo,
        thumbnail: review.thumbnail,
        category: review.category,
        nickname: review.nickname,
        title: review.title,
        writer: 1,
        isSeller: isSeller,
        setIsLoading: setIsLoading,
        isLoading: isLoading,
        buyerToken: buyerToken,
      });
    }
  };

  if (review.description !== undefined) {
    return (
      <TouchableOpacity style={styles.shoadowBox}>
        <Container>
          <MainContainer>
            <StyledImage source={{ uri: review.thumbnail }} />
            <ItemContent>
              <ItemTitle>{review.title}</ItemTitle>
              <ItemSubTitle>{review.nickname}</ItemSubTitle>

              <PostDate>{review.inDate}</PostDate>
            </ItemContent>
          </MainContainer>
          <RowContainer>
            <GradeTitle>{t.print("score")}</GradeTitle>
            <Stars
              display={review.trustScore}
              spacing={8}
              count={5}
              starSize={24}
              fullStar={require("../../../icons/star.png")}
              emptyStar={require("../../../icons/emptyStar.png")}
            />
          </RowContainer>
          <GradeContent>{review.description}</GradeContent>
        </Container>
      </TouchableOpacity>
    );
  } else {
    return (
      <Container>
        <MainPressContainer onPress={moveReviewWritePage}>
          <StyledImage source={{ uri: review.thumbnail }} />
          <ItemContent>
            {t.getLanguage("en") ? (
              <ItemTitle>{`${t.print("writeReviewToggle")}${
                review.nickname
              }`}</ItemTitle>
            ) : (
              <ItemTitle>{`${review.nickname} ${t.print(
                "writeReviewToggle"
              )}`}</ItemTitle>
            )}
            <ItemSubTitle>{review.title}</ItemSubTitle>

            <PostDate>{review.inDate}</PostDate>
          </ItemContent>
        </MainPressContainer>
      </Container>
    );
  }
};

export default Item;

const styles = StyleSheet.create({
  shoadowBox: {
    backgroundColor: theme.background,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
});
