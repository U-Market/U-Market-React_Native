import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert, ScrollView } from "react-native";
import { API_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";

import { getItemFromAsync, setItemToAsync } from "../../utils/AsyncStorage";
import t from "../../utils/translate/Translator";
import RecentSearchList from "./RecentSearchList";

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
  right: 15px;
  padding: 10px;
`;
const RecentSearchContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  margin-top: 15px;
  padding: 10px 0px 10px 15px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const RecentTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

function CommunitySearch({ navigation }) {
  const [search, setSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    _loadSearchList();
  }, [isLoading]);

  const _loadSearchList = async () => {
    try {
      const asyncStorageSearchList = await getItemFromAsync("Search");
      if (asyncStorageSearchList !== null)
        setSearchList(JSON.parse(asyncStorageSearchList).list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(true);
    }
  };

  const pressSearchBtn = async () => {
    if (search.length < 2) {
      Alert.alert("2자 이하는 검색 할 수 없습니다.");
    } else {
      try {
        if (!searchList.includes(search)) {
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

    const Items = objectSearchList.map((communities) => {
      const moveRecentSearchResultPage = async () => {
        const response = await fetch(
          `${API_URL}/api/search/communities?query=${communities.result}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json; charset=utf-8" },
          }
        ).then((res) => res.json());

        navigation.navigate("CommunitySearchResultPage", {
          searchList: response.communities,
          categoryNo: 15,
          headerTitle: communities.result,
        });
      };

      const deleteSearchListBtn = (communities) => {
        const deleteSearchList = searchList.filter((res) => {
          return res != communities;
        });
        setSearchList(deleteSearchList);
        setItemToAsync(
          "Search",
          JSON.stringify({
            list: deleteSearchList,
          })
        );
      };
      if (communities.result) {
        return (
          <RecentSearchList
            key={communities.result}
            onPress={moveRecentSearchResultPage}
            product={communities.result}
            deleteSearchListBtn={deleteSearchListBtn}
          />
        );
      }
      return <></>;
    });

    return Items;
  };

  return isLoading ? (
    <ScrollView scrollEnabled={false}>
      <Container>
        <SearchContainer>
          <SearchInput
            onChangeText={(search) => {
              setSearch(search.replace(/ /g, "+"));
            }}
            placeholder={t.print("WhatAreYouLookingFor")}
          />
          <Icon onPress={pressSearchBtn}>
            <FontAwesome5 name="search" size={20} color="#FFC352" />
          </Icon>
        </SearchContainer>

        <RecentSearchContainer>
          <RecentTitle>{t.print("RecentSearch")}</RecentTitle>
        </RecentSearchContainer>
        <ScrollView style={{ width: "100%" }}>
          <>{showSearchList()}</>
        </ScrollView>
      </Container>
    </ScrollView>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
}

export default CommunitySearch;
