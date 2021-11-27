import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { ScrollView } from "react-native";

import CommunityCategorySelect from "./CommunityCategorySelect";
import MarketCategorySelect from "./MarketCategorySelect";

const Container = styled.SafeAreaView`
  align-items: center;
`;

const CategorySelect = ({ navigation, isMarket }) => {
  const theme = useContext(ThemeContext);

  return (
    <ScrollView>
      <Container>
        {isMarket ? (
          <MarketCategorySelect navigation={navigation} />
        ) : (
          <CommunityCategorySelect navigation={navigation} />
        )}
      </Container>
    </ScrollView>
  );
};

export default CategorySelect;
