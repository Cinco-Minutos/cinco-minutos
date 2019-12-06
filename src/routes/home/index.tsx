import React, { useState } from 'react';
import { SearchBar } from '../../components';
import { MenuItem } from '@rmwc/menu';
import { Typography } from '@rmwc/typography';
import debounce from 'lodash-es/debounce';
const onTextInput = debounce(
  (setLoading: (v: boolean) => void) => {
    console.log('hiya');
    setLoading(false);
  },
  1000,
  {
    leading: false,
    trailing: true
  }
);
const Home: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <Typography use="body1">
        <SearchBar
          onTextChange={console.log}
          onTextInput={() => {
            if (!isLoading) setLoading(true);
            onTextInput(setLoading);
          }}
          loadingResults={isLoading}
          results={[
            <MenuItem key="hi">Hi</MenuItem>,
            <MenuItem key="there">There</MenuItem>
          ]}
        />
      </Typography>
    </>
  );
};
export default Home;
