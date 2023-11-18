import React from "react";
import { useLocation } from "react-router-dom";
import { HoverTooltip } from "components/UI/Tooltip";
import { useEffectOnce, useNavigation } from "hooks";
import { Icon, IconSizes } from "components/UI/Icons";
import { Container, Bottom, LogoContainer } from "./Sidebar.style";
import { Link } from "./Sidebar.style";
import { useUser } from "hooks";
import { Svgs } from "environment";
// import logo from "environment/assets/images/logo.png";

export function Sidebar() {
  const location = useLocation();
  const { routes } = useNavigation();
  // const [{ data: user }, getUser] = useUser();

  // useEffectOnce(() => {
  //   getUser();
  // });
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
              <Icon
                active={location.pathname.includes("dashboard")}
                svg={Svgs.File}
                size={(t) => t.xl}
                marginOffset={{ top: 2 }}
              />
            </Link>
          }
        >
          Dashboard
        </HoverTooltip>
        <HoverTooltip
          arrow={false}
          element={
            <Link
              isActive={location.pathname.includes("dicom")}
              activeClassName="nav-account-link-active"
              to={routes.dicom}
            >
              <Icon
                active={location.pathname.includes("dicom")}
                svg={Svgs.Dicom}
                size={(t) => t.xl}
                marginOffset={{ top: 2 }}
              />
            </Link>
          }
        >
          DICOM
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
                // src={`https://robohash.org/${user?.email}`}
                src={`https://robohash.org/ionica.puiu00@e-uvt.ro`}
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
