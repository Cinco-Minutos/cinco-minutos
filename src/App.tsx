import React from 'react';
import routes from './routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
      </Switch>
    </Router>
  );
};
export default App;
