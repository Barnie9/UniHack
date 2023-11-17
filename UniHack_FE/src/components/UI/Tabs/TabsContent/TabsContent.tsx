import React from "react";
import { Container } from "./TabsContent.style";

interface Props {
  children: React.ReactNode;
  active?: boolean;
}

export function TabsContent({ children, active = false }: Props) {
  if (active) {
    return <Container>{children}</Container>;
  }

  return null;
}
