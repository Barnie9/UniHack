import React, { useState, useEffect } from "react";
import { animated, useTransition } from "react-spring";

import { Backdrop } from "../Backdrop";
import { Spacer } from "../Spacer";
import { Typography } from "../Typography";
import { Icon } from "../Icons";
import { Svgs } from "environment";
import { useKeyPress } from "hooks";

import {
  BarIcon,
  DrawerContainer,
  TopBar,
  ChildrenContainer,
  LeftTopSection,
} from "./Drawer.style";

interface Props {
  open: boolean;
  children: React.ReactNode;
  title?: string;
  showBackButton: boolean;
  onClose: () => void;
  onGoBack: () => void;
}

export function Drawer({
  open,
  children,
  title,
  showBackButton,
  onClose,
  onGoBack,
}: Props) {
  const [willOpen, setWillOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setWillOpen(true);
    }
  }, [open]);

  const transitions = useTransition(willOpen, {
    from: { right: "-100vw" },
    enter: { right: "0rem" },
    leave: { right: "-100vw" },
    onDestroyed: (isDestroyed) => {
      if (isDestroyed) {
        onClose();
      }
    },
    config: { duration: 300 },
  });

  function onTransitionCloseMenu() {
    setWillOpen(false);
  }

  useKeyPress(
    { onEscapeKeyPress: onTransitionCloseMenu },
    { listen: open, noModalsOpened: true }
  );

  if (!open) return null;

  return (
    <Backdrop onClick={onTransitionCloseMenu}>
      {transitions((props, item) => (
        <animated.div style={props}>
          {item && (
            <DrawerContainer style={props}>
              <Spacer size={(s) => s.s} />
              <TopBar>
                <LeftTopSection>
                  <BarIcon visible={showBackButton} onClick={onGoBack}>
                    <Icon
                      svg={Svgs.ArrowLeft}
                      size={(s) => s.m}
                      onClick={onGoBack}
                    />
                  </BarIcon>
                  <Typography.H6>{title}</Typography.H6>
                </LeftTopSection>
                <Icon
                  svg={Svgs.Close}
                  size={(s) => s.m}
                  onClick={onTransitionCloseMenu}
                />
              </TopBar>
              <Spacer size={(s) => s.s} />
              <Spacer size={(s) => s.xl} />
              <ChildrenContainer>{children}</ChildrenContainer>
            </DrawerContainer>
          )}
        </animated.div>
      ))}
    </Backdrop>
  );
}
