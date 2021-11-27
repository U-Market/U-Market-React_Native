import React, { useState } from "react";
import styled from "styled-components/native";
import { StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../theme";
import { API_URL } from "@env";
import { getItemFromAsync } from "../../utills/AsyncStorage";
import t from "../../utills/translate/Translator";

const Container = styled.Pressable``;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 180px;
  width: 85%;
  align-self: center;
  border-radius: 6px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0px 14px 15px;
  color: ${({ theme }) => theme.text2};
  font-weight: bold;
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ItemPrice = styled.Text`
  font-size: 18px;
  padding-left: 15px;
  /* padding-top: 12px; */
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const ItemStatus = styled.Text`
  font-size: 12px;
  /* position: absolute;
  right: 16px; */
  padding-left: 25px;
  color: ${({ theme }) => theme.green};
  font-weight: bold;
`;

const Wish = styled.TouchableOpacity`
  font-size: 14px;
  border: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  margin: 0px 8px 5px 15px;
  padding: 5px;
  border-radius: 5px;
`;

const WishContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Item = ({ onPress, imgUrl, itemTitle, price, statusNum, no }) => {
  const [isDelete, setIsDelete] = useState(false);

  const _statusNum = () => {
    if (statusNum === 1) {
      return <ItemStatus>{t.print("IsOnSale")}</ItemStatus>;
    } else if (statusNum === 2) {
      return <ItemStatus>{t.print("Reservation")}</ItemStatus>;
    } else {
      return <ItemStatus>{t.print("SoldOut")}</ItemStatus>;
    }
  };

  const _handleDeleteWish = async () => {
    const id = await getItemFromAsync("userNo");
    try {
      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userNo: Number(id),
          productNo: no,
        }),
      };

      const response = await fetch(`${API_URL}/api/watchlist`, config).then(
        (res) => res.json()
      );
      setIsDelete(true);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
    }
  };

  if (isDelete) {
    return <></>;
  }
  return isDelete ? (
    <></>
  ) : (
    <TouchableOpacity style={styles.shoadowBox} onPress={onPress}>
      <StyledImage source={{ uri: imgUrl }} />
      <ItemContent>
        <ItemPrice>
          {price}
          {t.print("Won")}
        </ItemPrice>
        <>{_statusNum()}</>
      </ItemContent>
      <ItemTitle>{itemTitle}</ItemTitle>
      <WishContainer>
        <Wish onPress={_handleDeleteWish}>
          <FontAwesome name="heart" size={20} color="red" />
        </Wish>
      </WishContainer>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  shoadowBox: {
    backgroundColor: theme.background,
    width: Dimensions.get("window").width / 2.2,
    height: 300,
    marginBottom: 6,
    paddingTop: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
});
