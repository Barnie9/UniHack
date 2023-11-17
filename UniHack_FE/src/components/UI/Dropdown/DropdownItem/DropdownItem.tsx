import React, { useRef } from "react";

import { useEffectOnce } from "hooks";

import { Container, Text } from "./DropdownItem.style";

interface Props {
  children?: React.ReactNode;
  title?: string;
  button?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  close?: () => void;
  onClick?: () => void;
  dataTestId?: string;
}

export function DropdownItem({
  children,
  title,
  button,
  disabled = false,
  active = false,
  className,
  close,
  onClick,
  dataTestId,
}: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffectOnce(() => {
    if (!active) return;

    if (innerRef.current)
      innerRef.current.scrollIntoView({
        block: "nearest",
        inline: "start",
      });
  });

  function onClickItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    if (onClick) onClick();
    if (close) close();
  }

  function computeItem() {
    if (!children) return <Text active={active}>{title}</Text>;

    const childrenIsText =
      typeof children === "string" || typeof children === "number";

    if (childrenIsText)
      return (
        <Text active={active} ellipsis>
          {children}
        </Text>
      );

    return children;
  }

  return (
    <Container
      ref={innerRef}
      data-test-id={dataTestId}
      className={className}
      button={button}
      disabled={disabled}
      onClick={onClickItem}
    >
      {computeItem()}
    </Container>
  );
}
