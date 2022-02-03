import React, { useContext, useState, useEffect } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert, RefreshControl } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

import Header from "../../../components/commons/Header";
import Community from "../../../components/communitys/boards/read-list/Community";

const INITIAL_START_NO = 0;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

function FreeBoardPage({ navigation, route }) {
  const [communities, setCommunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [startNo, setStartNo] = useState(INITIAL_START_NO);
  const [communitiesLength, setCommunitiesLength] = useState(0);

  const { categoryNo, headerTitle, selectedFilterData } = route?.params;

  const _handleWritePress = (params) => {
    navigation.replace("CommunityWritePage", params);
  };

  useEffect(() => {
    _loadBoards();
  }, []);

  // function getHttpQueryAboutFilter() {
  //   let query = "";
  //   // 필터 중 선택된게 있으면 Query를 추가한다.
  //   if (selectedFilterData.selectedRegion.item) {
  //     query += `&regionNo=${selectedFilterData.selectedRegion.value}`;
  //   }
  //   if (selectedFilterData.selectedSchool.item) {
  //     query += `&schoolNo=${selectedFilterData.selectedSchool.value}`;
  //   }
  //   if (selectedFilterData.selectedDepartment.item) {
  //     query += `&departmentNo=${selectedFilterData.selectedDepartment.value}`;
  //   }
  //   if (selectedFilterData.selectedMajor.item) {
  //     query += `&majorNo=${selectedFilterData.selectedMajor.value}`;
  //   }
  //   return query;
  // }

  const _loadBoards = async () => {
    try {
      // const query = getHttpQueryAboutFilter(); ${query}
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/communities/categories/${categoryNo}?startNo=${
          startNo - 1
        }&limit=${20}`,
        config
      ).then((res) => res.json());

      setCommunities([...communities, ...response.communities]);
      setCommunitiesLength(response.communities.length);
      setRefreshing(false);

      if (startNo === 0) {
        setStartNo(response?.communities[response.communities.length - 1]?.no);
        setCommunities([...response.communities]);
      }
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      setIsReady(true);
    }
  };

  const onRefresh = () => {
    setIsReady(false);
    setStartNo(Number(0));
    _loadBoards();
    setRefreshing(true);
  };

  const _handleLoadMore = () => {
    _loadBoards();
  };

  const renderLoader = () => {
    return <ActivityIndicatorContainer color="#999999" />;
  };

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={headerTitle}
      />
      {communitiesLength === 20 ? (
        <FlatList
          keyExtractor={(community, index) => index.toString()}
          data={communities}
          renderItem={({ item }) => (
            <Community
              community={item}
              navigation={navigation}
              categoryNo={categoryNo}
              headerTitle={headerTitle}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={1}
          ListFooterComponent={renderLoader}
        />
      ) : (
        <FlatList
          keyExtractor={(community, index) => index.toString()}
          data={communities}
          renderItem={({ item }) => (
            <Community
              community={item}
              navigation={navigation}
              categoryNo={categoryNo}
              headerTitle={headerTitle}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
        />
      )}

      <FAB
        buttonColor="#FFC352"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" size={28} />}
      />
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
}

export default FreeBoardPage;
