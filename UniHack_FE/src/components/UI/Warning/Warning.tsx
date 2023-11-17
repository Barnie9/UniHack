import React from "react";
import { Icon } from "../Icons";
import { Typography } from "../Typography";
import { ColorsX, Svgs } from "environment";

import { Container } from "./Warning.style";

interface Props {
  message: string | React.ReactNode;
  className?: string;
  stickyTop?: boolean;
}

export function Warning({ message, className, stickyTop }: Props) {
  return (
    <Container className={className} stickyTop={stickyTop}>
      <Icon
        svg={Svgs.InformationDark}
        size={(s) => s.l}
        variant={(v) => v.simple}
        marginOffset={{ right: 1.6 }}
      />
      <Typography.Paragraph
        color={ColorsX.text.main}
        marginOffset={{ top: 0.1 }}
        multiline
      >
        {message}
      </Typography.Paragraph>
    </Container>
  );
}
