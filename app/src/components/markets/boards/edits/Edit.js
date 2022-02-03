import React from "react";
import { Image } from "react-native";
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

const PriceInputContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PriceInput = styled.TextInput.attrs({
  keyboardType: "numeric",
})`
  flex: 2;
  padding: 20px 0px 10px 4px;
  font-size: 16px;
  font-family: ROBOTO_REGULAR;
`;

const Bargain = styled.TouchableOpacity`
  flex: 1;
  padding: 20px 0px 10px 0px;
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
  isBargaining,
  setTitle,
  setDescription,
  setIsBargaining,
  setPrice,
  categoryName,
  photos,
  product,
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
    if (product.images !== undefined) {
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
            {product.images.map((item, i) => renderUpdatePageImage(item, i))}
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
        {product.title}
      </Input>

      <PriceInputContainer>
        <PriceInput
          onChangeText={(text) => setPrice(text)}
          placeholder={t.print("Price")}
          returnKeyType="next"
        >
          {product.price}
        </PriceInput>
        <Bargain onPress={() => setIsBargaining(!isBargaining)}>
          <CheckBox
            iconRight
            title={t.print("Bargaining")}
            checkedColor="orange"
            checked={isBargaining}
            onPress={() => setIsBargaining(!isBargaining)}
            containerStyle={{
              marginTop: 0,
              marginRight: 0,
              marginLeft: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingRight: 0,
              paddingLeft: 0,
              paddingBottom: 0,
              borderWidth: 0,
              backgroundColor: "#fff",
            }}
          />
        </Bargain>
      </PriceInputContainer>
      <CategorySelect onPress={moveCategrySelectPage}>
        <Text>
          {categoryName === "카테고리 선택"
            ? product.detailCategoryName
            : categoryName}
        </Text>
      </CategorySelect>

      <Description
        multiline={true}
        onChangeText={(text) => setDescription(text)}
        placeholder={t.print("PleaseWriteItDown")}
        returnKeyType="done"
      >
        {product.description}
      </Description>
    </>
  );
};

export default Edit;
