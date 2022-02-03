import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Main, Community, Market, Profile, ChatListPage } from "../screens";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

const TabBarHomeIcon = ({ focused }) => {
  return focused ? (
    <View>
      <Image source={require("../icons/tabvar/homeSelect.png")} />
    </View>
  ) : (
    <View>
      <Image source={require("../icons/tabvar/home.png")} />
    </View>
  );
};

const TabBarCommunityIcon = ({ focused }) => {
  return focused ? (
    <View>
      <Image source={require("../icons/tabvar/communitySelect.png")} />
    </View>
  ) : (
    <View>
      <Image source={require("../icons/tabvar/community.png")} />
    </View>
  );
};

const TabBarMarketIcon = ({ focused }) => {
  const theme = useContext(ThemeContext);
  return focused ? (
    <View>
      <Image source={require("../icons/tabvar/marketSelect.png")} />
    </View>
  ) : (
    <View>
      <Image source={require("../icons/tabvar/market.png")} />
    </View>
  );
};

const TabBarmyPageIcon = ({ focused }) => {
  return focused ? (
    <View>
      <Image source={require("../icons/tabvar/mypageSelect.png")} />
    </View>
  ) : (
    <View>
      <Image source={require("../icons/tabvar/mypage.png")} />
    </View>
  );
};

const TabBarChatIcon = ({ focused }) => {
  return focused ? (
    <View>
      <Image source={require("../icons/tabvar/chatSelect.png")} />
    </View>
  ) : (
    <View>
      <Image source={require("../icons/tabvar/chat.png")} />
    </View>
  );
};

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.main,
        headerShown: false,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="U-Market"
        component={Main}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarHomeIcon({
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarCommunityIcon({
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarMarketIcon({
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="ChatListPage"
        component={ChatListPage}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarChatIcon({
              focused,
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarmyPageIcon({
              focused,
            }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
