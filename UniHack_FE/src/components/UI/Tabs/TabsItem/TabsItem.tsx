import React from "react";
import { StyleOffset } from "types";

import { Container, Text } from "./TabsItem.style";

interface Props {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  onChangeTab: () => void;
  marginOffset?: StyleOffset;
}

export function TabsItem({
  children,
  active,
  className,
  onChangeTab,
  marginOffset,
}: Props) {
  return (
    <Container
      active={active}
      className={className}
      onClick={onChangeTab}
      marginOffset={marginOffset}
    >
      <Text>{children}</Text>
    </Container>
  );
}
