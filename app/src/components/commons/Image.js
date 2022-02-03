import React, { useEffect } from "react";
import styled from "styled-components/native";

import { AntDesign } from "@expo/vector-icons";
import { Platform, Alert } from "react-native";

import * as Permissions from "expo-permissions";

const Container = styled.View`
  align-self: flex-start;
`;

const StyledImage = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 100px;
  height: 80px;
  border: 1px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.mainOrange};
`;

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 25px;
  left: 25px;
  width: 50px;
  height: 30px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(AntDesign).attrs({
  name: "camera",
  size: 30,
})`
  color: ${({ theme }) => theme.mainOrange};
`;

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Image = ({ showButton, onPress, profile }) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status !== "granted") {
            Alert.alert("Photo Permission", "권한요청을 허용 하시겠습니까?.");
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  if (profile) {
    return (
      <ProfilContainer>
        <ProfileImage />
        {showButton && <PhotoButton onPress={onPress} />}
      </ProfilContainer>
    );
  }
  return (
    <Container>
      <StyledImage />
      {showButton && <PhotoButton onPress={onPress} />}
    </Container>
  );
};

export default Image;
