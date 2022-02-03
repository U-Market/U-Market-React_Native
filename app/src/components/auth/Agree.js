import React, { useContext, useState, useEffect } from "react";
import { CheckBox, Text } from "react-native";
import styled from "styled-components/native";

import { TearmsContext } from "../../contexts";

const Container = styled.View`
  align-items: flex-start;
  width: 100%;
  margin-left: 80px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const IndividualContainer = styled.View`
  background-color: ${({ theme }) => theme.label};
  width: 80%;
  border-radius: 10px;
  margin-top: 5px;
  padding: 10px;
`;
const SingleSelect = styled.TouchableOpacity`
  flex-direction: row;
`;

function Agree(props) {
  const [isAllSelected, setAllSelected] = useState(false);
  const [isFirstBox, setIsFirstBox] = useState(false);
  const [isSecondBox, setIsSecondBox] = useState(false);
  const [isThirdBox, setIsThirdBox] = useState(false);

  const { isAgree, agreeDispatch } = useContext(TearmsContext);

  useEffect(() => {
    if (isFirstBox && isSecondBox) {
      return props.isAgree(true);
    }
    return props.isAgree(false);
  }, [isFirstBox, isSecondBox, isAllSelected]);

  const _checkboxAllSelect = () => {
    if (isAllSelected) {
      return (
        setAllSelected(false),
        setIsFirstBox(false),
        setIsSecondBox(false),
        setIsThirdBox(false)
      );
    }
    {
      return (
        setAllSelected(true),
        setIsFirstBox(true),
        setIsSecondBox(true),
        setIsThirdBox(true)
      );
    }
  };

  return (
    <Container>
      <SingleSelect>
        <CheckBox value={isAllSelected} onValueChange={_checkboxAllSelect} />
        <Text style={{ fontSize: 12, fontWeight: "bold", lineHeight: 26 }}>
          모두 동의합니다
        </Text>
      </SingleSelect>
      <IndividualContainer>
        <SingleSelect>
          <CheckBox value={isFirstBox} onValueChange={setIsFirstBox} />
          <Text style={{ fontSize: 10, lineHeight: 26 }}>이용약관 동의</Text>
        </SingleSelect>
        <SingleSelect>
          <CheckBox value={isSecondBox} onValueChange={setIsSecondBox} />
          <Text style={{ fontSize: 10, lineHeight: 26 }}>
            개인정보 취급방침 동의
          </Text>
        </SingleSelect>
        <SingleSelect>
          <CheckBox value={isThirdBox} onValueChange={setIsThirdBox} />
          <Text style={{ fontSize: 10, lineHeight: 26 }}>
            마케팅 정보 수신 동의
          </Text>
        </SingleSelect>
      </IndividualContainer>
    </Container>
  );
}

export default Agree;
