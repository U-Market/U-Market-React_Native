import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { API_URL } from "@env";

import Header from "../../../components/commons/Header";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import IdUpdate from "../../../components/profiles/ProfileUpdates/IdUpdate";
import t from "../../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const IdUpdatePage = ({ route, navigation }) => {
  const [nickname, setNickname] = useState("");
  const [isProfileUpdateReady, setIsProfileUpdateReady] = useState(false);
  const [profile, setProfile] = useState("");
  const [userNo, setUserNo] = useState("");

  const photos = route.params?.photos;
  const { setIsLoading } = route.params;

  useEffect(() => {
    _loadData();
  }, [isProfileUpdateReady]);

  const _loadData = async () => {
    const id = await getItemFromAsync("userNo");
    try {
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
      setIsProfileUpdateReady(true);
    } catch (e) {
      Alert.alert(t.print("FailedToBringUpThePost"), e.message);
    }
  };

  const _handleIdUpdate = async () => {
    const imageResponse = {
      images: [],
    };
    let profileImage = "";
    setIsLoading(false);

    if (nickname === profile.nickname) {
      try {
        console.log("a");
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

          const response = await fetch(
            `${API_URL}/api/image/store`,
            config
          ).then((res) => res.json());
        }
      } catch (e) {
        Alert.alert(t.print("ImageRegistrationFailed"));
        console.log("이미지 url 변환에러", e);
      }
      navigation.navigate("Main");
      Alert.alert("프로필이 성공적으로 변경되었습니다.");
    } else {
      try {
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
      } catch (e) {
        Alert.alert(t.print("FailedToBringUpThePost"), e.message);
      }

      try {
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

          const response = await fetch(
            `${API_URL}/api/image/store`,
            config
          ).then((res) => res.json());
        }
      } catch (e) {
        Alert.alert(t.print("ImageRegistrationFailed"));
        console.log("이미지 url 변환에러", e);
      }
      navigation.navigate("Main");
      Alert.alert("프로필이 성공적으로 변경되었습니다.");
    }
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
        onPress={_handleIdUpdate}
      />
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default IdUpdatePage;
