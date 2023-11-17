import React from "react";
import styled, { css } from "styled-components/macro";

import { ColorsX } from "environment";

interface Props {
  paddingLeft?: boolean;
  paddingRight?: boolean;
}

export function Asterisk({ paddingLeft, paddingRight }: Props) {
  return (
    <RedAsterisk paddingLeft={paddingLeft} paddingRight={paddingRight}>
      *
    </RedAsterisk>
  );
}

const RedAsterisk = styled.span<Props>`
  color: ${ColorsX.text.error};

  ${({ paddingLeft }) =>
    paddingLeft &&
    css`
      padding-left: 0.4rem;
    `}
  ${({ paddingRight }) =>
    paddingRight &&
    css`
      padding-right: 0.4rem;
    `}
`;
