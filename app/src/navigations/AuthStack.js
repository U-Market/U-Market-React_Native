import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";

import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginQuestion,
  SignUpPage,
  LoginPage,
  SchoolSelectPage,
  AuthPage,
  FindPage,
  IDCardImagePage,
} from "../screens";

const Stack = createStackNavigator();

function AuthStack() {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="LoginQuestion"
      screenOptions={{
        cardStyle: { backgroundColor: theme.backgroundColor },
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="LoginQuestion"
        component={LoginQuestion}
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
        name="FindPage"
        component={FindPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IDCardImagePage"
        component={IDCardImagePage}
        options={{
          title: "학생증, 재학증명서 선택",
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
    </Stack.Navigator>
  );
}

export default AuthStack;
