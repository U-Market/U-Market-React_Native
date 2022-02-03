import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { API_URL } from "@env";

import MyActivity from "../../components/profiles/MyActivity";
import ProfileInformationContainer from "../../components/profiles/mains/ProfileInfomationContainer";
import Header from "../../components/commons/Header";
import ProfileCategory from "../../components/profiles/mains/ProfileCategory";
import { getItemFromAsync } from "../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const profile = ({ navigation }) => {
  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const _loadData = async () => {
    try {
      const userNo = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/user/${userNo}`,
        config
      ).then((res) => res.json());

      setProfile(response.profile);
      setIsLoading(true);
    } catch (e) {
      Alert.alert("유저 정보를 불러오지 못했습니다.", e.message);
    }
  };

  useEffect(() => {
    _loadData();
  }, [isLoading]);

  return isLoading ? (
    <Container>
      <Header moveViewByNavigation={() => navigation.goBack()} title={"MY"} />

      <ProfileInformationContainer
        navigation={navigation}
        profile={profile}
        image={profile.profileUrl}
        setIsLoading={setIsLoading}
      />
      <MyActivity navigation={navigation} />
      <ProfileCategory navigation={navigation} />
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default profile;
