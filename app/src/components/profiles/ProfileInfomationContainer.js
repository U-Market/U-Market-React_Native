import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import ProfileInfo from "../../components/profiles/ProfileInfo";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 20px 0px;
`;

const StudentSetting = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #fff;
`;

const ProfileInformationContainer = ({
  navigation,
  image,
  setIsReady,
  profile,
}) => {
  const theme = useContext(ThemeContext);

  const _handleProfileUpdate = () => {
    navigation.navigate("ProfileUpdatePage", { setIsReady: setIsReady });
  };

  return (
    <Container>
      <ProfileInfo
        image={image}
        nickname={profile.nickname}
        email={profile.email}
        trust={profile.trustScore}
      />
      <StudentSetting onPress={_handleProfileUpdate}>
        <Ionicons name="settings-outline" size={30} color={theme.text2} />
      </StudentSetting>
    </Container>
  );
};

export default ProfileInformationContainer;
