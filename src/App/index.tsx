import React from 'react';
import routes from '../routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDarkMode } from '../util/hooks';

import { ThemeProvider } from '@rmwc/theme';
import { RMWCProvider } from '@rmwc/provider';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const darkMode = useDarkMode()[0];
  return (
    <RMWCProvider
      typography={{
        defaultTag: 'span'
      }}
    >
      <ThemeProvider
        options={
          darkMode
            ? {
                primary: 'black',
                secondary: 'gray',
                background: 'transparent'
              }
            : {
                primary: 'skyblue',
                secondary: '#fa3336',
                background: '#212121'
              }
        }
      >
        <Router>
          <NavBar />
          <Switch>
            {routes.map(route => {
              const path = route[0];
              const Component = route[1];
              const props = route[4];
              return (
                <Route path={path} {...props} key={path}>
                  <Component />
                </Route>
              );
            })}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </RMWCProvider>
  );
};
export default App;
