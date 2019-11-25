import React from 'react';
import { HelloWorld } from '../../components';
import { useDarkMode } from '../../util/hooks';
import { Button } from '@rmwc/button';
import { Theme } from '@rmwc/theme';
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <Theme use="textSecondaryOnBackground">
      <HelloWorld />
      <Button raised ripple onClick={() => setDarkMode(!darkMode)} style={{
        display: 'block'
      }}>
        Toggle dark mode (currently {darkMode.toString()})
      </Button>
    </Theme>
  );
};
export default Home;
