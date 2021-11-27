import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import { ReadyContext, readyDispatch } from "../../contexts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import t from "../../utills/translate/Translator";

const CommunityContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin-top: 10px;
`;

const CommunityTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 5px 0px 10px 20px;
`;

const CommunityStudent = styled.Text`
  font-size: 12px;
  padding-left: 3px;
  padding-bottom: 20px;
`;

const CommunityTime = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.text};
  position: absolute;
  left: 44px;
  bottom: 5px;
`;

const CommunityTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  padding-top: 10px;
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

const CommunityDescription = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 14px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text2};
  width: 90%;
  padding-bottom: 5px;
`;

const CommunityRowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CommunityShowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 10px 0px 10px 20px;
`;

const CommunityShowRightContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const CommunityThumbs = styled.Text`
  padding-right: 10px;
  color: ${({ theme }) => theme.text};
`;

const CommunityComment = styled.Text`
  padding-right: 10px;
  color: ${({ theme }) => theme.text};
`;

const CommunityHit = styled.Text`
  position: absolute;
  right: 20px;
  top: 20px;
  color: ${({ theme }) => theme.text2};
  font-size: 12px;
`;

const Community = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ community, navigation, categoryNo, headerTitle }) => {
    const theme = useContext(ThemeContext);
    const { readyDispatch } = useContext(ReadyContext);

    const _handleDetailViewPress = () => {
      readyDispatch.notReady();
      navigation.navigate("DetailViewPage", {
        categoryNo,
        communityNo: community.no,
        headerTitle,
      });
    };

    const showimage = () => {
      if (community.thumbnail.length) {
        return <StyledImage source={{ uri: community.thumbnail }} />;
      }
      return <></>;
    };

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={20}
      >
        <CommunityContainer onPress={_handleDetailViewPress}>
          <CommunityTextContainer>
            <CommunityRowContainer>
              <Image
                resizeMode="cover"
                style={styles.Image}
                source={{ uri: community.profileUrl }}
              />
              <CommunityStudent>{community.nickname}</CommunityStudent>
              <CommunityTime>{community.inDate}</CommunityTime>
            </CommunityRowContainer>
            <CommunityTitle>{community.title}</CommunityTitle>
            <>{showimage()}</>
            <CommunityDescription>{community.description}</CommunityDescription>
          </CommunityTextContainer>
          <CommunityShowContainer>
            <CommunityShowRightContainer>
              <CommunityThumbs>
                {t.print("Like")} {community.likeCnt}
              </CommunityThumbs>
              <CommunityComment>
                {t.print("Comment")} {community.commentCnt}
              </CommunityComment>
            </CommunityShowRightContainer>
          </CommunityShowContainer>

          <CommunityHit>
            {" "}
            {t.print("Views")} {community.hit}
          </CommunityHit>
        </CommunityContainer>
      </KeyboardAwareScrollView>
    );
  }
);

export default Community;

const styles = StyleSheet.create({
  Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
});
