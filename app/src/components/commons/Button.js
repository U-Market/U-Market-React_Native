import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) =>
    isFilled ? theme.mainOrange : mainOrange};
  align-items: center;
  border-radius: 10px;
  width: 90%;
  padding: 14px;
  margin: 5px 0px 5px 0px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
  height: 26px;
  line-height: 26px;
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme, isFilled }) =>
    isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

function Button({ containerStyle, title, onPress, isFilled, disabled }) {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
}

Button.defaultProps = {
  isFilled: true,
};

export default Button;
