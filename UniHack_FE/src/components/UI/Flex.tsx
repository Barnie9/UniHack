import React from "react";
import styled, { css } from "styled-components/macro";

import { generateSpacingOffsets } from "helpers";
import { SpacingOffsets } from "types";

enum AlignPositions {
  start = "flex-start",
  center = "center",
  end = "flex-end",
}

enum JustifyPositions {
  start = "flex-start",
  center = "center",
  end = "flex-end",
  around = "space-around",
  between = "space-between",
  evenly = "space-evenly",
}

interface GeneralProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface FlexProps {
  wrap?: boolean;
  column?: boolean;
  flex?: string | number;
  overflowHidden?: boolean;
  align?: (value: typeof AlignPositions) => AlignPositions;
  justify?: (value: typeof JustifyPositions) => JustifyPositions;
}

interface StyleProps {
  css?: string;
  fullWidth?: boolean;
}

type Props = GeneralProps & FlexProps & StyleProps & SpacingOffsets;

export function Flex({ wrap, ...props }: Props) {
  return <Component {...props} $wrap={wrap} />;
}

// Exclude reserved prop names to avoid DOM errors
type excludedProps = Omit<Props, "wrap">;

interface ComponentProps extends excludedProps {
  // using `$` before the prop name to avoid DOM errors
  $wrap?: boolean;
}

const Component = styled.div<ComponentProps>`
  ${({
    /* FLEX */
    $wrap,
    column,
    align,
    justify,
    flex,
    /* STYLE */
    css: _css,
    fullWidth,
    overflowHidden,
    /* SPACING OFFSETS */
    marginOffset,
    paddingOffset,
  }) => css`
    /* INIT */
    display: flex;

    /* FLEX */
    flex: ${flex};
    flex-wrap: ${$wrap && "wrap"};
    flex-direction: ${column && "column"};
    align-items: ${align && align(AlignPositions)};
    justify-content: ${justify && justify(JustifyPositions)};

    /* STYLE */
    width: ${fullWidth && "100%"};
    overflow: ${overflowHidden && "hidden"};

    /* SPACING OFFSETS */
    ${generateSpacingOffsets({ paddingOffset, marginOffset })}

    /* CUSTOM CSS */
		${_css}
  `}
`;
