import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";

import SawItem from "./SawItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))`
  padding-left: 20px;
  width: 100%;
`;

const SawList = ({ navigation, products }) => {
  const _handleItemPress = () => {
    navigation.navigate("CategoryDetailPage");
  };

  const _SawItems = () => {
    const Items = products.map((product) => {
      return (
        <SawItem
          key={product.no}
          onPress={_handleItemPress}
          imgUrl={product.thumbnail}
          itemTitle={product.title}
          price={product.price}
          date={product.inDate}
          wish={product.interestCnt}
        />
      );
    });

    return Items;
  };

  useEffect(() => {}, []);

  return <ScrollView>{_SawItems()}</ScrollView>;
};

export default SawList;
