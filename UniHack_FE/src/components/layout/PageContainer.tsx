import React from "react";
import styled from "styled-components/macro";

import { MediaQueriesDevices } from "environment/theme/Sizes";
import { PlacementProps, Offset } from "types";
import { useGridContext } from "hooks";

interface StyleProps {
  margin?: PlacementProps;
  offset: Offset;
}

// padding here needs to account for usual offset + absolutely positioned sidebar and navbar
const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${({ margin }) => (margin?.top ? `${margin.top}rem` : undefined)};
  margin-bottom: ${({ margin }) =>
    margin?.bottom ? `${margin.bottom}rem` : undefined};
  margin-left: ${({ margin }) =>
    margin?.left ? `${margin.left}rem` : undefined};
  margin-right: ${({ margin }) =>
    margin?.right ? `${margin.right}rem` : undefined};
  padding: ${({ offset }) =>
    `9.6rem ${offset.right}px 4.8rem ${offset.left}px`};
  width: 100%;

  @media ${MediaQueriesDevices.tablet} {
    padding: ${({ offset }) =>
      `9.6rem ${offset.right}px 4.8rem ${offset.left}px`};
  }

  @media ${MediaQueriesDevices.desktop} {
    padding: ${({ offset }) =>
      `9.6rem ${offset.right}px 4.8rem ${offset.left}px`};
  }

  @media ${MediaQueriesDevices.phone} {
    padding: ${({ offset }) =>
      `15.2rem ${offset.right}px 4.8rem ${offset.left}px`};
  }
`;

interface Props {
  children: React.ReactNode;
  margin?: PlacementProps;
}

export const PageContainer = React.forwardRef<HTMLDivElement, Props>(function (
  { children, margin },
  ref
) {
  const { offset } = useGridContext();

  return (
    <Container offset={offset} margin={margin} ref={ref}>
      {children}
    </Container>
  );
});
