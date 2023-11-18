import React from "react";

import styled from "styled-components";
import { Icon } from "components/UI/Icons";
import { Dropdown } from "components/UI/Dropdown";
import {
  Container,
  Left,
  Right,
  Options,
  HorizontalSeparator,
} from "./Topbar.style";

import {
  useUser,
  useGridContext,
  // useNavbarFeatures,
  useEffectOnce,
  useNavigation,
} from "hooks";

export function Topbar() {
  const { offset } = useGridContext();
  // const [{ data: features }, setNavbarFeatures] = useNavbarFeatures();
  // const [activeTheme, toggleTheme] = useActiveTheme();
  const { navigate, routes } = useNavigation();

  // useEffectOnce(() => {
  //   setNavbarFeatures({
  //     location: true,
  //     date: false,
  //     device: false,
  //     electric: false,
  //   });
  // });

  const [{ data: user }, getUser] = useUser();

  useEffectOnce(() => {
    if (!user) {
      getUser();
    }
  });

  return (
    <Container offset={offset}>
      {/* {(features.location || features.device || features.electric) && (
        <>
          <Left></Left>
          <HorizontalSeparator />
        </>
      )} */}
      <Right>
        <Options offset={offset}>
          {/* <Dropdown
            margin={{ top: 0.4, right: 1.2 }}
            menuPosition="right"
            toggleComponent={({ ref, onToggle, open }) => (
              <Icon
                ref={ref}
                onClick={() => onToggle()}
                active={open}
                size={4}
                margin={{ left: 1.6, right: 0.8 }}
                type={(t) => t.Settings}
              />
            )}
          >
            <Dropdown.Item data={null} onClick={toggleTheme}>
              {activeTheme === "light"
                ? `${
                    Dictionary.terms.dark
                  } ${Dictionary.terms.mode.toLowerCase()}`
                : `${
                    Dictionary.terms.light
                  } ${Dictionary.terms.mode.toLowerCase()}`}
            </Dropdown.Item>
            {user && parseInt(user?.role_id) === 1 && (
              <Dropdown.Item
                data={null}
                onClick={() => navigate(routes.management)}
              >
                Management
              </Dropdown.Item>
            )}
          </Dropdown> */}
          {/* <Drawer component={<NotificationsCenter />} id={Drawer.Ids.NotificationsCenter}>
						<NotificationsIcon />
					</Drawer> */}
        </Options>
      </Right>
    </Container>
  );
}
