import React from 'react';
import { HelloWorld, SearchBar } from '../../components';
import { useDarkMode } from '../../util/hooks';
import { Button } from '@rmwc/button';
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <>
      <HelloWorld />
      <Button
        raised
        ripple
        onClick={() => setDarkMode(!darkMode)}
        style={{
          display: 'block'
        }}
      >
        Toggle dark mode (currently {darkMode.toString()})
      </Button>
      <SearchBar onTextChange={console.log} />
    </>
  );
};
export default Home;
