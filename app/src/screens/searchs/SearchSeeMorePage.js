import React from "react";
import styled from "styled-components/native";

import Header from "../../components/commons/Header";
import Community from "../../components/communitys/boards/read-list/Community";
import { FlatList } from "react-native-gesture-handler";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background2};
`;

const SearchSeeMorePage = ({ navigation, route }) => {
  const { communities, headerTitle } = route?.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={headerTitle}
      />

      <FlatList
        keyExtractor={(community, index) => index.toString()}
        data={communities}
        renderItem={({ item }) => (
          <Community
            community={item}
            navigation={navigation}
            headerTitle={headerTitle}
          />
        )}
      />
    </Container>
  );
};

export default SearchSeeMorePage;
