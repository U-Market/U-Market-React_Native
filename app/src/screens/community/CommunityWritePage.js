import React, { useState } from "react";
import { Text, Alert } from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../utils/AsyncStorage";
import Header from "../../components/commons/Header";
import Write from "../../components/communitys/boards/writes/Write";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-color: ${({ theme }) => theme.listBorder};
  border-bottom-width: 1px;
`;

const WriteViewContainer = styled.View`
  height: 100%;
  padding: 20px;
`;

const PostBtn = styled.TouchableOpacity`
  align-items: center;
  padding: 10px 20px 10px 20px;
  margin-right: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.boardsButton};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const CommunityWritePage = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isReady, setIsReady] = useState(true);

  const category = route.params?.category;
  const photos = route.params?.photos;

  const _registerCommunityByFetch = async () => {
    if (category === undefined) {
      Alert.alert(t.print("PleaseSelectACategory"));
      return;
    } else if (title.length < 2) {
      Alert.alert("제목은 2자이상 적어주세요");
      return;
    } else if (description.length < 5) {
      Alert.alert("내용이 너무 짧습니다");
      return;
    }

    let postNo;
    const imageResponse = {
      images: [],
    };
    let thumbnailImage = "";
    const userNo = await getItemFromAsync("userNo");
    const regionNo = await getItemFromAsync("regionNo");
    const schoolNo = await getItemFromAsync("schoolNo");
    const departmentNo = await getItemFromAsync("departmentNo");
    const majorNo = await getItemFromAsync("majorNo");
    try {
      setIsReady(false);
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
          `${API_URL}/api/image/community`,
          imageconfig
        ).then((res) => res.json());
        imageResponse.images = [...imageResponse.images, ...upload.images];
        let img = imageResponse.images[0];
        let imageKey = img.split("/")[img.split("/").length - 1];
        let folder = img.split("/")[img.split("/").length - 2];
        if (imageKey.includes("HEIC"))
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        else
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}?w=200&h=150`;
      }
    } catch (e) {
      console.log("이미지s3업로드 에러", e);
    }

    const community = {
      userNo: Number(userNo),
      regionNo: Number(regionNo),
      schoolNo: Number(schoolNo),
      departmentNo: Number(departmentNo),
      majorNo: Number(majorNo),
      detailCategoryNo: category.no,
      title: title,
      description: description,
    };

    if (thumbnailImage) {
      community.thumbnail = thumbnailImage;
    }

    try {
      const writeconfig = {
        method: "POST",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          community,
        }),
      };

      const writeResponse = await fetch(
        `${API_URL}/api/community`,
        writeconfig
      ).then((res) => res.json());

      if (writeResponse.communityNo) {
        postNo = writeResponse.communityNo;
        navigation.replace("DetailViewPage", {
          categoryNo: category.no,
          communityNo: writeResponse.communityNo,
          headerTitle: category.name,
          images: imageResponse.images,
          write: true,
        });
        Alert.alert(t.print("RegisterCompleted"));
      }
    } catch (e) {
      console.log("글등록 에러", e);
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
            no: Number(postNo),
            flag: 2,
            images: imageResponse.images,
          }),
        };

        const response = await fetch(`${API_URL}/api/image/store`, config).then(
          (res) => res.json()
        );
      }
    } catch (e) {
      console.log("이미지 url 변환에러", e);
    } finally {
      setIsReady(true);
    }
  };

  const pressPostBtn = (params) => {
    Alert.alert(
      "",
      t.print("WouldYouLikeToRegister"),
      [
        {
          text: t.print("Yes"),
          onPress: _registerCommunityByFetch,
          style: "cancel",
        },
        {
          text: t.print("No"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return isReady ? (
    <Container>
      <HeaderContainer>
        <Header
          moveViewByNavigation={() => navigation.goBack()}
          title={t.print("Writing")}
        />
        <PostBtn onPress={pressPostBtn}>
          <Text style={{ color: "#fff" }}>{t.print("Register")}</Text>
        </PostBtn>
      </HeaderContainer>

      <WriteViewContainer>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <Write
            setTitle={setTitle}
            setDescription={setDescription}
            categoryName={category ? category.name : t.print("ChooseACategory")}
            isMarket={false}
            navigation={navigation}
            photos={photos}
          />
        </ScrollView>
      </WriteViewContainer>
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default CommunityWritePage;
