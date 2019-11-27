import Home from './home';
import { RouteProps } from 'react-router-dom';
const routes: [string, React.FC, string, string, RouteProps?][] = [
  ['/', Home, 'Home', 'home', { exact: true }],
  ['/wtf', Home, 'Gnome', 'g_translate']
];
export default routes;
