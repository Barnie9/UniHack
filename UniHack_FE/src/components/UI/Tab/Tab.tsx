import React from "react";
import { Container, Label } from "./Tab.style";

interface Props {
  label: string;
  link: string;
  active?: boolean;
  vertical?: boolean;
}

export function Tab({ active, vertical, link, label }: Props) {
  return (
    <Container active={active} vertical={vertical}>
      <Label to={link}>{label}</Label>
    </Container>
  );
}
