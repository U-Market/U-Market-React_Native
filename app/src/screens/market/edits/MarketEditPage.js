import React, { useState, useEffect } from "react";
import { Text, Alert } from "react-native";
import styled from "styled-components/native";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";

import { getItemFromAsync } from "../../../utils/AsyncStorage";
import Header from "../../../components/commons/Header";
import Edit from "../../../components/markets/boards/edits/Edit";
import DetailInsert from "../../../components/markets/boards/writes/DetailInsert";
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
  border-bottom-width: 2px;
`;

const WriteContentsContainer = styled.View`
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

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const MarketEditPage = ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isBargaining, setIsBargaining] = useState(true);
  const [damageStatusNo, setDamageStatusNo] = useState(2);
  const [isDirect, setIsDirect] = useState(true);
  const [isDelivery, setIsDelivery] = useState(true);
  const [product, setProduct] = useState({});
  const [categoryNo, setCategoryNo] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [damageStatus, setDamageStatus] = useState("양호");

  const category = route?.params?.category;
  const photos = route.params?.photos;
  const { isUpdate, updateProductNo } = route.params
    ? route.params
    : { isUpdate: undefined, updateProductNo: undefined };

  useEffect(() => {
    _loadData();
  }, [isReady]);

  useEffect(() => {
    transfromDamageStatus();
  }, [damageStatus]);
  console.log(category?.name ?? categoryName);

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
        `${API_URL}/api/products/${updateProductNo}/${id}`,
        config
      ).then((res) => res.json());

      if (response?.product) {
        setProduct(response.product);
        setTitle(response.product.title);
        setIsBargaining(response.product.isBargaining);
        setDescription(response.product.description);
        setIsDelivery(response.product.tradingMethods.isDelivery);
        setIsDirect(response.product.tradingMethods.isDirect);
        setDamageStatus(response.product.damageStatus);
        setCategoryNo(response.product.detailCategoryNo);
        setImages(response.product.images);
        setCategoryName(response.product.detailCategoryName);
        setThumbnail(response.product.thumbnail);
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
  const _registerProductByFetch = async () => {
    if (category === undefined && categoryNo === 0) {
      return Alert.alert(t.print("PleaseSelectACategory"));
    } else if (title.length < 2) {
      return Alert.alert("제목은 2자이상 적어주세요");
    } else if (description.length < 5) {
      return Alert.alert("내용이 너무 짧습니다");
    } else if (photos === undefined && images.length === 0) {
      return Alert.alert("사진을 선택해주세요");
    }

    const imageResponse = {
      images: [],
    };
    let thumbnailImage = "";

    if (photos) {
      try {
        setIsReady(false);

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

        imageResponse.images = [...imageResponse.images, ...upload.images];
        let img = imageResponse.images[0];
        let imageKey = img.split("/")[img.split("/").length - 1];
        let folder = img.split("/")[img.split("/").length - 2];

        if (imageKey.includes("HEIC")) {
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}`;
        } else {
          thumbnailImage = `https://d31w371p5vvb99.cloudfront.net/${folder}/${imageKey}?w=200&h=150`;
        }
      } catch (e) {
        Alert.alert("이미지s3업로드 에러");
        console.log("이미지s3업로드 에러", e);
      }
    }

    const product = {
      title,
      description,
      price,
      isBargaining,
      detailCategoryNo: category?.no ?? categoryNo,
      damageStatusNo,
      tradingMethods: {
        isDirect,
        isDelivery,
      },
    };

    if (thumbnailImage) {
      product.thumbnail = thumbnailImage;
    } else {
      product.thumbnail = thumbnail;
    }

    try {
      const updateConfig = {
        method: "PUT",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          product,
        }),
      };

      const updateResponse = await fetch(
        `${API_URL}/api/products/${updateProductNo}`,
        updateConfig
      ).then((res) => res.json());
      navigation.replace("MarketDetailPage", {
        categoryNo: category?.no ?? categoryNo,
        productNo: updateProductNo,
        headerTitle: category?.name ?? categoryName,
        images: imageResponse.images,
        write: true,
      });
    } catch (e) {
      Alert.alert("수정실패", e.message);
      console.log(e.message);
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
            no: Number(updateProductNo),
            flag: 1,
            images: imageResponse.images,
          }),
        };

        const response = await fetch(`${API_URL}/api/image/store`, config).then(
          (res) => res.json()
        );
      }
    } catch (e) {
      Alert.alert("이미지 url 변환에러");
      console.log("이미지 url 변환에러", e);
    } finally {
      setIsReady(true);
    }
  };

  const transfromDamageStatus = () => {
    if (damageStatus === "최악") setDamageStatusNo(1);
    else if (damageStatus === "양호") setDamageStatusNo(2);
    else setDamageStatusNo(3);
  };

  const pressPostBtn = (params) => {
    Alert.alert(
      "",
      t.print("WouldYouLikeToRegister"),
      [
        {
          text: t.print("Yes"),
          onPress: _registerProductByFetch,
          style: "cancel",
        },
        {
          text: t.print("No"),
          onPress: "",
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
          title={t.print("Sale")}
        />
        <PostBtn onPress={pressPostBtn}>
          <Text style={{ color: "#fff" }}>{t.print("Register")}</Text>
        </PostBtn>
      </HeaderContainer>

      <WriteContentsContainer>
        <ScrollView scrollIndicatorInsets={{ right: 1 }}>
          <Edit
            navigation={navigation}
            isMarket={true}
            isBargaining={isBargaining}
            setTitle={setTitle}
            setDescription={setDescription}
            setIsBargaining={setIsBargaining}
            setPrice={setPrice}
            categoryName={category ? category.name : t.print("ChooseACategory")}
            photos={photos}
            product={product}
            isUpdate={isUpdate}
          />
          <DetailInsert
            setDamageStatus={setDamageStatus}
            setIsDirect={setIsDirect}
            setIsDelivery={setIsDelivery}
            isDelivery={isDelivery}
            isDirect={isDirect}
            damageStatus={damageStatus}
          />
        </ScrollView>
      </WriteContentsContainer>
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default MarketEditPage;
