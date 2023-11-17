import React, { forwardRef, useMemo } from "react";

import { Bounds, Offset } from "types";

import { Container } from "./PopoverContent.style";

const computePosition = (bounds?: Bounds, offset?: Offset) => {
  let top = bounds && bounds.height ? bounds.height : 0;
  let bottom = 0;
  let left = bounds && bounds.width ? bounds.width / 2 : 0;
  let right = 0;

  const position: Offset = {
    top,
    left,
  };

  if (offset) {
    if (offset.top !== undefined) {
      top += offset.top;
      position.top = top;
    }

    if (offset.bottom !== undefined) {
      bottom = offset.bottom;
      position.bottom = bottom;
      delete position.top;
    }

    if (offset.left !== undefined) {
      left += offset.left;
      position.left = left;
    }

    if (offset.right !== undefined) {
      right = offset.right;
      position.right = -right;
      delete position.left;
    }
  }

  return position;
};

interface Props {
  children: React.ReactNode;
  bounds?: Bounds;
  width?: number;
  offset?: Offset;
  className?: string;
}

export const PopoverContent = forwardRef<HTMLDivElement, Props>(
  ({ children, bounds, width, offset, className }, ref) => {
    const position = useMemo(
      () => computePosition(bounds, offset),
      [bounds, offset]
    );

    return (
      <Container ref={ref} width={width} style={position} className={className}>
        {children}
      </Container>
    );
  }
);
