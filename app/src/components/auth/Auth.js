import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Input, Button } from "../index";
import { ReadyContext } from "../../contexts";
import ImageBox from "../Image";
import { removeWhitespace, checkName } from "../../utills/common";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  padding-top: 40px;
`;

const PicutreContainer = styled.SafeAreaView`
  margin: 16px;
  width: 90%;
  padding-left: 18px;
  flex-direction: row;
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

  const _handleNameChange = (name) => {
    //공백제거 형식체크
    const changedName = removeWhitespace(name);
    setName(changedName);
    setErrorMessage(checkName(changedName) ? "" : "이름 형식을 지켜주세요");
  };

  const _handleSignUpPage = () => {
    navigation.navigate("SignUpPage", { name, selectedFilterData });
  };

  useEffect(() => {
    setDisabled(!(name && !errorMessage));
  }, [name, errorMessage]);

  // const renderImage = (item, i) => {
  //   return (
  //     <Image
  //       style={{ height: 80, width: 80, marginLeft: 5 }}
  //       source={{ uri: item.uri }}
  //       key={i}
  //     />
  //   );
  // };

  // const _showPhotos = () => {
  //   if (photos === undefined) {
  //     return (
  //       <ImageBox
  //         // url={photoUrl}
  //         showButton
  //         onPress={() => navigation.navigate("ImageMediaPage", { isMarket })}
  //       />
  //     );
  //   } else {
  //     return (
  //       <ImageContainer>
  //         <ImageBox
  //           // url={photoUrl}
  //           showButton
  //           onPress={() => navigation.navigate("ImageMediaPage", { isMarket })}
  //         />
  //         <ScrollViewImage>
  //           {photos && photos.map((item, i) => renderImage(item, i))}
  //         </ScrollViewImage>
  //       </ImageContainer>
  //     );
  //   }
  // };

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
        {/* <>{_showPhotos()}</> */}

        <ImageBox
          // url={photoUrl}
          showButton
          onPress={() => navigation.navigate("ImageMediaPage", { isMarket })}
        />
      </PicutreContainer>

      <ButtonContainer>
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
      </ButtonContainer>

      <Button title="다음" onPress={_handleSignUpPage} disabled={disabled} />
    </Container>
  );
};

export default Auth;
