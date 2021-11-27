import React, { useContext, useEffect, useState } from "react";
import { Text, View, Modal, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { API_URL } from "@env";

import { ProgressContext } from "../../../contexts";
import t from "../../../utills/translate/Translator";

const Container = styled.View`
  margin: 20px;
`;

const TradingStatusTitle = styled.Text`
  font-size: 12px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.placeholder};
`;

const ProductTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ProductTitle = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 20px;
  font-family: ROBOTO_BOLD;
`;

const CategoryName = styled.Text`
  align-self: flex-end;
  margin-left: 6px;
  font-size: 14px;
  font-family: ROBOTO_REGULAR;
  color: ${({ theme }) => theme.placeholder};
`;

const Description = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.subTitle};
`;

const PostInfoBottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

const WishAndHitContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const WishContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostInfoBottomText = styled.Text`
  margin-left: 4px;
  margin-right: 4px;
  font-size: 13px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text};
`;

const VerticalLine = styled.Text`
  color: ${({ theme }) => theme.placeholder};
`;

const Price = styled.Text`
  font-size: 20px;
  font-family: ROBOTO_BOLD;
  color: ${({ theme }) => theme.text};
`;

// ---

const TradingStatusContainer = styled.View`
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
`;

const TradingStatusSelect = styled.TouchableOpacity`
  flex-direction: row;
  color: ${({ theme }) => theme.text};
  position: absolute;
  right: 0px;
  bottom: 5px;
  align-items: center;
`;

const TradingStatusText = styled.Text`
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.main};
`;

const TradingStatusShow = styled.Text`
  flex-direction: row;
  color: ${({ theme }) => theme.text};
  position: absolute;
  right: 0px;
  bottom: 5px;
  align-items: center;
`;

const Sale = styled.TouchableOpacity`
  border: 1px;
  width: 90px;
  height: 30px;
  position: absolute;
  right: 0px;
  bottom: 40px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  justify-content: center;
  align-items: center;
`;

const Reserved = styled.TouchableOpacity`
  border: 1px;
  width: 90px;
  height: 30px;
  position: absolute;
  right: 0px;
  bottom: 67px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  justify-content: center;
  align-items: center;
`;

const SoldOut = styled.TouchableOpacity`
  border: 1px;
  width: 90px;
  height: 30px;
  position: absolute;
  right: 0px;
  bottom: 95px;
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.label};
  justify-content: center;
  align-items: center;
`;

const ModalRowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const TextTitleContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const TextContainer = styled.View`
  width: 100%;
  align-items: center;

  padding-bottom: 15px;
`;

const PostInfo = ({
  navigation,
  product,
  isSeller,
  interestCnt,
  tradingStatus,
  setTradingStatus,
}) => {
  const [isTradingStatusBtnActive, setIsTradingStatusBtnActive] =
    useState(false);
  const [soldOutModalVisible, setSoldOutModalVisible] = useState(false);

  const { spinner } = useContext(ProgressContext);

  const handleBuyerListSelectPage = () => {
    setSoldOutModalVisible(false);

    navigation.navigate("BuyerListSelectPage", {
      productNo: product.no,
      isSeller: isSeller,
    });
  };

  const clickSale = async () => {
    try {
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 1,
        }),
      };
      const response = await fetch(
        `${API_URL}/api/products/${product.no}/status`,
        config
      ).then((res) => res.json());
      setTradingStatus(t.print("판매중"));
      setIsTradingStatusBtnActive(!isTradingStatusBtnActive);
    } catch (e) {
      Alert.alert("실패했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const clickReserved = async () => {
    try {
      spinner.start();
      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 2,
        }),
      };
      const response = await fetch(
        `${API_URL}/api/products/${product.no}/status`,
        config
      ).then((res) => res.json());

      setTradingStatus(t.print("예약완료"));
      setIsTradingStatusBtnActive(!isTradingStatusBtnActive);
    } catch (e) {
      Alert.alert("실패했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const translationTransaction = () => {
    if (tradingStatus === "Is on sale" || tradingStatus === "판매중") {
      return <Text>{t.print(`판매중`)}</Text>;
    } else if (
      tradingStatus === "Reservation" ||
      tradingStatus === "예약완료"
    ) {
      return <Text>{t.print(`예약완료`)}</Text>;
    }
  };
  const _selectStatus = () => {
    if (isSeller && tradingStatus !== t.print("판매완료")) {
      return (
        <>
          <TradingStatusContainer>
            <TradingStatusText>
              {t.print("CurrentTransactionState")}
            </TradingStatusText>

            <TradingStatusSelect
              onPress={() =>
                setIsTradingStatusBtnActive(!isTradingStatusBtnActive)
              }
            >
              <>{translationTransaction()}</>
              <AntDesign name="up" size={24} color="#ffc352" />
            </TradingStatusSelect>
          </TradingStatusContainer>
          {isTradingStatusBtnActive ? (
            <>
              <Sale onPress={clickSale}>
                <Text>{t.print("판매중")}</Text>
              </Sale>
              <Reserved onPress={clickReserved}>
                <Text>{t.print("예약완료")}</Text>
              </Reserved>
              <>
                <SoldOut onPress={() => setSoldOutModalVisible(true)}>
                  <Text>{t.print("판매완료")}</Text>
                  <Modal
                    animationType="fade"
                    visible={soldOutModalVisible}
                    transparent={true}
                    onBackdropPress={() => setSoldOutModalVisible(false)}
                    backdropColor="black"
                    hasBackdrop={true}
                  >
                    <View
                      style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#ffffff",
                            width: 300,
                            height: 150,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TextTitleContainer>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                // paddingLeft: 35,
                              }}
                            >
                              {t.print("AreYouSureYouWantTo")}
                            </Text>
                          </TextTitleContainer>
                          <TextContainer>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                // paddingLeft: 35,
                              }}
                            >
                              {t.print("CompleteTransaction")}
                            </Text>
                          </TextContainer>
                          <TextContainer>
                            <Text style={{ color: "#666666" }}>
                              {t.print("GoToBuyerSelectionScreen")}
                            </Text>
                          </TextContainer>

                          <ModalRowContainer>
                            <TouchableOpacity
                              style={{
                                width: 150,
                                alignItems: "center",
                                color: "#ffc352",
                                borderRightWidth: 1,
                                borderRightColor: "#c9c9c9",
                              }}
                              onPress={() => setSoldOutModalVisible(false)}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "#ffc352",
                                }}
                              >
                                {t.print("Cancle")}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                width: 150,
                                alignItems: "center",
                              }}
                              onPress={handleBuyerListSelectPage}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: "#ffc352",
                                }}
                              >
                                {t.print("Confirm")}
                              </Text>
                            </TouchableOpacity>
                          </ModalRowContainer>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </SoldOut>
              </>
            </>
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return (
        <>
          <TradingStatusContainer>
            <TradingStatusText>
              {t.print("CurrentTransactionState")}
            </TradingStatusText>
            <TradingStatusShow>
              <Text>{t.print(product.tradingStatus)}</Text>
            </TradingStatusShow>
          </TradingStatusContainer>
        </>
      );
    }
  };

  return (
    <Container>
      <TradingStatusTitle>{t.print(product.tradingStatus)}</TradingStatusTitle>
      <ProductTitleContainer>
        <ProductTitle>{product.title}</ProductTitle>
        <CategoryName>{t.print(product.detailCategoryName)}</CategoryName>
      </ProductTitleContainer>

      <Description>{product.description}</Description>

      <PostInfoBottomContainer>
        <WishAndHitContainer>
          <WishContainer>
            <AntDesign name="heart" size={14} color="pink" />
            <PostInfoBottomText>
              {`${t.print("Interest")} ${interestCnt}`}
            </PostInfoBottomText>
          </WishContainer>
          <VerticalLine>|</VerticalLine>
          <PostInfoBottomText>
            {`${t.print("Views")} ${product.hit}`}
          </PostInfoBottomText>
        </WishAndHitContainer>

        <Price>{`${product.price}${t.print("Won")}`}</Price>
      </PostInfoBottomContainer>
      <>{_selectStatus()}</>
    </Container>
  );
};

export default PostInfo;
