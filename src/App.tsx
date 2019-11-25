import React from 'react';
import routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDarkMode } from './util/hooks';
import { ThemeProvider } from '@rmwc/theme';
import '@material/theme/dist/mdc.theme.css';
import '@material/button/dist/mdc.button.css';

const App: React.FC = () => {
  const darkMode = useDarkMode()[0];
  return (
    <ThemeProvider
      options={
        darkMode
          ? {
            primary: 'black',
            secondary: 'gray',
            background: 'transparent'
          } : {
              primary: 'skyblue',
              secondary: '#fa3336',
              background: '#212121'
            }
      }
    >
      <Router>
        <Switch>
          {routes.map(route => {
            const [path, Component, props] = route;
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
  );
};
export default App;
