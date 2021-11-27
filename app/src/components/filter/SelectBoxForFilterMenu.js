import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import Http from "../../utills/Http";
import SelectBox from "../utils/SelectBox";
import regions from "../../utills/region";
import { API_URL } from "@env";
import t from "../../utills/translate/Translator";

const SelectBoxForFilterMenu = ({
  menuName,
  setMenuName,
  selectedFilterData,
  setFilterTitle,
  isSignUpPage,
}) => {
  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [majors, setMajors] = useState([]);

  const setSchoolsByHttp = async () => {
    if (!selectedFilterData.selectedRegion?.item) {
      Alert.alert(t.print("FirstRegion"));
      setMenuName(t.print("region"));
      return;
    }

    const { response, status } = await Http.get(
      `/pick/regions/${selectedFilterData.selectedRegion.value}/schools`
    );
    if (status === 200) {
      setSchools([...response]);
    } else {
      setSchools([]);
    }
  };

  const setDepartmentsByHttp = async () => {
    // DB 정보를 메뉴가 바뀔 때마다 불러오는 것을 방지하기 위한 조건문
    if (!departments.length) {
      const { response, status } = await Http.get("/pick/departments");
      if (status === 200) {
        setDepartments([...response]);
      } else {
        setDepartments([]);
      }
    }
  };

  const setMajorsByHttp = async () => {
    if (!selectedFilterData.selectedDepartment?.item) {
      Alert.alert(t.print("FirstUndergraduate"));
      setMenuName(t.print("undergraduate"));
      return;
    }

    const url = isSignUpPage
      ? `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=20bdb3905002066993ee1c718f00680c&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&subject=${selectedFilterData.selectedDepartment.value}&perPage=10000000`
      : `${API_URL}/api/pick/departments/${selectedFilterData.selectedDepartment.value}/majors`;

    const response = await fetch(url).then((res) => res.json());

    if (isSignUpPage) {
      // OpenAPI를 사용하여 불러온 전공 데이터 세팅
      const majorsByOpenAPI = response.dataSearch.content.reduce(
        (acc, info) => {
          const majors = info.facilName.split(",").map((el, i) => {
            return { item: el, value: i };
          });
          return [...acc, ...majors];
        },
        []
      );
      setMajors([...majorsByOpenAPI]);
    } else {
      // U-Market DB에서 불러온 전공 데이터 세팅
      if (response.length) {
        setMajors([...response]);
      } else {
        setMajors([]);
      }
    }
  };

  useEffect(() => {
    switch (menuName) {
      case t.print("university"):
        setSchoolsByHttp();
        break;
      case t.print("undergraduate"):
        setDepartmentsByHttp();
        break;
      case t.print("major"):
        setMajorsByHttp();
        break;
      default:
        break;
    }
  }, [menuName]);

  switch (menuName) {
    case t.print("region"):
      return (
        <SelectBox
          data={regions}
          menuName={menuName}
          selectedMenu={selectedFilterData.selectedRegion}
          onChange={(el) => selectedFilterData.setSelectedRegion(el)}
        />
      );
    case t.print("university"):
      return (
        <SelectBox
          data={schools}
          menuName={menuName}
          selectedMenu={selectedFilterData.selectedSchool}
          onChange={(el) => {
            setFilterTitle(el.item);
            selectedFilterData.setSelectedSchool(el);
          }}
        />
      );
    case t.print("undergraduate"):
      return (
        <SelectBox
          data={departments}
          menuName={menuName}
          selectedMenu={selectedFilterData.selectedDepartment}
          onChange={(el) => selectedFilterData.setSelectedDepatments(el)}
        />
      );
    case t.print("major"):
      return (
        <SelectBox
          data={majors}
          menuName={menuName}
          selectedMenu={selectedFilterData.selectedMajor}
          onChange={(el) => selectedFilterData.setSelectedMajor(el)}
        />
      );
  }
};

export default SelectBoxForFilterMenu;
