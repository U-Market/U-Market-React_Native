import React, { useState, useContext, useEffect } from "react";
import { Text, Alert } from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../../utills/AsyncStorage";

import { ProgressContext, ReadyContext } from "../../../contexts";
import Header from "../../../components/commons/Header";
import Write from "../../../components/boards/writes/Write";
import DetailInsert from "../../../components/boards/writes/DetailInsert";
import t from "../../../utills/translate/Translator";

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
  border-bottom-width: 2px;
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
  background-color: ${({ theme }) => theme.mainOrange};
`;

const MarketWritePage = ({ navigation, route }) => {
  const { spinner } = useContext(ProgressContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isBargaining, setIsBargaining] = useState(true);
  const [damageStatusNo, setDamageStatusNo] = useState(2);
  const [isDirect, setIsDirect] = useState(true);
  const [isDelivery, setIsDelivery] = useState(true);

  const category = route?.params?.category;
  const photos = route.params?.photos;

  const { isReady, readyDispatch } = useContext(ReadyContext);

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  const _registerProductByFetch = async () => {
    if (category === undefined) {
      Alert.alert(t.print("PleaseSelectACategory"));
      return;
    }

    let productNo;
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
          `${API_URL}/api/image/product`,
          imageconfig
        ).then((res) => res.json());
        console.log(imageconfig);
        console.log(upload);
        imageResponse.images = [...imageResponse.images, ...upload.images];
        let img = imageResponse.images[0];
        let imageKey = img.split("/")[img.split("/").length - 1];
        let folder = img.split("/")[img.split("/").length - 2];
        console.log(imageKey);
        if (imageKey.includes("HEIC")) {
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        } else {
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}?w=200&h=150`;
        }
      }

      readyDispatch.notReady();
    } catch (e) {
      Alert.alert(t.print("ImageRegistrationFailed"));
      console.log("이미지s3업로드 에러", e);
    } finally {
      spinner.stop();
    }

    const product = {
      userNo: Number(userNo),
      regionNo: Number(regionNo),
      schoolNo: Number(schoolNo),
      departmentNo: Number(departmentNo),
      majorNo: Number(majorNo),
      detailCategoryNo: category.no,
      title,
      description,
      price,
      isBargaining,
      damageStatusNo,
      tradingMethods: {
        isDirect,
        isDelivery,
      },
    };
    if (thumbnailImage) {
      product.thumbnail = thumbnailImage;
    }

    try {
      const writeconfig = {
        method: "POST",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          product,
        }),
      };

      const writeResponse = await fetch(
        `${API_URL}/api/product`,
        writeconfig
      ).then((res) => res.json());

      if (writeResponse.productNo) {
        productNo = writeResponse.productNo;
        navigation.replace("MarketDetailPage", {
          categoryNo: category.no,
          productNo: writeResponse.productNo,
          headerTitle: category.name,
          images: imageResponse.images,
        });
        Alert.alert(t.print("RegisterCompleted"));
      }
    } catch (e) {
      Alert.alert(t.print("PostRegistrationFailed"), e.message);
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
            no: Number(productNo),
            flag: 1,
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
  };

  const _handlePostBtnPress = (params) => {
    Alert.alert(
      "", // 제목
      t.print("WouldYouLikeToRegister"), // 부제목
      [
        // 버튼 배열
        {
          text: t.print("Yes"),
          onPress: _registerProductByFetch,
          style: "cancel",
        },
        {
          text: t.print("No"),
          onPress: () =>
            Alert.alert(t.print("PostRegistrationHasBeenCancelled")),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <Header
          moveViewByNavigation={() => navigation.goBack()}
          title={t.print("Sale")}
        />
        <PostBtn onPress={_handlePostBtnPress}>
          <Text style={{ color: "#fff" }}>{t.print("Register")}</Text>
        </PostBtn>
      </HeaderContainer>

      <WriteViewContainer>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <Write
            navigation={navigation}
            isMarket={true}
            isBargaining={isBargaining}
            setTitle={setTitle}
            setDescription={setDescription}
            setIsBargaining={setIsBargaining}
            setPrice={setPrice}
            categoryName={category ? category.name : t.print("ChooseACategory")}
            photos={photos}
          />
          <DetailInsert
            setDamageStatusNo={setDamageStatusNo}
            setIsDirect={setIsDirect}
            setIsDelivery={setIsDelivery}
          />
        </ScrollView>
      </WriteViewContainer>
    </Container>
  );
};

export default MarketWritePage;
