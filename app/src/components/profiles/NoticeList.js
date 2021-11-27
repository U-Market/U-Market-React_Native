import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";

import NoticeItem from "./NoticeItem";

const ScrollView = styled.ScrollView.attrs((props) => ({
  horizontal: false,
}))`
  width: 100%;
`;

const ItemList = ({ onPress }) => {
  // const [boards, setBoards] = useState([]);

  // const { spinner } = useContext(ProgressContext);
  // const { isReady, readyDispatch } = useContext(ReadyContext);

  // const _loadBoards = async () => {

  // };

  const notices = [];
  for (let idx = 1; idx < 4; idx++) {
    notices.push({
      num: idx,

      title: `개인정보 처리 방침 안내 ${idx}`,
      date: `2021.03.22`,
    });
  }

  const _noticeItems = () => {
    const Items = notices.map((board) => {
      return (
        <NoticeItem
          key={board.num}
          onPress={onPress}
          itemTitle={board.title}
          date={board.date}
        />
      );
    });

    return Items;
  };

  useEffect(() => {}, []);

  return <ScrollView>{_noticeItems()}</ScrollView>;
};

export default ItemList;
