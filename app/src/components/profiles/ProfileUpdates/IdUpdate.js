import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

import ImageBox from "./ProfileImage";
import { checkNickname, removeWhitespace } from "../../../utils/common";
import { Button } from "../../";
import t from "../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding-top: 40px;
  width: 100%;
`;

const ProfileImagecontainer = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ViewImage = styled.View`
  width: 100%;
  position: absolute;
  top: 0px;
  align-items: center;
`;

const IDShow = styled.Text`
  padding-top: 5px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
`;

const IdInputContainer = styled.View`
  padding-left: 20px;
  padding-top: 40px;
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
`;

const IdInputText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 16px;
`;

const IdInput = styled.TextInput.attrs({
  placeholderPaddingLeft: 20,
})`
  background-color: ${({ theme }) => theme.background};
  width: 90%;
  padding-top: 10px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.main};
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;

  font-size: 12px;
  color: ${({ theme }) => theme.errorText};
  margin-bottom: 30px;
`;

const BtnContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
`;

const IdUpdate = ({
  photos,
  navigation,
  profile,
  nickname,
  setNickname,
  onPress,
}) => {
  const [errorNicknameMessage, setErrorNicknameMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const didmountRef = useRef();

  const _handleNickChange = (nickname) => {
    const changedNickname = removeWhitespace(nickname);
    setNickname(changedNickname);
    setErrorNicknameMessage(
      checkNickname(changedNickname)
        ? ""
        : "닉네임은 한글, 영문, 숫자 2~10자 이내로 입력해주세요"
    );
  };

  useEffect(() => {
    if (didmountRef.current) {
      let _emailNickNameMessage = "";
      if (!checkNickname(nickname)) {
        _emailNickNameMessage = t.print(
          "NicknamMustBeCharactersInKoreanEnglishAndNumericCharacters"
        );
        setErrorNicknameMessage(_emailNickNameMessage);
      } else {
        _emailNickNameMessage = "";
      }
    } else {
      didmountRef.current = true;
    }
  }, [nickname]);

  useEffect(() => {
    setDisabled(!(nickname && !errorNicknameMessage));
  }, [nickname, errorNicknameMessage]);

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 100, width: 100, borderRadius: 50 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  };

  const _showPhotos = () => {
    if (photos === undefined) {
      return (
        <ProfileImagecontainer
          onPress={() => navigation.navigate("ProfileImageMediaPage")}
        >
          <ImageBox
            url={photos && photos.map((item, i) => renderImage(item, i))}
            showButton
            onPress={() => navigation.navigate("ProfileImageMediaPage")}
          />
          <ViewImage>
            <Image
              style={{ height: 100, width: 100, borderRadius: 50 }}
              source={{
                uri: profile.profileUrl,
              }}
            />
          </ViewImage>
        </ProfileImagecontainer>
      );
    } else {
      return (
        <ProfileImagecontainer
          onPress={() => navigation.navigate("ProfileImageMediaPage")}
        >
          <ImageBox
            url={photos && photos.map((item, i) => renderImage(item, i))}
            showButton
          />
          <ViewImage>
            {photos && photos.map((item, i) => renderImage(item, i))}
          </ViewImage>
        </ProfileImagecontainer>
      );
    }
  };

  return (
    <Container>
      <>{_showPhotos()}</>
      <IdInputContainer>
        <IdInputText>{t.print("Nickname")}</IdInputText>
        <IdInput
          onChangeText={_handleNickChange}
          placeholder={profile.nickname}
        />
        <ErrorText>{errorNicknameMessage}</ErrorText>

        <IDShow>{t.print("Account")}</IDShow>
        <IDShow>{profile.email}</IDShow>
      </IdInputContainer>
      <BtnContainer>
        <Button
          title={t.print("Register")}
          onPress={onPress}
          disabled={disabled}
        />
      </BtnContainer>
    </Container>
  );
};

export default IdUpdate;
