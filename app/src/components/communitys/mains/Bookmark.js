import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Alert } from "react-native";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utils/AsyncStorage";

import { ProgressContext } from "../../../contexts";

const BookmarkContainer = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin-top: 10px;
`;

const BookmarkTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 5px 0px 10px 20px;
`;

const BookmarkStudent = styled.Text`
  font-size: 12px;
  padding-left: 3px;
  padding-bottom: 20px;
`;

const BookmarkTime = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.text};
  position: absolute;
  left: 44px;
  bottom: 5px;
`;

const BookmarkTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 200px;
  width: 95%;
  border-radius: 6px;
  border-width: 0.9px;
  border-color: ${({ theme }) => theme.greyBottomLine};
`;

const BookmarkDescription = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.postdate};
  width: 90%;
  padding-bottom: 5px;
`;

const BookmarkRowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const BookmarkShowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0px 10px 20px;
`;

const ItemClickContainer = styled.TouchableOpacity``;
const BookmarkStar = styled.Text`
  padding-right: 10px;
  color: ${({ theme }) => theme.text};
`;

const BookmarkShowRightContainer = styled.View`
  width: 75%;
  flex-direction: row;
  justify-content: flex-end;
`;

const BookmarkThumbs = styled.Text`
  padding-right: 10px;
  color: ${({ theme }) => theme.text};
  padding-top: 2px;
`;

const BookmarkComment = styled.Text`
  padding-right: 10px;
  color: ${({ theme }) => theme.text};
`;

const BookmarkHit = styled.Text`
  position: absolute;
  right: 20px;
  top: 20px;
  color: ${({ theme }) => theme.text2};
  font-size: 12px;
`;

const Bookmark = React.memo(
  ({ bookmarks, navigation, headerTitle, setIsReady }) => {
    const [isDelete, setIsDelete] = useState(false);

    const { spinner } = useContext(ProgressContext);

    const moveDetailViewPage = () => {
      navigation.navigate("DetailViewPage", {
        communityNo: bookmarks.no,
        headerTitle,
      });
    };

    console.log(isDelete, "d");

    const deleteBookmark = async () => {
      const id = await getItemFromAsync("userNo");
      try {
        spinner.start();

        const config = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityNo: bookmarks.no,
          }),
        };

        const response = await fetch(
          `${API_URL}/api/bookmarks/${Number(id)}`,
          config
        ).then((res) => res.json());
        setIsDelete(true);
        setIsReady(false);
      } catch (e) {
        Alert.alert("실패", e.message);
      } finally {
        spinner.stop();
      }
    };

    const showImage = () => {
      if (bookmarks.thumbnail.length) {
        return <StyledImage source={{ uri: bookmarks.thumbnail }} />;
      }
      return <></>;
    };

    if (!isDelete) {
      return (
        <BookmarkContainer onPress={moveDetailViewPage}>
          <BookmarkTextContainer>
            <BookmarkRowContainer>
              <Image
                resizeMode="cover"
                style={styles.Image}
                source={{ uri: bookmarks.profileUrl }}
              />
              <BookmarkStudent>{bookmarks.nickname}</BookmarkStudent>
              <BookmarkTime>{bookmarks.inDate}</BookmarkTime>
            </BookmarkRowContainer>
            <BookmarkTitle>{bookmarks.title}</BookmarkTitle>
            <>{showImage()}</>
            <BookmarkDescription>{bookmarks.description}</BookmarkDescription>
          </BookmarkTextContainer>
          <BookmarkShowContainer>
            <ItemClickContainer>
              <BookmarkStar onPress={deleteBookmark}>
                <FontAwesome name="star" size={18} color="#FFC352" /> 즐겨찾기{" "}
              </BookmarkStar>
            </ItemClickContainer>
            <BookmarkShowRightContainer>
              <BookmarkThumbs>
                <FontAwesome5 name="thumbs-up" size={18} color="#FFC352" />{" "}
                좋아요 {bookmarks.likeCnt}
              </BookmarkThumbs>
              <BookmarkComment>
                <FontAwesome name="commenting-o" size={20} color="#FFC352" />{" "}
                댓글 {bookmarks.commentCount}
              </BookmarkComment>
            </BookmarkShowRightContainer>
          </BookmarkShowContainer>

          <BookmarkHit>조회수 {bookmarks.hit}</BookmarkHit>
        </BookmarkContainer>
      );
    } else {
      <></>;
    }
  }
);

export default Bookmark;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
