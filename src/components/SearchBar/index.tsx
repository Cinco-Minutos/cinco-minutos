import React, { useState } from 'react';
import InputField, { StringCallback } from '../InputField';
import { TextFieldProps } from '@rmwc/textfield';
import { Icon, IconProps } from '@rmwc/icon';
import { CircularProgress } from '@rmwc/circular-progress';
import { MenuSurfaceAnchor, MenuSurface, MenuItem } from '@rmwc/menu';

const CloseIcon: React.FC<{
  onClick: () => void;
} & IconProps> = ({ onClick, ...props }) => (
  <Icon
    icon="close"
    tabIndex={0}
    onClick={e => {
      (e.target as HTMLElement).blur();
      onClick();
    }}
    style={{
      outline: 'none'
    }}
    {...props}
  />
);
const SearchBar: React.FC<{
  closeable?: boolean;
  onTextChange: StringCallback;
  onTextInput?: StringCallback;
  results?: [string, string][];
} & TextFieldProps> = ({
  closeable = true,
  onTextChange,
  onTextInput,
  results,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  return (
    <>
      <InputField
        outlined
        icon="search"
        value={value}
        trailingIcon={
          closeable ? (
            <CloseIcon
              onClick={() => {
                setValue('');
                setShowResults(false);
              }}
            />
          ) : null
        }
        onTextChange={onTextChange}
        onTextInput={v => {
          if (onTextInput) onTextInput(v);
          setValue(v);
          setShowResults(!!v.length);
        }}
        onEnter={() => {
          setShowResults(false);
        }}
        style={{
          width: '100%'
        }}
        {...props}
      />
      {results && showResults ? (
        <MenuSurfaceAnchor
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {results.length ? (
            <MenuSurface
              anchorCorner="bottomStart"
              open={true}
              onClose={() => {
                console.log(':(');
                setShowResults(false);
              }}
              style={{ width: '100%', maxWidth: 'unset' }}
            >
              {results.map(v => (
                <MenuItem
                  key={v[0]}
                  onClick={() => {
                    setValue(v[0]);
                    setShowResults(false);
                    onTextChange(v[0]);
                  }}
                  tabIndex={0}
                  ripple
                >
                  {v[0]}: {v[1]}
                </MenuItem>
              ))}
            </MenuSurface>
          ) : (
            <>
              <CircularProgress />
              Loading...
            </>
          )}
        </MenuSurfaceAnchor>
      ) : null}
    </>
  );
};
export default SearchBar;
