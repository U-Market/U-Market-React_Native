/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View, Text } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from "../../../react-native-gifted-chat";

// export const renderAvatar = (props) => (
//   // <Avatar
//   //   {...props}
//   //   containerStyle={{ left: { borderWidth: 3, borderColor: "red" }, right: {} }}
//   //   imageStyle={{ left: { borderWidth: 3, borderColor: "blue" }, right: {} }}
//   // />
// );

export const renderBubble = (props) => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
    // containerStyle={{
    //   left: {},
    //   right: {},
    // }}
    // wrapperStyle={{
    //   left: {},
    //   right: {},
    // }}
    // bottomContainerStyle={{
    //   left: {},
    //   right: {},
    // }}
    tickStyle={{}}
    // usernameStyle={{ color: "tomato", fontWeight: "100" }}
    containerToNextStyle={{
      left: {},
      right: {},
    }}
    containerToPreviousStyle={{
      left: {},
      right: {},
    }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
    containerStyle={{
      left: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingTop: 5,
      },
      right: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingTop: 5,
      },
    }}
    bottomContainerStyle={{
      left: {
        backgroundColor: "#f5f5f",
      },
      right: {
        backgroundColor: "#f5f5f",
        color: "#222",
      },
    }}
  />
);

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      left: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 3,
      },
      right: {
        backgroundColor: "#ffc352",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 3,
      },
    }}
    textStyle={{
      left: { color: "#222" },
      right: { color: "#fff" },
    }}
    linkStyle={{
      left: { color: "blue" },
      right: { color: "blue" },
    }}
    customTextStyle={{ fontSize: 14, lineHeight: 14, paddingTop: 5 }}
  />
);

// export const renderCustomView = ({ user }) => (
//   <View>
//     {/* <Text>
//       Current user:
//       {user.name}
//     </Text>
//     <Text>From CustomView</Text> */}
//   </View>
// );
