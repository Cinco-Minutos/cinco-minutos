import React from 'react';
import { HelloWorld } from '../../components';
import { useDarkMode } from '../../util/hooks';
const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div>
      <HelloWorld />
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle dark mode
      </button>
    </div>
  );
};
export default Home;
