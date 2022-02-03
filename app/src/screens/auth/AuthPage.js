import React from "react";
import styled from "styled-components/native";

import Auth from "../../components/auth/Auth";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const AuthPage = ({ navigation, route }) => {
  const { selectedFilterData } = route.params;
  const photos = route.params?.photos;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.navigate("SchoolSelectPage")}
        title={"학생 인증"}
      />
      <Auth
        navigation={navigation}
        selectedFilterData={selectedFilterData}
        photos={photos}
      />
    </Container>
  );
};

export default AuthPage;
