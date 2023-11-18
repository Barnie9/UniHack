import React from "react";
import styled, { css } from "styled-components/macro";

import { MediaQueriesDevices } from "environment/theme/Sizes";
import { LayoutFlexProps, LayoutStyleProps, Nullable } from "types";

interface Props extends LayoutStyleProps, LayoutFlexProps {
  position?: "relative" | "absolute";
}

const FilteredColumn = ({
  flex,
  justify,
  align,
  position,
  height,
  margin,
  padding,
  width,
  ...props
}: Props & React.HTMLProps<HTMLDivElement>) => <div {...props} />;

export const Column = styled(FilteredColumn)<Props>`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => flex};
  justify-content: ${({ justify = "space-between" }) => justify};
  align-items: ${({ align }) => align || "stretch"};
  margin-top: ${({ margin }) => (margin?.top ? `${margin.top}rem` : undefined)};
  margin-bottom: ${({ margin }) =>
    margin?.bottom ? `${margin.bottom}rem` : undefined};
  margin-left: ${({ margin }) =>
    margin?.left ? `${margin.left}rem` : undefined};
  margin-right: ${({ margin }) =>
    margin?.right ? `${margin.right}rem` : undefined};
  padding-top: ${({ padding }) =>
    padding?.top ? `${padding.top}rem` : undefined};
  padding-bottom: ${({ padding }) =>
    padding?.bottom ? `${padding.bottom}rem` : undefined};
  padding-left: ${({ padding }) =>
    padding?.left ? `${padding.left}rem` : undefined};
  padding-right: ${({ padding }) =>
    padding?.right ? `${padding.right}rem` : undefined};
  position: ${({ position }) => position};
  height: ${({ height }) =>
    height !== undefined
      ? typeof height === "string"
        ? height
        : `${height}rem`
      : "auto"};
  width: ${({ width = "100%" }) =>
    width !== undefined
      ? typeof width === "string"
        ? width
        : `${width}rem`
      : "auto"};
`;

const FilteredRow = ({
  flex,
  justify,
  align,
  position,
  height,
  margin,
  padding,
  width,
  ...props
}: Props & React.HTMLProps<HTMLDivElement>) => <div {...props} />;

export const Row = styled(FilteredRow)<Props>`
  display: flex;
  flex: ${({ flex }) => flex};
  justify-content: ${({ justify = "space-between" }) => justify};
  align-items: ${({ align }) => align || "stretch"};
  flex-wrap: ${({ wrap }) => (wrap ? wrap : "nowrap")};
  margin-top: ${({ margin }) => (margin?.top ? `${margin.top}rem` : undefined)};
  margin-bottom: ${({ margin }) =>
    margin?.bottom ? `${margin.bottom}rem` : undefined};
  margin-left: ${({ margin }) =>
    margin?.left ? `${margin.left}rem` : undefined};
  margin-right: ${({ margin }) =>
    margin?.right ? `${margin.right}rem` : undefined};
  padding-top: ${({ padding }) =>
    padding?.top ? `${padding.top}rem` : undefined};
  padding-bottom: ${({ padding }) =>
    padding?.bottom ? `${padding.bottom}rem` : undefined};
  padding-left: ${({ padding }) =>
    padding?.left ? `${padding.left}rem` : undefined};
  padding-right: ${({ padding }) =>
    padding?.right ? `${padding.right}rem` : undefined};
  position: ${({ position }) => position};
  height: ${({ height }) =>
    height !== undefined
      ? typeof height === "string"
        ? height
        : `${height}rem`
      : "auto"};
  width: ${({ width = "100%" }) =>
    width !== undefined
      ? typeof width === "string"
        ? width
        : `${width}rem`
      : "auto"};
`;

const FilteredGrid = ({
  height,
  margin,
  padding,
  width,
  ...props
}: LayoutStyleProps & React.HTMLProps<HTMLDivElement>) => <div {...props} />;

interface GridProps {
  gutter: number;
}

export const Grid = styled(FilteredGrid)<GridProps>`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: ${({ gutter }) => `${gutter}px`};
  row-gap: ${({ gutter }) => `${gutter}px`};
  width: 100%;

  @media ${MediaQueriesDevices.phone} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${MediaQueriesDevices.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${MediaQueriesDevices.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${MediaQueriesDevices.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${MediaQueriesDevices.qhd} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export interface GridItemProps {
  size?: number;
  x?: Nullable<number>;
  y?: Nullable<number>;
}

export const GridItem = styled.div<GridItemProps>`
  grid-column: ${({ size = 1 }) => `span ${size}`};

  ${({ size = 1, x, y }) =>
    x &&
    y &&
    css`
      @media ${MediaQueriesDevices.desktop} {
        grid-column-start: ${y};
        grid-column-end: ${size + y};
        grid-row: ${x};
      }
    `}
`;
