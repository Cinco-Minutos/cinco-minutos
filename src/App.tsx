import React, { useState } from 'react';
import routes from './routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import { useDarkMode } from './util/hooks';

import { ThemeProvider, Theme } from '@rmwc/theme';
import {
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarActionItem,
  TopAppBarNavigationIcon,
  TopAppBarActionItemProps,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIconProps
} from '@rmwc/top-app-bar';
import styled from 'styled-components';
import { Tooltip } from '@rmwc/tooltip'
import { RMWCProvider } from '@rmwc/provider';
import './index.css';
import { Typography } from '@rmwc/typography';

type ActionItemProps = TopAppBarActionItemProps & {
  reverse?: boolean;
  iconName: string;
  hoverName: string;
  onClick: () => void;
}
const CustomActionItem: React.FC<ActionItemProps> = ({
  iconName,
  hoverName,
  reverse,
  ...props
}) => (
  <Tooltip content={<Typography use="body2">{hoverName}</Typography>} enterDelay={500} activateOn='hover'>
    <TopAppBarActionItem
      icon={iconName}
      {...props}
    />
  </Tooltip>
);
const SelfHidingActionItem: React.FC<ActionItemProps> = styled(CustomActionItem)`
  color: inherit !important;
  @media (${({ reverse }) =>
      reverse ? 'min-width: 600px' : 'max-width: 599px'}) {
    & {
      display: none;
    }
  }
`;
type NavigationIconProps = TopAppBarNavigationIconProps & {
  reverse?: boolean
};
const CustomNavigationIcon: React.FC<NavigationIconProps> = ({ reverse, ...props }) => <TopAppBarNavigationIcon {...props} />
const SelfHidingNavigationIcon: React.FC<NavigationIconProps> = styled(CustomNavigationIcon)`
  @media (${({ reverse }) => reverse ? 'min-width: 600px' : 'max-width: 599px'}) {
    & {
      display: none;
    }
  }
`;

const NavBar = withRouter(({ history }) => {
  const [activeRoute, setActiveRoute] = useState(0);
  return (
    <>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <SelfHidingNavigationIcon icon="menu" reverse />
            <TopAppBarTitle><Typography use="headline4">ℭ𝔦𝔫𝔠𝔬𝔐𝔦𝔫𝔲𝔱𝔬𝔰</Typography></TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            {routes.map((route, i) => {
              const path = route[0];
              const name = route[2];
              const iconName = route[3];
              return (
                <Theme use={activeRoute === i ? 'textPrimaryOnLight' : 'textDisabledOnLight'} key={i}>
                  <SelfHidingActionItem
                    iconName={iconName}
                    hoverName={name}
                    ripple={false}
                    onClick={() => {
                      setActiveRoute(i);
                      history.push(path);
                    }}
                  />
                </Theme>
              );
            })}
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>);
});

const App: React.FC = () => {
  const darkMode = useDarkMode()[0];
  return (
    <RMWCProvider typography={{
      defaultTag: 'span'
    }}>
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
