import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import t from "../../../../utils/translate/Translator";

const ItemContainer = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  height: 70px;
  border-bottom-width: 1px;
  flex-direction: row;
  border-bottom-color: ${({ theme }) => theme.label};
  width: 90%;
  padding-left: 15px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  padding-left: 10px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const ItemIcon = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
const ItemDetaileTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 16px;
  padding-left: 20px;
  color: ${({ theme }) => theme.text2};
`;

const MarketCategorySelect = ({ navigation, isUpdate }) => {
  const [isClothes, setIsClothes] = useState(false);
  const [isElectronic, setIsElectronic] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [isAccessory, setIsAccessory] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [isStarGoods, setIsStarGoods] = useState(false);
  const [isAnimal, setIsAnimal] = useState(false);

  const theme = useContext(ThemeContext);

  if (isUpdate) {
    return (
      <>
        <ItemContainer onPress={() => setIsClothes(!isClothes)}>
          <Image source={require("../../../../icons/market/clothes.png")} />
          <ItemTitle>{t.print("Clothes")}</ItemTitle>
          <ItemIcon onPress={() => setIsClothes(!isClothes)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isClothes ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 1,
                    name: `${t.print("Clothes")}/${t.print("Male")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Male")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 2,
                    name: `${t.print("Clothes")}/${t.print("Female")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Female")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 3,
                    name: `${t.print("Clothes")}/${t.print("Unisex")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Unisex")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 4,
                    name: `${t.print("Clothes")}/${t.print("VarsityJacket")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("VarsityJacket")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsElectronic(!isElectronic)}>
          <Image source={require("../../../../icons/market/electronics.png")} />
          <ItemTitle>{t.print("Electronic")}</ItemTitle>
          <ItemIcon onPress={() => setIsElectronic(!isElectronic)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isElectronic ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 5,
                    name: `${t.print("Electronic")}/${t.print("Phone")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Phone")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 6,
                    name: `${t.print("Electronic")}/${t.print("Laptop")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Laptop")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 7,
                    name: `${t.print("Electronic")}/${t.print("Headphone")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Headphone")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 8,
                    name: `${t.print("Electronic")}/${t.print("Speaker")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Speaker")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 9,
                    name: `${t.print("Electronic")}/${t.print("Camera")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Camera")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 10,
                    name: `${t.print("Electronic")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsBook(!isBook)}>
          <Image source={require("../../../../icons/market/book.png")} />
          <ItemTitle>{t.print("Book")}</ItemTitle>
          <ItemIcon onPress={() => setIsBook(!isBook)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isBook ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 11,
                    name: `${t.print("Book")}/${t.print("Textbook")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Textbook")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 12,
                    name: `${t.print("Book")}/${t.print(
                      "NotebookWithKnowhow"
                    )}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>
                - {t.print("NotebookWithKnowhow")}
              </ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 13,
                    name: `${t.print("Book")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsAccessory(!isAccessory)}>
          <Image source={require("../../../../icons/market/accessory.png")} />
          <ItemTitle>{t.print("Accessory")}</ItemTitle>
          <ItemIcon onPress={() => setIsAccessory(!isAccessory)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isAccessory ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 14,
                    name: `${t.print("Accessory")}/${t.print("Necklace")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Necklace")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 15,
                    name: `${t.print("Accessory")}/${t.print("Ring")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Ring")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 16,
                    name: `${t.print("Accessory")}/${t.print("Bracelet")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Bracelet")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 17,
                    name: `${t.print("Accessory")}/${t.print("Earring")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Earring")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 18,
                    name: `${t.print("Accessory")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 19, name: `${t.print("DailyNecessity")}` },
            })
          }
        >
          <Image
            source={require("../../../../icons/market/dailynecessity.png")}
          />
          <ItemTitle>{t.print("DailyNecessity")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 20, name: `${t.print("GiftVoucher")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/giftcard.png")} />
          <ItemTitle>{t.print("GiftVoucher")}</ItemTitle>
        </ItemContainer>
        <ItemContainer onPress={() => setIsGame(!isGame)}>
          <Image source={require("../../../../icons/market/game.png")} />
          <ItemTitle>{t.print("Game")}</ItemTitle>
          <ItemIcon onPress={() => setIsGame(!isGame)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isGame ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 21,
                    name: `${t.print("Game")}/${t.print("BoardGame")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("BoardGame")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 22,
                    name: `${t.print("Game")}/${t.print("CD")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("CD")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 23,
                    name: `${t.print("Game")}/${t.print("GameMachine")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("GameMachine")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 24,
                    name: `${t.print("Game")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsStarGoods(!isStarGoods)}>
          <Image source={require("../../../../icons/market/stargoods.png")} />
          <ItemTitle>{t.print("StarGoods")}</ItemTitle>
          <ItemIcon onPress={() => setIsStarGoods(!isStarGoods)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isStarGoods ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 25,
                    name: `${t.print("StarGoods")}/${t.print("BoyIdol")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("BoyIdol")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 26,
                    name: `${t.print("StarGoods")}/${t.print("GirlIdol")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("GirlIdol")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 27,
                    name: `${t.print("StarGoods")}/${t.print("Actor")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Actor")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 28,
                    name: `${t.print("StarGoods")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 29, name: `${t.print("Sports_Leisure")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/sports.png")} />
          <ItemTitle>{t.print("Sports_Leisure")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 30, name: `${t.print("Beauty")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/beauty.png")} />
          <ItemTitle>{t.print("Beauty")}</ItemTitle>
        </ItemContainer>
        <ItemContainer onPress={() => setIsAnimal(!isAnimal)}>
          <Image source={require("../../../../icons/market/pet.png")} />
          <ItemTitle>{t.print("Pets")}</ItemTitle>
          <ItemIcon onPress={() => setIsAnimal(!isAnimal)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isAnimal ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 31,
                    name: `${t.print("Pets")}/${t.print("Dog")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Dog")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 32,
                    name: `${t.print("Pets")}/${t.print("Cat")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Cat")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketEditPage", {
                  category: {
                    no: 33,
                    name: `${t.print("Pets")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 36, name: `${t.print("Instrument")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/instrument.png")} />
          <ItemTitle>{t.print("Instrument")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 34, name: `${t.print("FreeSharing")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/freeShare.png")} />
          <ItemTitle>{t.print("FreeSharing")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketEditPage", {
              category: { no: 35, name: `${t.print("ETC")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/etc.png")} />
          <ItemTitle>{t.print("ETC")}</ItemTitle>
        </ItemContainer>
      </>
    );
  } else {
    return (
      <>
        <ItemContainer onPress={() => setIsClothes(!isClothes)}>
          <Image source={require("../../../../icons/market/clothes.png")} />
          <ItemTitle>{t.print("Clothes")}</ItemTitle>
          <ItemIcon onPress={() => setIsClothes(!isClothes)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isClothes ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 1,
                    name: `${t.print("Clothes")}/${t.print("Male")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Male")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 2,
                    name: `${t.print("Clothes")}/${t.print("Female")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Female")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 3,
                    name: `${t.print("Clothes")}/${t.print("Unisex")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Unisex")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 4,
                    name: `${t.print("Clothes")}/${t.print("VarsityJacket")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("VarsityJacket")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsElectronic(!isElectronic)}>
          <Image source={require("../../../../icons/market/electronics.png")} />
          <ItemTitle>{t.print("Electronic")}</ItemTitle>
          <ItemIcon onPress={() => setIsElectronic(!isElectronic)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isElectronic ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 5,
                    name: `${t.print("Electronic")}/${t.print("Phone")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Phone")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 6,
                    name: `${t.print("Electronic")}/${t.print("Laptop")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Laptop")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 7,
                    name: `${t.print("Electronic")}/${t.print("Headphone")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Headphone")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 8,
                    name: `${t.print("Electronic")}/${t.print("Speaker")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Speaker")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 9,
                    name: `${t.print("Electronic")}/${t.print("Camera")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Camera")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 10,
                    name: `${t.print("Electronic")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsBook(!isBook)}>
          <Image source={require("../../../../icons/market/book.png")} />
          <ItemTitle>{t.print("Book")}</ItemTitle>
          <ItemIcon onPress={() => setIsBook(!isBook)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isBook ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 11,
                    name: `${t.print("Book")}/${t.print("Textbook")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Textbook")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 12,
                    name: `${t.print("Book")}/${t.print(
                      "NotebookWithKnowhow"
                    )}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>
                - {t.print("NotebookWithKnowhow")}
              </ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 13,
                    name: `${t.print("Book")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsAccessory(!isAccessory)}>
          <Image source={require("../../../../icons/market/accessory.png")} />
          <ItemTitle>{t.print("Accessory")}</ItemTitle>
          <ItemIcon onPress={() => setIsAccessory(!isAccessory)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isAccessory ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 14,
                    name: `${t.print("Accessory")}/${t.print("Necklace")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Necklace")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 15,
                    name: `${t.print("Accessory")}/${t.print("Ring")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Ring")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 16,
                    name: `${t.print("Accessory")}/${t.print("Bracelet")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Bracelet")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 17,
                    name: `${t.print("Accessory")}/${t.print("Earring")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Earring")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 18,
                    name: `${t.print("Accessory")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 19, name: `${t.print("DailyNecessity")}` },
            })
          }
        >
          <Image
            source={require("../../../../icons/market/dailynecessity.png")}
          />
          <ItemTitle>{t.print("DailyNecessity")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 20, name: `${t.print("GiftVoucher")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/giftcard.png")} />
          <ItemTitle>{t.print("GiftVoucher")}</ItemTitle>
        </ItemContainer>
        <ItemContainer onPress={() => setIsGame(!isGame)}>
          <Image source={require("../../../../icons/market/game.png")} />
          <ItemTitle>{t.print("Game")}</ItemTitle>
          <ItemIcon onPress={() => setIsGame(!isGame)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isGame ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 21,
                    name: `${t.print("Game")}/${t.print("BoardGame")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("BoardGame")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 22,
                    name: `${t.print("Game")}/${t.print("CD")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("CD")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 23,
                    name: `${t.print("Game")}/${t.print("GameMachine")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("GameMachine")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 24,
                    name: `${t.print("Game")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer onPress={() => setIsStarGoods(!isStarGoods)}>
          <Image source={require("../../../../icons/market/stargoods.png")} />
          <ItemTitle>{t.print("StarGoods")}</ItemTitle>
          <ItemIcon onPress={() => setIsStarGoods(!isStarGoods)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isStarGoods ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 25,
                    name: `${t.print("StarGoods")}/${t.print("BoyIdol")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("BoyIdol")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 26,
                    name: `${t.print("StarGoods")}/${t.print("GirlIdol")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("GirlIdol")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 27,
                    name: `${t.print("StarGoods")}/${t.print("Actor")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Actor")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 28,
                    name: `${t.print("StarGoods")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 29, name: `${t.print("Sports_Leisure")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/sports.png")} />
          <ItemTitle>{t.print("Sports_Leisure")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 30, name: `${t.print("Beauty")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/beauty.png")} />
          <ItemTitle>{t.print("Beauty")}</ItemTitle>
        </ItemContainer>
        <ItemContainer onPress={() => setIsAnimal(!isAnimal)}>
          <Image source={require("../../../../icons/market/pet.png")} />
          <ItemTitle>{t.print("Pets")}</ItemTitle>
          <ItemIcon onPress={() => setIsAnimal(!isAnimal)}>
            <AntDesign name="down" size={30} color={theme.label} />
          </ItemIcon>
        </ItemContainer>
        {isAnimal ? (
          <>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 31,
                    name: `${t.print("Pets")}/${t.print("Dog")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Dog")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 32,
                    name: `${t.print("Pets")}/${t.print("Cat")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("Cat")}</ItemDetaileTitle>
            </ItemContainer>
            <ItemContainer
              onPress={() =>
                navigation.navigate("MarketWritePage", {
                  category: {
                    no: 33,
                    name: `${t.print("Pets")}/${t.print("ETC")}`,
                  },
                })
              }
            >
              <ItemDetaileTitle>- {t.print("ETC")}</ItemDetaileTitle>
            </ItemContainer>
          </>
        ) : (
          <></>
        )}
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 36, name: `${t.print("Instrument")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/instrument.png")} />
          <ItemTitle>{t.print("Instrument")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 34, name: `${t.print("FreeSharing")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/freeShare.png")} />
          <ItemTitle>{t.print("FreeSharing")}</ItemTitle>
        </ItemContainer>
        <ItemContainer
          onPress={() =>
            navigation.navigate("MarketWritePage", {
              category: { no: 35, name: `${t.print("ETC")}` },
            })
          }
        >
          <Image source={require("../../../../icons/market/etc.png")} />
          <ItemTitle>{t.print("ETC")}</ItemTitle>
        </ItemContainer>
      </>
    );
  }
};

export default MarketCategorySelect;
