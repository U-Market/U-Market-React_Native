import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
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

const ActivityIndicatorContainer = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background2};
`;

const Today = ({ navigation }) => {
  const [hotProducts, setHotProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    _setTodayByFetch();
  }, [isReady]);

  async function _setTodayByFetch() {
    try {
      const response = await fetch(`${API_URL}/api/home/today`).then((res) =>
        res.json()
      );

      setHotProducts([...response.hotProducts]);
      setNewProducts([...response.newProducts]);
    } catch (e) {
    } finally {
      setIsReady(true);
    }
  }

  return isReady ? (
    <Container>
      <Event navigation={navigation} />
      <Hot10 navigation={navigation} hotProducts={hotProducts} />
      <Recent navigation={navigation} newProducts={newProducts} />
    </Container>
  ) : (
    <ActivityIndicatorContainer color="#999999" />
  );
};

export default Today;
