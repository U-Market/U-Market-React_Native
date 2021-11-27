import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, Alert, View } from "react-native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

import { getItemFromAsync, setItemToAsync } from "../../utills/AsyncStorage";
import t from "../../utills/translate/Translator";
import RecentSearchList from "./RecentSearchList";
import { ProgressContext } from "../../contexts";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

const SearchContainer = styled.TouchableOpacity`
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.TextInput.attrs({
  placeholderPaddingLeft: 10,
})`
  border: 2px;
  border-color: ${({ theme }) => theme.main};
  width: 94%;
  border-radius: 5px;
  padding-left: 15px;
  height: 50px;
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
`;
const RecentSearchContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 15px;
  /* border-bottom-width: 1px; */

  padding: 10px 0px 10px 15px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const RecentTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

function CommunitySearch({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);

  const { spinner } = useContext(ProgressContext);

  const _loadSearchList = async () => {
    try {
      spinner.start();
      const asyncStorageSearchList = await getItemFromAsync("Search");
      if (asyncStorageSearchList !== null)
        setSearchList(JSON.parse(asyncStorageSearchList).list);
    } catch (err) {
      console.error(err);
    } finally {
      spinner.stop();
    }
  };

  const _handleSearchPress = async () => {
    if (search.length < 2) {
      Alert.alert("2자 이하는 검색 할 수 없습니다.");
    } else {
      try {
        if (!searchList.includes(search)) {
          console.log(search);
          setItemToAsync(
            "Search",
            JSON.stringify({
              list: [...searchList, search],
            })
          );
        }

        const response = await fetch(
          `${API_URL}/api/search/communities?query=${search}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=utf-8" },
          }
        ).then((res) => res.json());

        navigation.navigate("CommunitySearchResultPage", {
          searchList: response.communities,
          categoryNo: 15,
          headerTitle: search,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const showSearchList = () => {
    const objectSearchList = searchList.map((res) => {
      return { result: res };
    });

    const Items = objectSearchList.map((product) => {
      const moveSelectPage = async () => {
        const response = await fetch(
          `${API_URL}/api/search/communities?query=${product.result}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=utf-8" },
          }
        ).then((res) => res.json());
        navigation.navigate("CommunitySearchResultPage", {
          searchList: response.communities,
          categoryNo: 15,
          headerTitle: product.result,
        });
      };

      const deleteSearchListBtn = (product) => {
        const deleteSearchList = searchList.filter((res) => {
          return res != product;
        });
        setSearchList(deleteSearchList);
        setItemToAsync(
          "Search",
          JSON.stringify({
            list: deleteSearchList,
          })
        );
      };
      if (product.result) {
        return (
          <RecentSearchList
            key={product.result}
            onPress={moveSelectPage}
            product={product.result}
            deleteSearchListBtn={deleteSearchListBtn}
          />
        );
      }
      return <></>;
    });

    return Items;
  };

  return isReady ? (
    <Container>
      <SearchContainer>
        <SearchInput
          onChangeText={(search) => {
            setSearch(search.replace(/ /g, "+"));
          }}
          placeholder={t.print("WhatAreYouLookingFor")}
        />
        <Icon onPress={_handleSearchPress}>
          <FontAwesome5 name="search" size={20} color="#FFC352" />
        </Icon>
      </SearchContainer>
      <RecentSearchContainer>
        <RecentTitle>{t.print("RecentSearch")}</RecentTitle>
      </RecentSearchContainer>
      <>{showSearchList()}</>
    </Container>
  ) : (
    <AppLoading
      startAsync={_loadSearchList}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default CommunitySearch;
