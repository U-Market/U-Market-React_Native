import React, { useState, useEffect } from "react";
import { Text, Alert } from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../../utils/AsyncStorage";
import Header from "../../../components/commons/Header";
import Edit from "../../../components/communitys/boards/edits/Edit";
import t from "../../../utils/translate/Translator";

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

const CommunityEditPage = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isReady, setIsReady] = useState(true);
  const [community, setCommunity] = useState({});
  const [categoryNo, setCategoryNo] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  const category = route.params?.category;
  const photos = route.params?.photos;
  const { isUpdate, updateCommunityNo } = route.params
    ? route.params
    : { isUpdate: undefined, updateCommunityNo: undefined };

  useEffect(() => {
    _loadData();
  }, []);

  const _loadData = async () => {
    try {
      const id = await getItemFromAsync("userNo");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/communities/${updateCommunityNo}/${id}`,
        config
      ).then((res) => res.json());
      console.log(response);
      if (response?.community) {
        setCommunity(response.community);
        setTitle(response.community.title);
        setImages(response.community.images);
        setDescription(response.community.description);
        setCategoryNo(response.community.categoryNo);
        setCategoryName(response.community.categoryName);
        setThumbnail(response.community.thumbnail);
      } else {
        Alert.alert(t.print("FailedToBringUpThePost"));
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsReady(true);
    }
  };

  const _registerCommunityByFetch = async () => {
    if (category === undefined && categoryNo === 0) {
      return Alert.alert(t.print("PleaseSelectACategory"));
    } else if (title.length < 2) {
      return Alert.alert("제목은 2자이상 적어주세요");
    } else if (description.length < 5) {
      return Alert.alert("내용이 너무 짧습니다");
    } else if (photos === undefined && images.length !== 0) {
      return Alert.alert("사진을 선택해주세요");
    }

    const imageResponse = {
      images: [],
    };
    let thumbnailImage = "";

    if (photos) {
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
    }

    const community = {
      categoryNo: category?.no ?? categoryNo,
      title: title,
      description: description,
    };
    if (thumbnailImage) {
      community.thumbnail = thumbnailImage;
    } else {
      community.thumbnail = thumbnail;
    }

    try {
      const updateConfig = {
        method: "PUT",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          community,
        }),
      };

      const updateResponse = await fetch(
        `${API_URL}/api/communities/${updateCommunityNo}`,
        updateConfig
      ).then((res) => res.json());

      navigation.replace("DetailViewPage", {
        categoryNo: category?.no ?? categoryNo,
        communityNo: Number(updateCommunityNo),
        headerTitle: category?.name ?? categoryName,
        images: imageResponse.images,
        write: true,
      });
      console.log(updateResponse);
      console.log(updateConfig);
    } catch (e) {
      console.log("글등록 에러", e);
    } finally {
      Alert.alert(t.print("RegisterCompleted"));
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
            no: Number(updateCommunityNo),
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
          <Edit
            setTitle={setTitle}
            setDescription={setDescription}
            categoryName={category ? category.name : t.print("ChooseACategory")}
            isMarket={false}
            navigation={navigation}
            photos={photos}
            isUpdate={isUpdate}
            community={community}
          />
        </ScrollView>
      </WriteViewContainer>
    </Container>
  ) : (
    <ActivityIndicatorContainer />
  );
};

export default CommunityEditPage;
