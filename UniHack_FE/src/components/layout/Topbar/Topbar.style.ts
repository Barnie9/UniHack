import styled from "styled-components";
import { Layers } from "environment";
import { MediaQueriesDevices } from "environment/theme/Sizes";
import { Offset } from "types";
interface ContainerProps {
  offset: Offset;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: ${({ offset }) => `0 40px 0 ${offset.left}px`};
  z-index: ${Layers.nav};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 5.6rem;

  @media ${MediaQueriesDevices.tablet} {
    padding-left: 6.4rem;
    padding-right: 0;
  }

  @media ${MediaQueriesDevices.phone} {
    height: auto;
    padding-right: 0;
    padding-left: 6.4rem;
  }
`;

export const Left = styled.div`
  height: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${MediaQueriesDevices.phone} {
    width: 100%;
  }
`;

export const Right = styled.div`
  height: 5.6rem;
  display: flex;
  justify-items: space-between;
  align-items: center;
  margin-left: auto;

  @media ${MediaQueriesDevices.phone} {
    width: 100%;
    > div:first-of-type {
      width: calc(33% + 0.2rem); // account for separator (???);
    }
  }
`;

export const Options = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  // when offset < 144 this div can't be aligned this with the columns properly
  // so compromise on this for proper layout on lower widths;
  width: ${({ offset }) =>
    offset?.right && offset?.right > 144
      ? `${offset?.right - 40}px`
      : "auto"} !important;

  @media ${MediaQueriesDevices.phone} {
    width: auto;
    margin-left: auto;
  }
`;

export const HorizontalSeparator = styled.div`
  width: 100%;
  height: 2px;
  display: none;

  @media ${MediaQueriesDevices.phone} {
    display: block;
  }
`;
