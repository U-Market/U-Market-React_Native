import React, { useContext, useState, useEffect } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Alert } from "react-native";
import AppLoding from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

import Header from "../../../components/commons/Header";
import { ProgressContext, ReadyContext } from "../../../contexts";
import Community from "../../../components/boards/FreeBoardComponent";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

function FreeBoardPage({ navigation, route }) {
  const [communities, setCommunities] = useState([]);

  const { spinner } = useContext(ProgressContext);
  const { isReady, readyDispatch } = useContext(ReadyContext);

  const { categoryNo, headerTitle } = route?.params;

  const _handleWritePress = (params) => {
    readyDispatch.notReady();
    navigation.navigate("CommunityWritePage", params);
  };

  const _loadBoards = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${API_URL}/api/communities?startNo=${1}&limit=${20}&categoryNo=${categoryNo}`,
        config
      ).then((res) => res.json());

      setCommunities(response.communities);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    readyDispatch.notReady();
  }, []);

  return isReady ? (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={headerTitle}
      />

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
        // windowSize={3} // 렌더링 되는양을 조절
      />
      <FAB
        buttonColor="#FFC352"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" size={28} />}
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => readyDispatch.ready()}
      onError={console.error}
    />
  );
}

export default FreeBoardPage;
