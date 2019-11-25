import React from 'react';
import routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
const App: React.FC = () => {
  return (
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
  );
};
export default App;
