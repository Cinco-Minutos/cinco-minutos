import React, { useState } from 'react';
import { SearchBar } from '../../components';
import { MenuItem } from '@rmwc/menu';
import { Typography } from '@rmwc/typography';
import debounce from 'lodash-es/debounce';
const Home: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const onTextInput = debounce(
    () => {
      console.log('hiya');
      setLoading(false);
    },
    1000,
    {
      leading: false,
      trailing: true
    }
  );
  return (
    <>
      <Typography use="body1">
        <SearchBar
          onTextChange={console.log}
          onTextInput={() => {
            if (!isLoading) setLoading(true);
            onTextInput();
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
