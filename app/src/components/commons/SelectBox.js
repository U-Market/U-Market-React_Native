import React from "react";
import SelectBox from "react-native-multi-selectbox";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SelectBoxComponent = ({ data, menuName, selectedMenu, onChange }) => {
  return (
    <SelectBox
      label=""
      options={data}
      inputPlaceholder={`${menuName} 검색`}
      listEmptyText="검색 결과가 존재하지 않습니다."
      value={selectedMenu}
      onChange={onChange}
      arrowIconColor="red"
      searchIconColor="#FFAE52"
      selectIcon={<Feather name="chevron-down" size={24} color="#FFAE52" />}
      containerStyle={styles.selectBox}
      inputFilterContainerStyle={styles.inputFilterContainer}
      inputFilterStyle={styles.inputFilterStyle}
      optionContainerStyle={styles.optionContainerStyle}
      optionsLabelStyle={styles.optionsLabelStyle}
      selectedItemStyle={styles.selectedItemStyle}
    />
  );
};

export default SelectBoxComponent;

const styles = StyleSheet.create({
  selectBox: {
    alignItems: "center",
    paddingLeft: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  inputFilterContainer: {
    paddingLeft: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomWidth: 2.5,
    borderBottomColor: "#FFAE52",
    backgroundColor: "#EFEFEFA1",
  },
  inputFilterStyle: {
    fontSize: 12,
  },
  optionContainerStyle: {
    alignSelf: "center",
    borderBottomColor: "#EFEFEFA1",
  },
  optionsLabelStyle: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666666",
  },
  selectedItemStyle: {
    fontSize: 14,
    color: "#404040",
  },
});
