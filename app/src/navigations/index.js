import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Spinner } from "../components";
import { ProgressContext, StudentContext } from "../contexts";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { getItemFromAsync } from "../utils/AsyncStorage";

const Navigation = () => {
  const [userNo, setUserNo] = useState("");
  const { inProgress } = useContext(ProgressContext);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    checkUserNo();
  }, [student]);

  const checkUserNo = async () => {
    const id = await getItemFromAsync("userNo");
    setUserNo(id);
  };

  if (userNo === null) {
    return (
      <NavigationContainer>
        {student?.email ? <MainStack /> : <AuthStack />}
        {inProgress && <Spinner />}
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <MainStack />
        {inProgress && <Spinner />}
      </NavigationContainer>
    );
  }
};

export default Navigation;
