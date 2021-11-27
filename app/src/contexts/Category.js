import React, { useState, createContext } from "react";

const CategoryContext = createContext({
  category: { category: null },
  dispatch: () => {},
});

// 카테고리 번호(no)와 이름(name)을 가진 객체(category)를 수정 가능한 dispatch함수를 value로 전달하는 컴포넌트
const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState({});

  const dispatch = ({ no, name }) => {
    setCategory({ no, name });
  };

  const value = { category, dispatch };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
