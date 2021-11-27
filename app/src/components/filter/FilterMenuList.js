import React from "react";
import styled from "styled-components/native";

const FilterMenu = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-self: center;
  border-bottom-width: ${({ isActive }) => (isActive ? "4px" : "0")};
`;

const MenuText = styled.Text`
  font-size: 16px;
  font-family: ${({ isActive }) =>
    isActive ? "ROBOTO_BOLD" : "ROBOTO_REGULAR"};
  margin: 5px;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`;

function FilterMenuList({ filterList, menuName, setMenuName }) {
  return filterList.map((name, key) => {
    return (
      <FilterMenu
        key={key}
        isActive={menuName === name}
        onPress={() => setMenuName(name)}
      >
        <MenuText isActive={menuName === name}>{name}</MenuText>
      </FilterMenu>
    );
  });
}

export default FilterMenuList;
