import React, { useContext } from "react";
import { Image } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import t from "../../utills/translate/Translator";

const Container = styled.View`
  flex-direction: row;
`;

const ImageContainer = styled.View`
  margin: 0px 10px 0px 20px;
`;

const TextContainer = styled.View`
  justify-content: center;
`;

const StudentId = styled.Text`
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
`;

const StudentEmail = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text2};
`;

const StudentTrust = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const TrustContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileInfo = ({ nickname, email, trust, image }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <ImageContainer>
        <Image
          style={{ height: 70, width: 70, borderRadius: 40 }}
          source={{
            uri: image,
          }}
        />
      </ImageContainer>
      <TextContainer>
        <StudentId>{nickname}</StudentId>
        <StudentEmail>{email}</StudentEmail>
        <TrustContainer>
          <StudentTrust>{t.print("trustScore")}</StudentTrust>
          <StudentId> │ </StudentId>
          <StudentTrust>{trust} / 5</StudentTrust>
        </TrustContainer>
      </TextContainer>
    </Container>
  );
};

export default ProfileInfo;
