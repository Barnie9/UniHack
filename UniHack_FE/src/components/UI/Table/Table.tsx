import React from "react";
import { useHorizontalScroll } from "hooks";

import { Column } from "./Column";

import {
  ResponsiveContainer,
  Table as DefaultTable,
  Row,
  Cell,
  Head,
  Body,
} from "./Table.style";

export interface TableProps {
  children: React.ReactNode;
  tableRef?: React.RefObject<HTMLTableElement>;
  noDesign?: boolean;
  hoverEffect?: boolean;
  fullWidth?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  stickyHead?: boolean;
  paddingX?: number;
  paddingY?: number;
}

export function Table({
  children,
  tableRef,
  noDesign,
  hoverEffect,
  fullWidth,
  width,
  minWidth,
  maxWidth,
  stickyHead,
  paddingX,
  paddingY,
}: TableProps) {
  return (
    <DefaultTable
      ref={tableRef}
      noDesign={noDesign}
      hoverEffect={hoverEffect}
      fullWidth={fullWidth}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      stickyHead={stickyHead}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      {children}
    </DefaultTable>
  );
}

interface ResponsiveProps {
  children: React.ReactNode;
  noDesign?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  disableScroll?: boolean;
  horizontalScroll?: boolean;
}

function Responsive({
  children,
  noDesign,
  fullWidth,
  fullHeight,
  disableScroll,
  horizontalScroll,
}: ResponsiveProps) {
  const { handleRef } = useHorizontalScroll();

  return (
    <ResponsiveContainer
      noDesign={noDesign}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      disableScroll={disableScroll}
      ref={horizontalScroll ? handleRef : null}
    >
      {children}
    </ResponsiveContainer>
  );
}

Table.Responsive = Responsive;
Table.Head = Head;
Table.Column = Column;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
