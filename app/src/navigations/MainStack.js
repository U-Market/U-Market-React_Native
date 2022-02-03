import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "styled-components/native";
import * as Font from "expo-font";

import MainTab from "./MainTab";

import {
  Alert,
  DetailViewPage,
  ServiceCenterPage,
  WatchlistPage,
  NoticePage,
  AccountPage,
  PasswordUpdatePage,
  IdUpdatePage,
  TransactionPage,
  ReviewManagementPage,
  EventPage,
  FreeBoardPage,
  ReplyPage,
  MarketDetailPage,
  MarketWritePage,
  CommunityWritePage,
  CategorySelectPage,
  CouponPage,
  LanguegePage,
  TradeRelatedPage,
  InquiryPage,
  ImageMediaPage,
  BookmarkPage,
  ProfileImageMediaPage,
  ChatScreenPage,
  BuyerListSelectPage,
  ReviewWritePage,
  MarketCategoryPage,
  MarketSearchPage,
  CommunitySearchPage,
  CommunitySearchResultPage,
  SearchSeeMorePage,
  MarketEditPage,
  CommunityEditPage,
  LookupPage,
  MarketSearchResultPage,
} from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  const [isFontReady, setIsFontReady] = useState(false);
  // const [login, setLogin] = useState(false);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    _loadFonts();
  }, [isFontReady]);

  async function _loadFonts() {
    await Font.loadAsync({
      ROBOTO_BOLD: require("../../assets/fonts/Roboto-Bold.ttf"),
      ROBOTO_MEDIUM: require("../../assets/fonts/Roboto-Medium.ttf"),
      ROBOTO_REGULAR: require("../../assets/fonts/Roboto-Regular.ttf"),
      APPLE_GOTHIC: require("../../assets/fonts/AppleSDGothicNeoB.ttf"),
    });
    setIsFontReady(true);
  }

  if (isFontReady) {
    return (
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          cardStyle: { backgroundColor: theme.backgroundColor },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTab}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: null,
          })}
        />
        <Stack.Screen
          name="ChatScreenPage"
          component={ChatScreenPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketEditPage"
          component={MarketEditPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CommunityEditPage"
          component={CommunityEditPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MarketSearchPage"
          component={MarketSearchPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CommunitySearchPage"
          component={CommunitySearchPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketSearchResultPage"
          component={MarketSearchResultPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LookupPage"
          component={LookupPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CommunitySearchResultPage"
          component={CommunitySearchResultPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchSeeMorePage"
          component={SearchSeeMorePage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="BuyerListSelectPage"
          component={BuyerListSelectPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MarketCategoryPage"
          component={MarketCategoryPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ReviewWritePage"
          component={ReviewWritePage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Alert"
          component={Alert}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ServiceCenterPage"
          component={ServiceCenterPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WatchlistPage"
          component={WatchlistPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoticePage"
          component={NoticePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AccountPage"
          component={AccountPage}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="IdUpdatePage"
          component={IdUpdatePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PasswordUpdatePage"
          component={PasswordUpdatePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TransactionPage"
          component={TransactionPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ReviewManagementPage"
          component={ReviewManagementPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventPage"
          component={EventPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LanguegePage"
          component={LanguegePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FreeBoardPage"
          component={FreeBoardPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailViewPage"
          component={DetailViewPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ReplyPage"
          component={ReplyPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketDetailPage"
          component={MarketDetailPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketWritePage"
          component={MarketWritePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CommunityWritePage"
          component={CommunityWritePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CategorySelectPage"
          component={CategorySelectPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CouponPage"
          component={CouponPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TradeRelatedPage"
          component={TradeRelatedPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InquiryPage"
          component={InquiryPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ImageMediaPage"
          component={ImageMediaPage}
          options={{
            title: "이미지 선택",
          }}
        />

        <Stack.Screen
          name="BookmarkPage"
          component={BookmarkPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileImageMediaPage"
          component={ProfileImageMediaPage}
          options={{
            title: "프로필 이미지 선택",
          }}
        />
      </Stack.Navigator>
    );
  }
  return null;
};

export default MainStack;
