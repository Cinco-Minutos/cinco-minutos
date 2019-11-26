import React from 'react';
import { TextField, TextFieldProps } from '@rmwc/textfield';
export type StringCallback = (val: string) => void;
const InputField: React.FC<{
  onTextChange: StringCallback;
  onTextInput?: StringCallback;
  onEnter?: () => void;
  style: React.CSSProperties;
} & TextFieldProps> = ({
  onTextChange: onChange,
  onTextInput: onInput,
  onEnter,
  style,
  ...props
}) => (
  <TextField
    onInput={({ target }) => {
      const newVal = (target as HTMLInputElement).value;
      if (onInput) onInput(newVal);
    }}
    onKeyPress={({ charCode, target }) => {
      if (charCode === 13) {
        (target as HTMLInputElement).blur();
        if (onEnter) onEnter();
      }
    }}
    onBlur={({ target }) => {
      if (onChange) onChange((target as HTMLInputElement).value);
    }}
    style={style}
    {...props}
  />
);
export default InputField;
