import React from "react";
import { Flex } from "../Flex";
import { FilterWrapper, ColumnComponent } from "./Column.style";

export interface StyledProps {
  css?: string;
  textCenter?: boolean;
  textRight?: boolean;
  empty?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  noWrap?: boolean;
  paddingLeft?: number;
  paddingRight?: number;
  clickable?: boolean;
}

interface ThProps {
  title?: string;
  colSpan?: number;
  rowSpan?: number;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
}

interface ColumnProps extends StyledProps, ThProps {
  children?: React.ReactNode;
  filter?: JSX.Element;
  showFilter?: boolean;
}

export function Column({
  children,
  filter,
  showFilter,
  ...styledProps
}: ColumnProps) {
  return (
    <ColumnComponent {...styledProps}>
      <Flex
        align={(a) => a.center}
        justify={(j) =>
          styledProps.textRight
            ? j.end
            : styledProps.textCenter
            ? j.center
            : j.start
        }
      >
        {children}
        {filter && (
          <FilterWrapper className="column-filter" visible={showFilter}>
            {filter}
          </FilterWrapper>
        )}
      </Flex>
    </ColumnComponent>
  );
}
