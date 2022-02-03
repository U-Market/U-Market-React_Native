import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import SignUp from "../../components/auth/SignUp";
import Header from "../../components/commons/Header";

const Container = styled.SafeAreaView`
  flex: 1;
`;

const SignUpPage = ({ navigation, route }) => {
  const { name, selectedFilterData } = route.params;

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.replace("SchoolSelectPage")}
        title={"회원가입"}
      />
      <ScrollView>
        <SignUp
          navigation={navigation}
          name={name}
          selectedFilterData={selectedFilterData}
        />
      </ScrollView>
    </Container>
  );
};

export default SignUpPage;
