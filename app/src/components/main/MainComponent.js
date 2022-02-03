import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Platform,
  RefreshControl,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Constants from "expo-constants";
import { API_URL } from "@env";
import * as Notifications from "expo-notifications";

import { getItemFromAsync } from "../../utils/AsyncStorage";
import Today from "./todays/Today";
import Price from "./prices/Price";
import SawProduct from "./sawProducts/SawProduct";
import AlertIcon from "../alert/AlertIcon";
import t from "../../utils/translate/Translator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

const HeaderContainer = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

const MainTop = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.main};
`;

const SearchContainer = styled.TouchableOpacity`
  width: 100%;
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.View`
  border: 2px;
  border-color: ${({ theme }) => theme.main};
  width: 94%;
  border-radius: 5px;
  padding-left: 15px;
  height: 40px;
`;

const SearchTitle = styled.Text`
  font-size: 12px;
  height: 40px;
  line-height: 32px;
  color: ${({ theme }) => theme.text2};
`;

const Icon = styled.TouchableOpacity`
  position: absolute;
  right: 40px;
`;

const MainHeaderTitle = styled.View`
  width: 100%;
  margin-left: 15px;
`;

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MainComponent = ({ navigation }) => {
  const [status, setStatus] = useState("TODAY");
  const [refreshing, setRefreshing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  const listTab = [
    { status: "TODAY" },
    { status: t.print("ByPrice") },
    // { status: t.print("ViewedProducts") },
  ];

  function _handleCurrentTab() {
    return listTab.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[styles.btnTab, status == _menu.status && styles.btnTabActive]}
          onPress={() => {
            setStatusFilter(_menu.status);
          }}
        >
          <Text
            style={[
              styles.textTab,
              status === _menu.status && styles.TextTabActive,
            ]}
          >
            {_menu.status}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  function SeeMainTab() {
    if (status === "TODAY") {
      return <Today navigation={navigation} />;
    } else if (status === t.print("ByPrice")) {
      return <Price navigation={navigation} />;
    }
    // else {
    //   return <SawProduct navigation={navigation} />;
    // }
  }

  const moveMarketSelectPage = () => {
    navigation.navigate("MarketSearchPage");
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("푸시 알림을 위한 푸시 토큰을 가져오지 못했습니다!");
        return;
      }

      token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
      alert("푸시 알림에는 물리적 장치를 사용해야 합니다");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    try {
      const userNo = await getItemFromAsync("userNo");

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const tokenGetResponse = await fetch(
        `${API_URL}/api/notification/token/${Number(userNo)}`,
        config
      ).then((res) => res.json());

      if (!tokenGetResponse.msg) {
        if (tokenGetResponse[0].token) {
          const config = {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
            }),
          };
          const tokenPatchResponse = await fetch(
            `${API_URL}/api/notification/token/${Number(userNo)}`,
            config
          ).then((res) => res.json());
        }
      } else {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        };
        const tokenPostResponse = await fetch(
          `${API_URL}/api/notification/token/${Number(userNo)}`,
          config
        ).then((res) => res.json());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }

    return token;
  }

  const onRefresh = React.useCallback(() => {
    setIsReady(false);
    wait(2000).then(() => setIsReady(true));
  }, []);

  return isReady ? (
    <ScrollView
      style={{ flex: 1, width: "100%" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Container>
        <MainTop>
          <HeaderContainer>
            <MainHeaderTitle>
              <Image
                style={{ height: 40, width: 150 }}
                source={require("../../icons/umarket.png")}
              />
            </MainHeaderTitle>
            <AlertIcon navigation={navigation}></AlertIcon>
          </HeaderContainer>
          <SearchContainer onPress={moveMarketSelectPage}>
            <SearchInput>
              <SearchTitle>{t.print("searchComment")}</SearchTitle>
            </SearchInput>
            <Icon>
              <FontAwesome5 name="search" size={20} color="#FFC352" />
            </Icon>
          </SearchContainer>
          <View style={styles.listTab}>
            <>{_handleCurrentTab()}</>
          </View>
        </MainTop>
        {SeeMainTab()}
      </Container>
    </ScrollView>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default MainComponent;

const styles = StyleSheet.create({
  listTab: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    marginTop: 10,
    marginLeft: 20,
  },
  btnTab: {
    flexDirection: "row",
    marginLeft: 10,
    alignSelf: "center",
  },
  btnTabActive: {
    borderBottomWidth: 4,
    borderBottomColor: "#222",
  },
  textTab: {
    fontSize: 16,
    margin: 5,
    color: "#222",
    opacity: 0.5,
  },
  TextTabActive: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",

    opacity: 1,
  },
});
