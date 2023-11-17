import React from "react";
import styled, { css } from "styled-components/macro";

import {
  generateSpacingOffsets,
  getMarginOffset,
  getPaddingOffset,
} from "helpers";
import { SpacingOffsets, StyleOffsets } from "types";

interface GeneralProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface GapProps {
  marginGap?: StyleOffsets;
  paddingGap?: StyleOffsets;
  notLastChild?: boolean;
}

type Props = GeneralProps & GapProps & SpacingOffsets;

export function Gap(props: Props) {
  return <Component {...props} />;
}

const Component = styled.div<Props>`
  ${({
    /* GAP */
    marginGap,
    paddingGap,
    notLastChild,
    /* SPACING OFFSETS */
    marginOffset,
    paddingOffset,
  }) => css`
    ${notLastChild &&
    css`
      > :nth-child(n):not(:last-child) {
        /* MARGIN OFFSET */
        ${getMarginOffset(marginGap)}
        /* PADDING OFFSET */
					${getPaddingOffset(paddingGap)}
      }
    `}

    ${!notLastChild &&
    css`
      > :nth-child(n) {
        /* MARGIN OFFSET */
        ${getMarginOffset(marginGap)}
        /* PADDING OFFSET */
					${getPaddingOffset(paddingGap)}
      }
    `}
 
		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
  `}
`;
