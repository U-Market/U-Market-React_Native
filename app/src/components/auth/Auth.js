import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Image, Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { Input, Button } from "../index";
import ImageBox from "../commons/Image";
import { removeWhitespace, checkName } from "../../utils/common";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  margin-top: 40px;
`;

const PicutreContainer = styled.SafeAreaView`
  margin: 16px;
  width: 90%;
  padding-left: 18px;
  flex-direction: row;
`;

const ImagePinchContainer = styled.TouchableOpacity``;
const ImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ViewImage = styled.View`
  width: 100%;
  position: absolute;
  top: 0px;
  align-items: center;
`;

const ButtonContainer = styled.SafeAreaView`
  flex-direction: row;
  width: 90%;
  padding-left: 18px;
`;

const ImageButton = styled.TouchableOpacity`
  border-radius: 10px;
  margin: 5px;
  background-color: ${({ theme }) => theme.background};
  width: 100px;
  height: 40px;
  border: 1px;
  border-color: ${({ theme }) => theme.main};
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 60px;
  color: ${({ theme }) => theme.errorText};
`;

const Auth = ({ navigation, photos, selectedFilterData }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const _handleNameChange = (name) => {
    const changedName = removeWhitespace(name);
    setName(changedName);
    setErrorMessage(checkName(changedName) ? "" : "이름 형식을 지켜주세요");
  };

  const _handleSignUpPage = () => {
    navigation.replace("SignUpPage", { name, selectedFilterData });
  };

  useEffect(() => {
    setDisabled(!(name && !errorMessage));
  }, [name, errorMessage]);

  const renderImage = (item, i) => {
    const images = [
      {
        url: `${item.uri}`,
      },
    ];
    return (
      <ImagePinchContainer onPress={() => setIsModal(!isModal)}>
        <Image
          style={{ height: 80, width: 100, marginLeft: 5, borderRadius: 5 }}
          resizeMode={"cover"}
          source={{ uri: item.uri }}
          key={i}
        />
        <Modal visible={isModal} transparent={true}>
          <ImageViewer
            imageUrls={images}
            onClick={() => setIsModal(!isModal)}
          />
        </Modal>
      </ImagePinchContainer>
    );
  };

  const _showPhotos = () => {
    if (photos === undefined) {
      return (
        <ImageBox
          url={photos && photos.map((item, i) => renderImage(item, i))}
          showButton
          onPress={() => navigation.navigate("IDCardImagePage")}
        />
      );
    } else {
      return (
        <ImageContainer>
          <ImageBox
            url={photos && photos.map((item, i) => renderImage(item, i))}
            showButton
            onPress={() => navigation.navigate("IDCardImagePage")}
          />
          <ViewImage>
            {photos && photos.map((item, i) => renderImage(item, i))}
          </ViewImage>
        </ImageContainer>
      );
    }
  };

  return (
    <Container>
      <Input
        label="이름"
        value={name}
        onChangeText={_handleNameChange}
        onSubmitEditing={() => {}}
        placeholder="이름"
        returnKeyType="next"
      />
      <ErrorText>{errorMessage}</ErrorText>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingTop: 20,
          paddingLeft: 40,
          alignSelf: "flex-start",
        }}
      >
        학생인증 가능한 사진을 첨부해 주세요
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#a6a6a6",
          paddingTop: 10,
          paddingLeft: 40,
          alignSelf: "flex-start",
        }}
      >
        학생증, 재학 증면서, 졸업장 등
      </Text>
      <PicutreContainer>
        <>{_showPhotos()}</>
      </PicutreContainer>

      {/* <ButtonContainer>
        <ImageButton>
          <Text
            style={{
              fontSize: 14,

              textAlign: "center",
              paddingTop: 8,
              color: "#222",
            }}
          >
            사진촬영
          </Text>
        </ImageButton>
        <ImageButton>
          <Text
            style={{
              fontSize: 14,

              textAlign: "center",
              paddingTop: 8,
              color: "#222",
            }}
          >
            파일찾기
          </Text>
        </ImageButton>
      </ButtonContainer> */}

      <Button title="다음" onPress={_handleSignUpPage} disabled={disabled} />
    </Container>
  );
};

export default Auth;
