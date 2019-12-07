import React, { useState } from 'react';
import { SearchBar } from '../../components';
import { Typography } from '@rmwc/typography';
import debounce from 'lodash-es/debounce';
import getData from '../../util/data';
import filter from './util/filter';
const onTextInput = debounce(
  async (
    input: string,
    setResults: React.Dispatch<React.SetStateAction<React.ReactNode[]>>
  ): Promise<void> => {
    const quickSearch = await getData('quickSearch');
    setResults(filter(input, quickSearch));
  },
  500,
  {
    leading: false,
    trailing: true
  }
);
const Home: React.FC = () => {
  const [results, setResults] = useState<[string, string][]>([]);

  return (
    <>
      <Typography use="body1">
        <SearchBar
          onTextChange={console.log}
          onTextInput={str => {
            if (results) setResults([]);
            onTextInput(str, setResults);
          }}
          results={results}
        />
      </Typography>
    </>
  );
};
export default Home;
