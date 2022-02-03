import React from "react";
import { StyleSheet, Image } from "react-native";
import { CheckBox } from "react-native-elements";

import styled from "styled-components/native";

import ImageBox from "../../../commons/Image";
import t from "../../../../utils/translate/Translator";

const ImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ScrollViewImage = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-left: 20px;
`;

const Input = styled.TextInput`
  padding: 20px 0 10px 4px;
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const CategorySelect = styled.TouchableOpacity`
  padding: 20px 0px 10px 4px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const Description = styled.TextInput`
  height: 100px;
  padding-top: 10px;
  padding-left: 4px;
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const Text = styled.Text`
  font-size: 16px;
  font-family: ROBOTO_BOLD;
  font-weight: bold;
`;

const Write = ({
  navigation,
  isMarket,
  setTitle,
  setDescription,
  categoryName,
  photos,
}) => {
  const moveCategrySelectPage = () => {
    navigation.navigate("CategorySelectPage", { isMarket });
  };

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 80, width: 80, marginLeft: 5 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  };

  const _showPhotos = () => {
    if (photos === undefined) {
      return (
        <ImageBox
          showButton
          onPress={() => navigation.navigate("ImageMediaPage", { isMarket })}
        />
      );
    } else {
      return (
        <ImageContainer>
          <ImageBox
            showButton
            onPress={() => navigation.navigate("ImageMediaPage", { isMarket })}
          />
          <ScrollViewImage>
            {photos && photos.map((item, i) => renderImage(item, i))}
          </ScrollViewImage>
        </ImageContainer>
      );
    }
  };

  return (
    <>
      <>{_showPhotos()}</>
      <Input
        onChangeText={(text) => setTitle(text)}
        placeholder={t.print("Title")}
        returnKeyType="next"
        onSubmitEditing={() => priceRef.current.focus()}
      />

      <CategorySelect onPress={moveCategrySelectPage}>
        <Text>{categoryName}</Text>
      </CategorySelect>

      <Description
        multiline={true}
        onChangeText={(text) => setDescription(text)}
        placeholder={t.print("PleaseWriteItDown")}
        returnKeyType="done"
      />
    </>
  );
};

export default Write;

const styles = StyleSheet.create({
  CheckBox: {
    alignSelf: "center",
    width: 15,
    height: 15,
    backgroundColor: "#222",
    borderColor: "#e3e3e3",
  },
});
