import React from "react";
import styled, { css } from "styled-components/macro";

import { Icon } from "./Icons";
import { Typography } from "./Typography";
import { ColorsX, Svgs } from "environment";
import { generateSpacingOffsets } from "helpers";
import { SpacingOffsets } from "types";

interface Props extends SpacingOffsets {
  message: string | React.ReactNode;
}

export function InfoMessage({
  message,
  //
  marginOffset,
  paddingOffset,
}: Props) {
  return (
    <Container marginOffset={marginOffset} paddingOffset={paddingOffset}>
      <Icon
        svg={Svgs.Information}
        size={(s) => s.m}
        colors={{ color: ColorsX.text.caption }}
        marginOffset={{ top: 0.2, right: 0.8 }}
      />

      <Typography.Caption multiline>{message}</Typography.Caption>
    </Container>
  );
}

const Container = styled.div<SpacingOffsets>`
  ${({ marginOffset, paddingOffset }) => css`
    display: flex;
    align-items: flex-start;

    /* SPACING OFFSETS */
    ${generateSpacingOffsets({ paddingOffset, marginOffset })}
  `}
`;
