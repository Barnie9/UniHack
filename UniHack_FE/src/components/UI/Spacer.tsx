import React from "react";
import styled, { css } from "styled-components/macro";

enum SpaceTypes {
  xs = 0.8,
  s = 1.6,
  m = 2.4,
  l = 3.2,
  xl = 4.8,
  xxl = 6.4,
}

interface Props {
  className?: string;
  size: (size: typeof SpaceTypes) => SpaceTypes;
}

export function Spacer({ className, size }: Props) {
  const spaceSize = size(SpaceTypes);

  return <Component className={className} $size={spaceSize} />;
}

interface ComponentProps {
  // using `$` before the prop name to avoid DOM errors
  $size: SpaceTypes;
}
const Component = styled.div<ComponentProps>`
  display: block;
  opacity: 0;
  width: 100%;

  ${({ $size }) => css`
    height: ${$size}rem;
    min-height: ${$size}rem;
    max-height: ${$size}rem;
  `}
`;
