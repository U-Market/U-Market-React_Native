// import React, { useContext, useEffect } from "react";
// import styled from "styled-components/native";
// import { MaterialIcons } from "@expo/vector-icons";

// const Container = styled.TouchableOpacity`
//   flex-direction: row;
//   width: 100%;
//   border-bottom-width: 1px;
//   background-color: ${({ theme }) => theme.background};
//   border-color: ${({ theme }) => theme.label};
//   height: 90px;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const Icon = styled.View`
//   border: 1px;
//   margin: 0px 15px 0px 15px;
//   padding: 5px;
//   border-radius: 20px;
//   border-color: ${({ theme }) => theme.label};
// `;

// const TextContainer = styled.View`
//   height: 100%;
//   justify-content: center;
// `;

// const Title = styled.Text`
//   font-size: 17px;
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const Content = styled.Text`
//   color: ${({ theme }) => theme.text};
//   font-size: 12px;
// `;

// const InDate = styled.Text`
//   color: #979797;
//   font-size: 12px;
//   position: absolute;
//   right: 15px;
//   top: 15px;
// `;

// const AlertContainer = ({ navigation }) => {
//   const _handleDetailPage = () => {
//     navigation.navigate("DetailView");
//   };

//   return (
//     <Container onPress={_handleDetailPage}>
//       <Icon>
//         <MaterialIcons name="10k" size={40} color="#FFC352" />
//       </Icon>
//       <TextContainer>
//         <Title>거래 완료</Title>
//         <Content>등록완료</Content>
//       </TextContainer>
//       <InDate>10분전</InDate>
//     </Container>
//   );
// };

// export default AlertContainer;
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

export default function App() {
  return (
    <Button
      title="Press to Send Notification"
      onPress={async () => {
        await sendPushNotification(expoPushToken);
      }}
    />
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  console.log(expoPushToken, "expo");
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      host: "exp.host",
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
