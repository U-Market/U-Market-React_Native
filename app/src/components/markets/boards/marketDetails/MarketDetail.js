import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Ionicons } from "@expo/vector-icons";

import WriterInfo from "./WriterInfo";
import PostInfo from "./PostInfo";
import DamageAndTradingMethod from "./DamageAndTradingMethod";
import RelatedProductList from "./RelatedProductList";
import ImageSlider from "../../../main/todays/ImageSlider";
import t from "../../../../utils/translate/Translator";

const ItemContainer = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const ItemTextContainer = styled.View`
  width: 100%;
`;

const ImagePinchContainer = styled.View``;

const RelatedProduct = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  margin-top: 10px;
  width: 100%;
`;

const RelatedTitleContainer = styled.View`
  flex-direction: row;
`;

const RelatedTitle = styled.Text`
  font-size: 20px;
  margin: 10px 0px 15px 20px;
  font-weight: bold;
`;

const RelatedCategory = styled.Text`
  align-self: flex-end;
  margin: 0px 0px 15px 10px;
  color: ${({ theme }) => theme.mainOrange};
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  right: 15px;
`;

const MarketDetailView = ({
  navigation,
  product,
  relatedProducts,
  images,
  userNo,
  isSeller,
  setTradingStatus,
  tradingStatus,
  interestCnt,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [productImages, setProductImages] = useState([]);

  const expandImages = () => {
    setProductImages([
      ...productImages,
      ...product.images.map((url) => {
        return { url };
      }),
    ]);
  };

  useEffect(() => {
    expandImages();
  }, []);

  const pressIcon = () => {
    setIsModal(!isModal);
  };

  const _imagesSetting = () => {
    if (product.images !== undefined) {
      if (product.images.length) {
        return product.images.length ? (
          <ImagePinchContainer>
            <ImageSlider
              images={product.images}
              resizeMode={"contain"}
              isEvent={false}
            />
            <Icon onPress={pressIcon}>
              <Ionicons name="expand" size={36} color="black" />
            </Icon>
            <Modal visible={isModal} transparent={true}>
              <ImageViewer
                imageUrls={productImages}
                onClick={() => setIsModal(!isModal)}
              />
            </Modal>
          </ImagePinchContainer>
        ) : (
          <></>
        );
      }
    }

    if (images !== undefined) {
      return images.length ? (
        <>
          <ImageSlider images={images} resizeMode={"contain"} isEvent={false} />
        </>
      ) : (
        <></>
      );
    }
  };

  return (
    <>
      <ItemContainer>
        <ItemTextContainer>
          <WriterInfo
            image={product.profileUrl}
            nickname={product.nickname}
            inDate={product.inDate}
          />
          <>{_imagesSetting()}</>

          <PostInfo
            navigation={navigation}
            product={product}
            isSeller={isSeller}
            tradingStatus={tradingStatus}
            setTradingStatus={setTradingStatus}
            interestCnt={interestCnt}
          />
        </ItemTextContainer>
      </ItemContainer>
      <DamageAndTradingMethod
        damageStatus={product.damageStatus}
        isDirect={product.tradingMethods.isDirect}
        isDelivery={product.tradingMethods.isDelivery}
      />
      <RelatedProduct>
        <RelatedTitleContainer>
          <RelatedTitle>{t.print("RelatedProducts")}</RelatedTitle>
          <RelatedCategory>
            {t.print(product.detailCategoryName)}
          </RelatedCategory>
        </RelatedTitleContainer>

        <RelatedProductList
          relatedProducts={relatedProducts.filter((el) => el.no !== product.no)}
          navigation={navigation}
        />
      </RelatedProduct>
    </>
  );
};

export default MarketDetailView;
