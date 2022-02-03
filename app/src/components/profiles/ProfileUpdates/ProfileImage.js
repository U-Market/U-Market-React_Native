import React, { useEffect } from "react";
import styled from "styled-components/native";

import { AntDesign } from "@expo/vector-icons";
import { Platform, Alert } from "react-native";

import * as Permissions from "expo-permissions";
import t from "../../../utils/translate/Translator";

const Container = styled.View`
  align-self: center;
`;

const StyledImage = styled.View`
  background-color: ${({ theme }) => theme.background};
  width: 100px;
  height: 100px;
  border: 1px;
  border-radius: 50px;
  border-color: ${({ theme }) => theme.mainOrange};
`;

const HaveProfileImageButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  right: -40px;
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
    <HaveProfileImageButtonContainer onPress={onPress}>
      <ButtonIcon />
    </HaveProfileImageButtonContainer>
  );
};

const Image = ({ url, imageStyle, showButton, onPress }) => {
  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status !== "granted") {
            Alert.alert("Photo Permission", t.print("CameraPermisson"));
          }
        }
      } catch (e) {
        Alert.alert("Photo Permission Error", e.message);
      }
    })();
  }, []);

  const haveImage = () => {
    if (url !== undefined) {
      return (
        <Container>
          <StyledImage source={{ uri: url.uri }} style={imageStyle} />
          {showButton && <PhotoButton onPress={onPress} />}
        </Container>
      );
    } else {
      return (
        <Container>
          <StyledImage source={{ uri: url }} style={imageStyle} />
          {showButton && <PhotoButton onPress={onPress} />}
        </Container>
      );
    }
  };

  return <>{haveImage()}</>;
};

export default Image;
