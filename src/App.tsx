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
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@rmwc/icon/icon.css';
import '@rmwc/circular-progress/circular-progress.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import '@material/list/dist/mdc.list.css';
import '@material/typography/dist/mdc.typography.css';

import 'material-design-icons-iconfont/dist/material-design-icons.css';

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
            }
          : {
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
