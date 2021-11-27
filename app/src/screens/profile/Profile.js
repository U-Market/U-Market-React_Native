import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { API_URL } from "@env";
import AppLoading from "expo-app-loading";

import { ReadyContext, ProgressContext } from "../../contexts";
import MyRelated from "../../components/profiles/MyRelated";
import ProfileInformationContainer from "../../components/profiles/ProfileInfomationContainer";
import Header from "../../components/commons/Header";
import ProfileCategory from "../../components/profiles/ProfileCategory";
import { getItemFromAsync } from "../../utills/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const profile = ({ navigation }) => {
  const [profile, setProfile] = useState("");
  const [isReady, setIsReady] = useState(false);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const _loadData = async () => {
    try {
      spinner.start();
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
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  return isReady ? (
    <Container>
      <Header moveViewByNavigation={() => navigation.goBack()} title={"MY"} />

      <ProfileInformationContainer
        navigation={navigation}
        profile={profile}
        image={profile.profileUrl}
        setIsReady={setIsReady}
      />
      <MyRelated navigation={navigation} />
      <ProfileCategory navigation={navigation} />
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadData}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
};

export default profile;
