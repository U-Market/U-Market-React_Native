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

const Edit = ({
  navigation,
  isMarket,
  setTitle,
  setDescription,
  categoryName,
  photos,
  community,
  isUpdate,
}) => {
  const moveCategrySelectPage = () => {
    navigation.navigate("CategorySelectPage", { isMarket, isUpdate });
  };

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 80, width: 80, marginLeft: 5 }}
        source={{ uri: item.uri }}
      />
    );
  };

  const renderUpdatePageImage = (item, i) => {
    return (
      <Image
        style={{ height: 80, width: 80, marginLeft: 5 }}
        source={{ uri: item }}
        key={i}
      />
    );
  };

  const _showPhotos = () => {
    if (community.images !== undefined) {
      return (
        <ImageContainer>
          <ImageBox
            showButton
            onPress={() =>
              navigation.navigate("ImageMediaPage", { isMarket, isUpdate })
            }
          />
          <ScrollViewImage>
            {photos && photos.map((item, i) => renderImage(item, i))}
            {community.images.map((item, i) => renderUpdatePageImage(item, i))}
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
      >
        {community.title}
      </Input>
      <CategorySelect onPress={moveCategrySelectPage}>
        <Text>
          {categoryName === "카테고리 선택"
            ? community.categoryName
            : categoryName}
        </Text>
      </CategorySelect>

      <Description
        multiline={true}
        onChangeText={(text) => setDescription(text)}
        placeholder={t.print("PleaseWriteItDown")}
        returnKeyType="done"
      >
        {community.description}
      </Description>
    </>
  );
};

export default Edit;
