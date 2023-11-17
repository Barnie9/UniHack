import React from "react";
import { Icon } from "components/UI/Icons";
import { Svgs } from "environment";

import {
  Container,
  Content,
  Header,
  IconWrapper,
  Title,
} from "./CollapsibleCard.style";
import { SpacingOffsets } from "types";

interface Props {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  disabled?: boolean;
  actionComponent?: React.ReactNode;
  extraActionComponent?: React.ReactNode;
  onToggle: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function CollapsibleCard({
  children,
  title,
  open,
  disabled,
  actionComponent,
  extraActionComponent,
  marginOffset,
  paddingOffset,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: Props & SpacingOffsets) {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!disabled) {
      onToggle();
    }
  };

  return (
    <Container
      onClick={(e) => e.stopPropagation()}
      marginOffset={marginOffset}
      paddingOffset={paddingOffset}
    >
      <Header
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Icon
          svg={Svgs.ChevronDown}
          disabled={disabled}
          rotate={open ? 180 : 0}
          marginOffset={{ right: 0.8 }}
          onClick={onClick}
        />
        <Title title={title}>{title}</Title>
        {extraActionComponent && (
          <IconWrapper>{extraActionComponent}</IconWrapper>
        )}
        {actionComponent && <IconWrapper>{actionComponent}</IconWrapper>}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
}
