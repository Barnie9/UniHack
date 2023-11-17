import React, { useRef, useState } from "react";

import { Dropdown } from "components/UI/Dropdown";
import { Icon } from "../Icons";
import { Svgs } from "environment";
import { showOnTouchDevices } from "helpers";
import { useOutsideClick } from "hooks";
import { SetState } from "types";

import {
  BodyWrapper,
  Container,
  Description,
  FooterWrapper,
  HeaderWrapper,
  MoreIconContainer,
  Title,
  TitleWrapper,
} from "./Card.style";

interface MenuItem {
  label: string;
  action: () => void;
}

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export function Card({ onClick, children }: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const elementValueRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsMenuVisible(false), [elementValueRef]);

  const enhancedChildren = React.Children.toArray(children)
    .filter((child) => child)
    .map((child, _) =>
      React.cloneElement(child as JSX.Element, {
        menuState: { visible: isMenuVisible, setVisible: setIsMenuVisible },
      })
    );

  return (
    <Container
      ref={elementValueRef}
      menuVisible={isMenuVisible}
      onClick={onClick}
    >
      {enhancedChildren}
    </Container>
  );
}

interface HeaderProps<T> {
  title: string;
  data: T;
  menuState?: {
    visible: boolean;
    setVisible: SetState<boolean>;
  };
  menuItems: MenuItem[];
  renderTitleIcon?: (visible: boolean) => React.ReactNode;
  renderTitleHint?: (data: T) => React.ReactNode;
}

function Header<T>({
  title,
  data,
  menuState,
  menuItems,
  renderTitleIcon,
  renderTitleHint,
}: HeaderProps<T>) {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        {/* Card Icon */}
        {renderTitleIcon?.(!!menuState?.visible)}

        {/* Card Hint */}
        {renderTitleHint?.(data)}

        {/* Card Title */}
        <Title>{title}</Title>
      </TitleWrapper>

      {/* Card Menu */}
      <MoreIconContainer
        visible={!!menuState?.visible}
        className={showOnTouchDevices("card-more-icon")}
      >
        <Dropdown
          toggleComponent={({ ref, toggle }) => (
            <Icon
              ref={ref}
              variant={(v) => v.button}
              svg={Svgs.More}
              onClick={() => {
                menuState?.setVisible((state) => !state);
                toggle();
              }}
              active={!!menuState?.visible}
            />
          )}
          width={18}
          offset={{ top: 20, right: 20 }}
        >
          {menuItems.map(({ label, action }) => (
            <Dropdown.Item key={label} onClick={action}>
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </MoreIconContainer>
    </HeaderWrapper>
  );
}

type ChildrenProps = {
  children: React.ReactNode;
};

function Body({ children }: ChildrenProps) {
  return (
    <BodyWrapper>
      <Description>{children}</Description>
    </BodyWrapper>
  );
}

function Footer({ children }: ChildrenProps) {
  return <FooterWrapper>{children}</FooterWrapper>;
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
