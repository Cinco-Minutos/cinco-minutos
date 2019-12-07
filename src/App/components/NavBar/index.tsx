import React, { useState, useEffect } from 'react';
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
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { MenuItem } from '@rmwc/menu';
import { Tooltip } from '@rmwc/tooltip';
import routes from '../../../routes';
import { Icon } from '@rmwc/icon';
import { Drawer, DrawerContent } from '@rmwc/drawer';

type CustomActionItemProps = TopAppBarActionItemProps & {
  reverse?: boolean;
  iconName: string;
  hoverName: string;
  onClick: () => void;
};
const CustomActionItem: React.FC<CustomActionItemProps> = ({
  iconName,
  hoverName,
  reverse,
  ...props
}) => (
  <Tooltip
    content={<Typography use="body2">{hoverName}</Typography>}
    enterDelay={500}
    activateOn="hover"
  >
    <TopAppBarActionItem icon={iconName} {...props} />
  </Tooltip>
);
const SelfHidingActionItem: React.FC<CustomActionItemProps> = styled(
  CustomActionItem
)`
  color: inherit !important;
  @media (${({ reverse }) =>
      reverse ? 'min-width: 600px' : 'max-width: 599px'}) {
    & {
      display: none;
    }
  }
`;
type CustomNavigationIconProps = TopAppBarNavigationIconProps & {
  reverse?: boolean;
};
const CustomNavigationIcon: React.FC<CustomNavigationIconProps> = ({
  reverse,
  ...props
}) => <TopAppBarNavigationIcon {...props} />;
const SelfHidingNavigationIcon: React.FC<CustomNavigationIconProps> = styled(
  CustomNavigationIcon
)`
  @media (${({ reverse }) =>
      reverse ? 'min-width: 600px' : 'max-width: 599px'}) {
    & {
      display: none;
    }
  }
`;

const NavBar = withRouter(({ history }) => {
  const [activeRoute, setActiveRoute] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    const resizeListener = (): void => {
      if (window.innerWidth > 600) setShowMobileMenu(false);
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);
  return (
    <>
      <Drawer
        open={showMobileMenu}
        modal
        onClose={() => setShowMobileMenu(false)}
        style={{
          maxWidth: '100vw'
        }}
      >
        <DrawerContent>
          {routes.map(route => {
            const path = route[0];
            const name = route[2];
            const iconName = route[3];
            return (
              <MenuItem
                onClick={() => {
                  history.push(path);
                  setShowMobileMenu(false);
                }}
                key={path}
              >
                <Icon icon={iconName} />
                <span
                  style={{
                    paddingLeft: '0.8rem'
                  }}
                >
                  {name}
                </span>
              </MenuItem>
            );
          })}
        </DrawerContent>
      </Drawer>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <SelfHidingNavigationIcon
              icon="menu"
              checked={showMobileMenu}
              onIcon="close"
              reverse
              onChange={() => setShowMobileMenu(!showMobileMenu)}
            />
            <TopAppBarTitle>
              <Typography use="headline4">ℭ𝔦𝔫𝔠𝔬𝔐𝔦𝔫𝔲𝔱𝔬𝔰</Typography>
            </TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            {routes.map((route, i) => {
              const path = route[0];
              const name = route[2];
              const iconName = route[3];
              return (
                <Theme
                  use={
                    activeRoute === i
                      ? 'textPrimaryOnLight'
                      : 'textDisabledOnLight'
                  }
                  key={i}
                >
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
    </>
  );
});
export default NavBar;
