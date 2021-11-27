import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";

import { ReadyContext } from "../../contexts";
import FilterContainer from "../../components/filter/FilterContainer";
import Header from "../../components/commons/Header";
import { Button } from "../../components/index";
import { API_URL } from "@env";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const BtnContainer = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
`;

const SchoolSelectPage = ({ navigation }) => {
  const [disabled, setDisabled] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedSchool, setSelectedSchool] = useState({});
  const [selectedDepartment, setSelectedDepatments] = useState({});
  const [selectedMajor, setSelectedMajor] = useState({});

  const selectedFilterData = {
    selectedRegion,
    setSelectedRegion,
    selectedSchool,
    setSelectedSchool,
    selectedDepartment,
    setSelectedDepatments,
    selectedMajor,
    setSelectedMajor,
  };

  // useEffect(() => {
  //   if (selectedMajor.value !== undefined) {
  //     return setDisabled(false);
  //   }
  //   return setDisabled(true);
  // }, [selectedMajor]);

  const _saveMajorToDbByFetch = async () => {
    const request = {
      department: selectedDepartment.item,
      major: selectedMajor.item,
    };

    const response = await fetch(`${API_URL}/api/pick/major`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(request),
    }).then((res) => res.json());

    return response?.majorNum;
  };

  const _moveAuthPage = async () => {
    // 정보 미입력 셀렉트 받아오기
    const isNotSelects = [
      selectedRegion,
      selectedSchool,
      selectedDepartment,
      selectedMajor,
    ].filter((el) => !Boolean(el?.item));

    // 정보 미입력 셀렉트가 존재하면 경고창 출력
    if (isNotSelects.length) return Alert.alert("모든 정보를 입력해주세요.");

    // 전공을 DB에 저장
    const majorNum = await _saveMajorToDbByFetch();
    if (majorNum) {
      //user 정보로 전달하기 위해 setSelectedMajor() 수행
      selectedFilterData.selectedMajor.value = majorNum;

      // 모든 정보를 입력해야만 인증 페이지로 이동
      navigation.navigate("AuthPage", { selectedFilterData });
    }
  };

  return (
    <Container>
      <Header
        moveViewByNavigation={() => navigation.goBack()}
        title={"학교인증"}
      />

      <FilterContainer
        selectedFilterData={selectedFilterData}
        isSchoolSelect={true}
        isSignUpPage={true}
      />
      <BtnContainer>
        <Button title="다음" onPress={_moveAuthPage} disabled={disabled} />
      </BtnContainer>
    </Container>
  );
};

export default SchoolSelectPage;
