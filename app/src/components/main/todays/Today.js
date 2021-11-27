import React, { useState } from "react";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";

import Event from "./Event";
import Hot10 from "./Hot10/Hot10";
import Recent from "./recents/Recent";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Today = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [hotProducts, setHotProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  async function _setTodayByFetch() {
    const response = await fetch(`${API_URL}/api/home/today`).then((res) =>
      res.json()
    );

    setHotProducts([...response.hotProducts]);
    setNewProducts([...response.newProducts]);
    console.log(response.newProducts);
  }

  return isReady ? (
    <Container>
      <Event navigation={navigation} />
      <Hot10 navigation={navigation} hotProducts={hotProducts} />
      <Recent navigation={navigation} newProducts={newProducts} />
    </Container>
  ) : (
    <AppLoading
      startAsync={_setTodayByFetch}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default Today;
