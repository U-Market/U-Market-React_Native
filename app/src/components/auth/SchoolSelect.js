import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Text, Alert } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import AppLoading from "expo-app-loading";
import { API_URL } from "@env";

import { ProgressContext } from "../../contexts";
import region from "../../utills/region";
import { Button } from "../index";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  border-top-left-radius: 60px;
`;

const Modal = styled.SafeAreaView`
  margin-top: 5%;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
  border-radius: 40px;
  align-items: center;
`;

const SelectContainer = styled.SafeAreaView`
  width: 80%;
  margin: 10px 16px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 60px;
  color: ${({ theme }) => theme.errorText};
`;

const SchoolSelect = ({ navigation }) => {
  const theme = useContext(ThemeContext);

  const [isReady, setIsReady] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedSchool, setSelectedSchool] = useState({});
  const [schools, setSchools] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState({});
  const [majors, setMajors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { spinner } = useContext(ProgressContext);

  const _handleAuthPage = async () => {
    // const isRegister = await _registerMajorByFetch();
    // if (isRegister) navigation.navigate("AuthPage");
    // else Alert.alert("에러");
    navigation.navigate("AuthPage");
  };

  const _registerMajorByFetch = async () => {
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

    if (response.departmentNum) {
      console.log(`response.departmentNum : ${response.departmentNum}`);
      return true;
    }
  };

  const _setInfoAboutSchoolByFetch = async () => {
    try {
      spinner.start();

      const schoolsByFetch = await fetch(`${API_URL}/api/pick/school`).then(
        (res) => res.json()
      );

      const departmentsByFetch = await fetch(
        `${API_URL}/api/pick/department`
      ).then((res) => res.json());

      setSchools([...schoolsByFetch]);
      setDepartments([...departmentsByFetch]);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    async function setMajorsByOpenAPI() {
      const majorsByOpenAPI = await fetch(
        `https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=20bdb3905002066993ee1c718f00680c&svcType=api&svcCode=MAJOR&contentType=json&gubun=univ_list&subject=${selectedDepartment?.value}&perPage=10000000`
      ).then((res) => res.json());

      const onlyMajorsByOpenAPI = majorsByOpenAPI.dataSearch.content.reduce(
        (acc, info) => {
          const majors = info.facilName.split(",").map((el, i) => {
            return { item: el, value: i };
          });
          return [...acc, ...majors];
        },
        []
      );
      setMajors([...onlyMajorsByOpenAPI]);
    }
    setMajorsByOpenAPI();
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedMajor.value === undefined) {
      setDisabled(true);
    } else return setDisabled(false);
  }, [selectedMajor]);

  return isReady ? (
    <Container>
      <Modal>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20 }}>
          어느 학교에 다니고 있나요?
        </Text>
        <SelectContainer>
          <SelectBox
            label="지역"
            options={region}
            inputPlaceholder="지역 검색"
            value={selectedRegion}
            onChange={(el) => setSelectedRegion(el)}
          />
        </SelectContainer>
        <SelectContainer>
          <SelectBox
            label="학교"
            options={schools}
            inputPlaceholder="학교 검색"
            value={selectedSchool}
            onChange={(el) => setSelectedSchool(el)}
          />
        </SelectContainer>
        <SelectContainer>
          <SelectBox
            label="계열"
            options={departments}
            inputPlaceholder="계열 검색"
            value={selectedDepartment}
            onChange={(el) => setSelectedDepartment(el)}
          />
        </SelectContainer>
        <SelectContainer>
          <SelectBox
            label="전공"
            options={majors}
            inputPlaceholder="전공 검색"
            value={selectedMajor}
            onChange={(el) => setSelectedMajor(el)}
          />
        </SelectContainer>
      </Modal>

      <ErrorText>{errorMessage}</ErrorText>
      <Button title="다음" onPress={_handleAuthPage} disabled={disabled} />
    </Container>
  ) : (
    <AppLoading
      startAsync={_setInfoAboutSchoolByFetch}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
};

export default SchoolSelect;
