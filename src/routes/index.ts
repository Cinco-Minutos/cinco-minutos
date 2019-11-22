import Home from './home';
import { RouteProps } from 'react-router-dom';
const routes: [string, React.FC, RouteProps?][] = [
  ['/', Home, { exact: true }]
];
export default routes;
