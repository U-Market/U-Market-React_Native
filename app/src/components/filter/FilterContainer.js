import React, { useState } from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

import FilterMenuList from "./FilterMenuList";
import SelectBoxForFilterMenu from "./SelectBoxForFilterMenu";
import t from "../../utills/translate/Translator";

const SchootlSelectContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SchoolSelectTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
const FilterChangingBtn = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
`;

const Filter = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0 20px 0 20px;
  border-bottom-width: 1px;
`;

const FilterTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  font-family: ROBOTO_BOLD;
`;

const SelectContainer = styled.View`
  padding: 4px 20px 16px 20px;
`;

const FilterContainer = ({
  selectedFilterData,
  isSchoolSelect,
  isSignUpPage,
}) => {
  const [filterTitle, setFilterTitle] = useState(t.print("AllUniversity"));
  const [menuName, setMenuName] = useState(t.print("region"));
  const [isSelectedFilter, setIsSeletedFilter] = useState(false);

  const FILTER = [
    t.print("region"),
    t.print("university"),
    t.print("undergraduate"),
    t.print("major"),
  ];

  return (
    <>
      {isSchoolSelect ? (
        <>
          <SchootlSelectContainer>
            <SchoolSelectTitle>{t.print("whichSchool")}</SchoolSelectTitle>
          </SchootlSelectContainer>
          <Filter>
            <FilterMenuList
              filterList={FILTER}
              menuName={menuName}
              setMenuName={setMenuName}
            />
          </Filter>
          <SelectContainer>
            <SelectBoxForFilterMenu
              menuName={menuName}
              setMenuName={setMenuName}
              selectedFilterData={selectedFilterData}
              setFilterTitle={setFilterTitle}
              isSignUpPage={isSignUpPage}
            />
          </SelectContainer>
        </>
      ) : (
        <>
          <FilterChangingBtn
            onPress={() => setIsSeletedFilter(!isSelectedFilter)}
          >
            <FilterTitle>{filterTitle}</FilterTitle>
            <Image source={require("../../icons/filter.png")} />
          </FilterChangingBtn>
          {isSelectedFilter ? (
            <>
              <Filter>
                <FilterMenuList
                  filterList={FILTER}
                  menuName={menuName}
                  setMenuName={setMenuName}
                />
              </Filter>
              <SelectContainer>
                <SelectBoxForFilterMenu
                  menuName={menuName}
                  setMenuName={setMenuName}
                  selectedFilterData={selectedFilterData}
                  setFilterTitle={setFilterTitle}
                  isSignUpPage={false}
                />
              </SelectContainer>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default FilterContainer;
