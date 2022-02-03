import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Modal, Alert } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";

import ImageSlider from "../../../main/todays/ImageSlider";
import { ProgressContext } from "../../../../contexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import t from "../../../../utils/translate/Translator";

const ItemContainer = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};

  margin-bottom: 10px;
  margin-top: 10px;
`;

const ImagePinchContainer = styled.View``;
const Icon = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  right: 5px;
`;

const StyledImage = styled.View`
  height: 250px;
  justify-content: center;
  align-self: center;
`;

const ItemTextContainer = styled.View`
  width: 100%;
  padding: 5px 0px 10px 20px;
`;

const ItemStudent = styled.Text`
  font-size: 12px;
  padding-left: 5px;
  padding-bottom: 20px;
`;

const ItemTime = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.text};
  position: absolute;
  left: 44px;
  bottom: 5px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
`;

const ItemDescription = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text2};
  width: 90%;
  padding-bottom: 5px;
`;

const ItemRowContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const ItemShowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0px 10px 20px;
`;

const ItemClickContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const IconRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemStar = styled.Text`
  padding: 3px 5px 5px 5px;
  color: ${({ theme }) => theme.text};
`;

const ItemShowRightContainer = styled.View`
  width: 75%;
  flex-direction: row;
  justify-content: flex-end;
`;

const ItemThumbs = styled.Text`
  padding: 3px 3px 3px 5px;
  color: ${({ theme }) => theme.text};
`;

const DetailView = ({
  community,
  images,
  communityNo,
  setLikeCnt,
  likeCnt,
  userNo,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [communityImages, setCommunityImages] = useState([]);

  const [isLikeFlag, setIsLikeFlag] = useState(community.likeFlag);
  const [isBookmarkFlag, setIsBookmarkFlag] = useState(community.bookmarkFlag);

  const { spinner } = useContext(ProgressContext);

  const expandImages = () => {
    setCommunityImages([
      ...communityImages,
      ...community.images.map((url) => {
        return { url };
      }),
    ]);
  };

  useEffect(() => {
    expandImages();
  }, []);

  const pressIcon = () => {
    setIsModal(!isModal);
  };

  const toggleBookmark = async () => {
    if (Number(isBookmarkFlag)) {
      try {
        spinner.start();
        const config = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityNo: community.no,
          }),
        };

        const response = await fetch(
          `${API_URL}/api/bookmarks/${userNo}`,
          config
        ).then((res) => res.json());
        setIsBookmarkFlag("0");
      } catch (e) {
        Alert.alert(t.print("FailedToCancelBookmark"), e.message);
      } finally {
        spinner.stop();
      }
    } else {
      try {
        spinner.start();
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityNo: community.no,
          }),
        };

        const response = await fetch(
          `${API_URL}/api/bookmarks/${userNo}`,
          config
        ).then((res) => res.json());
        setIsBookmarkFlag("1");
      } catch (e) {
        Alert.alert(t.print("FailedToRegisterBookmark"), e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  const toggleLike = async () => {
    if (Number(isLikeFlag)) {
      try {
        spinner.start();
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flag: 0,
            userNo: userNo,
          }),
        };

        const response = await fetch(
          `${API_URL}/api/communities/${communityNo}`,
          config
        ).then((res) => res.json());

        setLikeCnt(likeCnt - 1);
        setIsLikeFlag("0");
      } catch (e) {
        Alert.alert(t.print("FailedToCancelLike"), e.message);
      } finally {
        spinner.stop();
      }
    } else {
      try {
        spinner.start();
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            flag: 1,
            userNo: userNo,
          }),
        };

        const response = await fetch(
          `${API_URL}/api/communities/${communityNo}`,
          config
        ).then((res) => res.json());
        setLikeCnt(likeCnt + 1);
        setIsLikeFlag("1");
      } catch (e) {
        Alert.alert(t.print("FailedToRegisterLike"), e.message);
      } finally {
        spinner.stop();
      }
    }
  };

  const _divideBookmarkFlag = () => {
    if (Number(isBookmarkFlag)) {
      return (
        <IconRowContainer>
          <FontAwesome name="star" size={18} color="#FFC352" />
          <ItemStar>{t.print("Bookmark")}</ItemStar>
        </IconRowContainer>
      );
    } else {
      return (
        <IconRowContainer>
          <FontAwesome name="star-o" size={18} color="#FFC352" />
          <ItemStar>{t.print("Bookmark")}</ItemStar>
        </IconRowContainer>
      );
    }
  };

  const _divideLikeFlag = () => {
    if (Number(isLikeFlag)) {
      return (
        <IconRowContainer>
          <FontAwesome name="thumbs-up" size={18} color="#FFC352" />
          <ItemThumbs>
            {t.print("Like")} {likeCnt}{" "}
          </ItemThumbs>
        </IconRowContainer>
      );
    } else {
      return (
        <IconRowContainer>
          <FontAwesome5 name="thumbs-up" size={18} color="#FFC352" />
          <ItemThumbs>
            {t.print("Like")} {likeCnt}{" "}
          </ItemThumbs>
        </IconRowContainer>
      );
    }
  };

  function _imagesSetting() {
    if (community.images !== undefined) {
      if (community.images.length)
        return community.images.length ? (
          <ImagePinchContainer>
            <StyledImage>
              <ImageSlider
                images={community.images}
                resizeMode={"contain"}
                isEvent={false}
              />
            </StyledImage>
            <Icon onPress={pressIcon}>
              <Ionicons name="expand" size={36} color="black" />
            </Icon>
            <Modal visible={isModal} transparent={true}>
              <ImageViewer
                imageUrls={communityImages}
                onClick={() => setIsModal(!isModal)}
              />
            </Modal>
          </ImagePinchContainer>
        ) : (
          <></>
        );
    }

    if (images !== undefined) {
      return images.length ? (
        <>
          <ImageSlider images={images} resizeMode={"contain"} isEvent={false} />
        </>
      ) : (
        <></>
      );
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <ItemContainer>
        <ItemTextContainer>
          <ItemRowContainer>
            <Image
              resizeMode="cover"
              style={styles.Image}
              source={{ uri: community.profileUrl }}
            />
            <ItemStudent>{community.nickname}</ItemStudent>
            <ItemTime>{community.inDate}</ItemTime>
          </ItemRowContainer>

          <ItemTitle>{community.title}</ItemTitle>

          <>{_imagesSetting()}</>
          <ItemDescription>{community.description}</ItemDescription>
        </ItemTextContainer>

        <ItemShowContainer>
          <ItemClickContainer onPress={() => toggleBookmark()}>
            <>{_divideBookmarkFlag()}</>
          </ItemClickContainer>
          <ItemShowRightContainer>
            <ItemClickContainer onPress={() => toggleLike()}>
              <>{_divideLikeFlag()}</>
            </ItemClickContainer>
          </ItemShowRightContainer>
        </ItemShowContainer>
      </ItemContainer>
    </KeyboardAwareScrollView>
  );
};

export default DetailView;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
