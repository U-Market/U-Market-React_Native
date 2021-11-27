import React, { useState, createContext } from "react";

//context API로 spinner 컴포넌트의 렌더링상태를 전역적으로 관리
const TearmsContext = createContext({
  isAgree: false,
  agreeDispatch: () => {},
});

const TearmsProvider = ({ children }) => {
  const [isAgree, setIsAgree] = useState("");

  const agreeDispatch = {
    agree: () => setIsAgree(true),
    disAgree: () => setIsAgree(false),
  };

  const value = { isAgree, agreeDispatch };

  return (
    <TearmsContext.Provider value={value}>{children}</TearmsContext.Provider>
  );
};

export { TearmsContext, TearmsProvider };
