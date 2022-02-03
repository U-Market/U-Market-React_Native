import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { ThemeProvider } from "styled-components/native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import { theme } from "./theme";
import Navigation from "./navigations";
import {
  ProgressProvider,
  CategoryProvider,
  StudentProvider,
  TearmsProvider,
} from "./contexts";
import t from "./utils/translate/Translator";
import { getItemFromAsync, setItemToAsync } from "./utils/AsyncStorage";

const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

const setInitLanguege = async () => {
  let lang = await getItemFromAsync("lang");
  if (!lang) {
    lang = "ko";
    return await setItemToAsync("lang", lang);
  }
  t.setLanguage(lang);
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const fontAssets = cacheFonts([]);

    await setInitLanguege();
    await Promise.all([...fontAssets]);
    setIsReady(true);
  };

  useEffect(() => {
    _loadAssets();
  }, [isReady]);

  return isReady ? (
    <ThemeProvider theme={theme}>
      <StudentProvider>
        <TearmsProvider>
          <ProgressProvider>
            <CategoryProvider>
              <StatusBar barStyle="dark-content" />
              <Navigation />
            </CategoryProvider>
          </ProgressProvider>
        </TearmsProvider>
      </StudentProvider>
    </ThemeProvider>
  ) : (
    <></>
  );
};

export default App;
