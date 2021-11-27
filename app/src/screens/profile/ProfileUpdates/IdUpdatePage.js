import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, Text } from "react-native";
import { API_URL } from "@env";
import AppLoading from "expo-app-loading";

import { ReadyContext, ProgressContext } from "../../../contexts";
import Header from "../../../components/commons/Header";
import { getItemFromAsync } from "../../../utills/AsyncStorage";
import IdUpdate from "../../../components/profiles/ProfileUpdates/IdUpdate";
import t from "../../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const IdUpdatePage = ({ route, navigation }) => {
  const [nickname, setNickname] = useState("");
  const [isProfileUpdateReady, setIsProfileUpdateReady] = useState(false);
  const [profile, setProfile] = useState("");
  const [userNo, setUserNo] = useState("");

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const photos = route.params?.photos;
  const { setIsReady } = route.params;

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  const _loadData = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      spinner.start();
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`${API_URL}/api/user/${id}`, config).then(
        (res) => res.json()
      );

      setProfile(response.profile);
      setUserNo(id);
    } catch (e) {
      Alert.alert(t.print("FailedToBringUpThePost"), e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleIdUpdateSucess = async () => {
    const imageResponse = {
      images: [],
    };
    let profileImage = "";

    try {
      spinner.start();
      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
        }),
      };

      const response = await fetch(
        `${API_URL}/api/user/${userNo}`,
        config
      ).then((res) => res.json());
      console.log(response);
    } catch (e) {
      Alert.alert(t.print("FailedToBringUpThePost"), e.message);
    } finally {
      spinner.stop();
    }

    try {
      spinner.start();

      if (photos) {
        let formData = new FormData();
        for (let i in photos) {
          formData.append("upload", {
            uri: photos[i].uri,
            name: photos[i].name,
            type: photos[i].type,
          });
        }
        const imageconfig = {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json; charset=utf-8",
            "content-type": "multipart/form-data",
          },
        };

        const upload = await fetch(
          `${API_URL}/api/image/profile`,
          imageconfig
        ).then((res) => res.json());
        imageResponse.images = [upload.images];
        let img = imageResponse.images[0];
        let imageKey = img.split("/")[img.split("/").length - 1];
        let folder = img.split("/")[img.split("/").length - 2];

        if (imageKey.includes("HEIC")) {
          profileImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        }

        profileImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}?w=200`;
      }
    } catch (e) {
      Alert.alert(t.print("ImageRegistrationFailed"));
      console.log("이미지s3업로드 에러", e);
    } finally {
      spinner.stop();
    }

    try {
      if (imageResponse.images.length) {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            no: userNo, //userNo
            flag: 3,
            images: imageResponse.images,
          }),
        };

        const response = await fetch(`${API_URL}/api/image/store`, config).then(
          (res) => res.json()
        );
      }
    } catch (e) {
      Alert.alert(t.print("ImageRegistrationFailed"));
      console.log("이미지 url 변환에러", e);
    } finally {
    }
    setIsReady(false);
    navigation.navigate("Main");
    Alert.alert(t.print("YourProfileHasBeenModifiedNormally"));
  };

  return isProfileUpdateReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={t.print("EditProfile")}
      />
      <IdUpdate
        navigation={navigation}
        photos={photos}
        profile={profile}
        nickname={nickname}
        setNickname={setNickname}
        onPress={_handleIdUpdateSucess}
      />
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadData}
      onFinish={() => setIsProfileUpdateReady(true)}
      onError={console.error}
    />
  );
};

export default IdUpdatePage;
