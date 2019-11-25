import React from 'react';
import { useDarkMode } from '../../util/hooks';
const HelloWorld: React.FC = () => {
  const darkMode = useDarkMode()[0];
  return <div style={{color: darkMode ? 'gray' : 'black'}}>Hello world!</div>;
};
export default HelloWorld;
