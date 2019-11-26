import React, { useRef, useState } from 'react';
import InputField, { StringCallback } from '../InputField';
import { TextFieldProps } from '@rmwc/textfield';
import { Icon, IconProps } from '@rmwc/icon';
import { CircularProgress } from '@rmwc/circular-progress';
import { MenuSurfaceAnchor, MenuSurface } from '@rmwc/menu';

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
  loadingResults?: boolean;
  results?: React.ReactNode[];
} & TextFieldProps> = ({
  closeable = true,
  onTextChange,
  onTextInput,
  loadingResults = false,
  results,
  ...props
}) => {
  const inputRef = useRef();
  const [showResults, setShowResults] = useState(false);
  return (
    <>
      <InputField
        outlined
        icon="search"
        trailingIcon={
          closeable ? (
            <CloseIcon
              onClick={() => {
                (inputRef.current as HTMLInputElement).value = '';
                setShowResults(false);
              }}
            />
          ) : null
        }
        onTextChange={v => {
          onTextChange(v);
          setShowResults(false);
        }}
        onTextInput={v => {
          if (onTextInput) onTextInput(v);
          if (v.length) setShowResults(true);
          else setShowResults(false);
        }}
        inputRef={inputRef}
        style={{
          width: '100%'
        }}
        {...props}
      />
      {showResults ? (
        <MenuSurfaceAnchor
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {loadingResults ? (
            <>
              <CircularProgress />
              Loading...
            </>
          ) : (
            <MenuSurface
              anchorCorner="bottomStart"
              open={true}
              style={{ width: '100%', maxWidth: 'unset' }}
            >
              {results}
            </MenuSurface>
          )}
        </MenuSurfaceAnchor>
      ) : null}
    </>
  );
};
export default SearchBar;
