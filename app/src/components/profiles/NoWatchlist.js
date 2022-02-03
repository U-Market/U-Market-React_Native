import React from "react";
import styled from "styled-components";

const NoBookmarkContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

const NoBookmarkText = styled.Text`
  font-size: 16px;
  margin-top: 20px;
`;

function NoBookMark() {
  return (
    <NoBookmarkContainer>
      <NoBookmarkText>찜한 상품이 없습니다</NoBookmarkText>
    </NoBookmarkContainer>
  );
}

export default NoBookMark;
