import React from "react";
import { useLocation } from "react-router-dom";
import { HoverTooltip } from "components/UI/Tooltip";
import { useEffectOnce, useNavigation } from "hooks";
import { Icon, IconSizes } from "components/UI/Icons";
import { Container, Bottom, LogoContainer } from "./Sidebar.style";
import { Link } from "./Sidebar.style";
import { useUser } from "hooks";
// import logo from "environment/assets/images/logo.png";

export function Sidebar() {
  const location = useLocation();
  const { routes } = useNavigation();
  const [{ data: user }, getUser] = useUser();

  useEffectOnce(() => {
    getUser();
  });
  return (
    <Container>
      {/* <LogoContainer src={logo} /> */}
      <>
        <HoverTooltip
          arrow={false}
          element={
            <Link
              isActive={location.pathname.includes("dashboard")}
              activeClassName="nav-account-link-active"
              to={routes.dashboard.base}
            >
              {/* <Icon
                active={location.pathname.includes("dashboard")}
                // svg={(t) => t.additive}
                size={(t) => t.s}
              /> */}
            </Link>
          }
        >
          Dashboard
        </HoverTooltip>
      </>
      <Bottom>
        <HoverTooltip
          arrow={false}
          element={
            <Link
              // activeClassName="nav-account-link-active"
              to={routes.account.base}
            >
              <img
                style={{ borderRadius: "50%" }}
                height={40}
                width={40}
                src={`https://robohash.org/${user?.email}`}
                alt="avatar"
              />
            </Link>
          }
        >
          Account
        </HoverTooltip>
      </Bottom>
    </Container>
  );
}
