import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import styled, { ThemeContext } from "styled-components/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import MainTab from "./MainTab";

import {
  Alert,
  LoginQuestion,
  SignUpPage,
  LoginPage,
  SchoolSelectPage,
  AuthPage,
  FindPage,
  DetailViewPage,
  ServiceCenterPage,
  WatchlistPage,
  NoticePage,
  ProfileUpdatePage,
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
  CommunitySelectPage,
  CommunitySearchResultPage,
  SearchSeeMorePage,
} from "../screens";

import AlertContainer from "../components/alert/AlertContainer";

const Stack = createStackNavigator();

const MainStack = () => {
  const [isFontReady, setIsFontReady] = useState(false);

  const theme = useContext(ThemeContext);

  async function _loadFonts() {
    await Font.loadAsync({
      ROBOTO_BOLD: require("../../assets/fonts/Roboto-Bold.ttf"),
      ROBOTO_MEDIUM: require("../../assets/fonts/Roboto-Medium.ttf"),
      ROBOTO_REGULAR: require("../../assets/fonts/Roboto-Regular.ttf"),
      APPLE_GOTHIC: require("../../assets/fonts/AppleSDGothicNeoB.ttf"),
    });
  }

  return isFontReady ? (
    <Stack.Navigator
      initialRouteName="LoginQuestion"
      screenOptions={{
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={({ navigation }) => ({
          headerShown: false,
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
        name="MarketSearchPage"
        component={MarketSearchPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommunitySelectPage"
        component={CommunitySelectPage}
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
        name="LoginQuestion"
        component={LoginQuestion}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindPage"
        component={FindPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SchoolSelectPage"
        component={SchoolSelectPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthPage"
        component={AuthPage}
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
        name="ProfileUpdatePage"
        component={ProfileUpdatePage}
        options={{
          headerShown: false,
        }}
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
  ) : (
    <AppLoading
      startAsync={_loadFonts}
      onFinish={() => setIsFontReady(true)}
      onError={console.error}
    />
  );
};

export default MainStack;
