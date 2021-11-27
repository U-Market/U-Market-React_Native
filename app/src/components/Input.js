import React, { useState, forwardRef } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: column;
  width: 80%;
  margin: 10px 0 10px 10px;
`;
const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-left: 3px;
  font-weight: bold;
  color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.text)};
`;
const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme, editable }) =>
    editable ? theme.background : theme.inputDisabledBackground};
  color: ${({ theme }) => theme.text};
  padding: 8px;
  font-size: 12px;
  line-height: 16px;
  border-bottom-width: 1px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.main : theme.label};
  border-radius: 15px;
  margin-top: 3px;
`;

//ref 에 props를 사용하기위해 fowardRef사용
const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      isPassword,
      returnKeyType,
      maxLength,
      disabled,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledTextInput
          ref={ref}
          isFocused={isFocused}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
          textContentType="none" // iOS only
          underlineColorAndroid="transparent" // Android only
        />
      </Container>
    );
  }
);

Input.defaultProps = {
  onBlur: () => {},
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

export default Input;
