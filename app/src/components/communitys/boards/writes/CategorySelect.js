import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

import CommunityCategorySelect from "../../../communitys/boards/writes/CommunityCategorySelect";
import MarketCategorySelect from "./MarketCategorySelect";

const Container = styled.SafeAreaView`
  align-items: center;
`;

const CategorySelect = ({ navigation, isMarket }) => {
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
