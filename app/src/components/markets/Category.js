import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Text, View, Image, Alert } from "react-native";

import t from "../../utills/translate/Translator";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 20px;
  width: 100%;
  align-self: flex-start;
  padding: 10px 0px 10px 20px;
  font-weight: bold;
`;

const Menu = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  padding: 10px 0px 20px 0px;
`;

const Icon = styled.TouchableOpacity`
  width: 20%;
  align-items: center;
`;

const Category = ({ navigation }) => {
  return (
    <Container>
      <Title>{t.print("Categories")}</Title>
      <Menu>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 1,
              headerTitle: t.print("Clothes"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/clothes.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Clothes")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 2,
              headerTitle: t.print("Electronic"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/electronics.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Electronic")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 3,
              headerTitle: t.print("Book"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/book.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Book")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 4,
              headerTitle: t.print("Instrument"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/instrument.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Instrument")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 5,
              headerTitle: t.print("Accessory"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/accessory.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Accessory")}</Text>
        </Icon>
      </Menu>
      <Menu>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 6,
              headerTitle: t.print("DailyNecessity"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/dailynecessity.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("DailyNecessity")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 7,
              headerTitle: t.print("GiftVoucher"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/giftcard.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("GiftVoucher")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 8,
              headerTitle: t.print("Game"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/game.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Game")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 9,
              headerTitle: t.print("StarGoods"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/stargoods.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("StarGoods")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 10,
              headerTitle: t.print("Sports_Leisure"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/sports.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Sports_Leisure")}</Text>
        </Icon>
      </Menu>
      <Menu>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 11,
              headerTitle: t.print("Beauty"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/beauty.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Beauty")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 12,
              headerTitle: t.print("Pets"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/pet.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("Pets")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 13,
              headerTitle: t.print("FreeSharing"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/freeShare.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("FreeSharing")}</Text>
        </Icon>
        <Icon
          onPress={() =>
            navigation.navigate("MarketCategoryPage", {
              categoryNo: 14,
              headerTitle: t.print("ETC"),
            })
          }
        >
          <View>
            <Image source={require("../../icons/market/etc.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("ETC")}</Text>
        </Icon>
        <Icon
          // onPress={

          //   //  () =>
          //   //   navigation.navigate("", {
          //   //     categoryNo: 1,
          //   //     headerTitle: "광고문의",
          //   //   })
          // }
          onPress={() => Alert.alert(t.print("TheresNoFunctionYet"))}
        >
          <View>
            <Image source={require("../../icons/market/AD.png")} />
          </View>
          <Text style={{ fontSize: 10 }}>{t.print("AdvertisingInquiry")}</Text>
        </Icon>
      </Menu>
    </Container>
  );
};

export default Category;
