import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

import WriterInfo from "./marketDetails/WriterInfo";
import PostInfo from "./marketDetails/PostInfo";
import DamageAndTradingMethod from "./marketDetails/DamageAndTradingMethod";
import RelatedProductList from "./RelatedProductList";
import ImageSlider from "../main/todays/ImageSlider";
import t from "../../utills/translate/Translator";

const ItemContainer = styled.SafeAreaView`
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const ItemTextContainer = styled.View`
  width: 100%;
`;

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
  function _imagesSetting() {
    if (product.images !== undefined) {
      if (product.images.length)
        return product.images.length ? (
          <>
            <ImageSlider
              images={product.images}
              resizeMode={"contain"}
              isEvent={false}
            />
          </>
        ) : (
          <></>
        );
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
  }

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
