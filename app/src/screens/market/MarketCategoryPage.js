import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import MarketCategory from "../../components/markets/mains/MarketCategory";
import Header from "../../components/commons/Header";
import t from "../../utils/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ScrollHorizontalView = styled.ScrollView.attrs({
  horizontal: true,
})`
  flex-direction: row;
  align-self: flex-start;
  height: 50px;
  width: 100%;
  max-height: 50px;
  background-color: ${({ theme }) => theme.background};
`;

const MarketCategoryPage = ({ navigation, route }) => {
  const [status, setStatus] = useState(t.print("All"));
  const [detail, setDetail] = useState("");

  const { headerTitle, categoryNo, searchList, selectedFilterData } =
    route.params;

  console.log(searchList, "marketcategorypage searchList");

  let listBtn = [];
  switch (categoryNo) {
    case 1:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("Male"), detail: "의류/남자" },
        { status: t.print("Female"), detail: "의류/여자" },
        { status: t.print("Unisex"), detail: "의류/공용" },
        { status: t.print("VarsityJacket"), detail: "의류/과잠" },
      ];
      break;
    case 2:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("Phone"), detail: "전자기기/핸드폰" },
        { status: t.print("Laptop"), detail: "전자기기/노트북" },
        { status: t.print("Headphone"), detail: "전자기기/이어폰" },
        { status: t.print("Speaker"), detail: "전자기기/스피커" },
        { status: t.print("Camera"), detail: "전자기기/카메라" },
        { status: t.print("ETC"), detail: "전자기기/기타" },
      ];
      break;
    case 3:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("Textbook"), detail: "책/교재" },
        { status: t.print("NotebookWithKnowhow"), detail: "책/개념노트정리" },
        { status: t.print("ETC"), detail: "책/기타" },
      ];
      break;
    case 5:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("Necklace"), detail: "악세서리/목걸이" },
        { status: t.print("Ring"), detail: "악세서리/반지" },
        { status: t.print("Bracelet"), detail: "악세서리/팔찌" },
        { status: t.print("Earring"), detail: "악세서리/귀걸이" },
        { status: t.print("ETC"), detail: "악세서리/기타" },
      ];
      break;
    case 8:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("BoardGame"), detail: "게임/보드게임" },
        { status: t.print("CD"), detail: "게임/CD" },
        { status: t.print("GameMachine"), detail: "게임/게임기" },
        { status: t.print("ETC"), detail: "게임/기타" },
      ];
      break;
    case 9:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("BoyIdol"), detail: "스타굿즈/남자아이돌" },
        { status: t.print("GirlIdol"), detail: "스타굿즈/여자아이돌" },
        { status: t.print("Actor"), detail: "스타굿즈/배우" },
        { status: t.print("ETC"), detail: "스타굿즈/기타" },
      ];
      break;
    case 12:
      listBtn = [
        { status: t.print("All") },
        { status: t.print("Dog"), detail: "애견/개" },
        { status: t.print("Cat"), detail: "애견/고양이" },
        { status: t.print("ETC"), detail: "애견/기타" },
      ];
      break;
    default:
      listBtn = [{ status: t.print("All") }];
      break;
  }

  function _handleCurrentBtn() {
    return listBtn.map((_menu, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={[styles.btnTab, status === _menu.status && styles.BtnActive]}
          onPress={() => {
            setStatusFilter(_menu.status, _menu.detail);
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

  const setStatusFilter = (status, detail) => {
    setStatus(status);
    setDetail(detail);
  };

  function MainContents() {
    return (
      <>
        <ScrollHorizontalView>
          <>{_handleCurrentBtn()}</>
        </ScrollHorizontalView>
      </>
    );
  }
  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("Main")}
        title={headerTitle}
      />
      <>{MainContents()}</>
      <MarketCategory
        headerTitle={headerTitle}
        categoryNo={categoryNo}
        navigation={navigation}
        status={status}
        detail={detail}
        searchList={searchList}
        selectedFilterData={selectedFilterData}
      ></MarketCategory>
    </Container>
  );
};

export default MarketCategoryPage;

const styles = StyleSheet.create({
  listBtn: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  btnTab: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 10,
  },
  textTab: {
    fontSize: 14,
    color: "#222",
    alignSelf: "center",
  },
  TextTabActive: {
    color: "#ffc352",
    fontWeight: "bold",
  },
  BtnActive: {
    borderBottomWidth: 5,
  },
});
