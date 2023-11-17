import React, { useEffect, useState } from "react";

import { Memoize } from "components/UI/Memoize";
import { MediaQueriesDevices } from "environment/theme/Sizes";
import {
  useMediaQuery,
  usePlatformContext,
  GridContext,
  useWindowSize,
} from "hooks";
import { WidthsMap } from "types";
import { Container } from "./GridProvider.style";

import { SIDEBAR_OFFSET } from "consts";

// Grid guideline:
// subtract OFFSET to determine contentWidth(!): contentWidth = width - offset - this will be the new base line (100%);
// set a COLUMN percentage using this formula: (100 - gutter * 11) / 12 (account for 11 gutters because there's 12 'grid columns' on the grid on all breakpoints);
// CAVEAT: CARD_SPAN * columnsCount need to be equal to 12.

const CARD_HEIGHT = 410;

// On phones, a card spans 6 columns
const PHONE_CARD_SPAN = 6;
// On tablets, a card of size 1 spans 4 columns
const TABLET_CARD_SPAN = 4;
// On laptop, a card of size 1 spans 3 columns
const LAPTOP_CARD_SPAN = 3;
// On desktop, a card of size 1 spans 3 columns
const DESKTOP_CARD_SPAN = 3;

/**
 *
 * @param column Width of a grid column
 * @param gutter Width of the gutter between grid columns
 * @param span Number of columns a card spans over
 */
function computeWidths(column: number, gutter: number, span: number) {
  const widths: WidthsMap = {};
  widths[1] = span * column + (span - 1) * gutter;
  widths[2] = span * 2 * column + (span * 2 - 1) * gutter;

  return widths;
}

interface Props {
  children: React.ReactNode;
}

export function GridProvider({ children }: Props) {
  const { isTv } = usePlatformContext();

  const [columnsPerRow, setColumnsPerRow] = useState(0);
  const [gutter, setGutter] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [itemWidths, setItemWidths] = useState<WidthsMap>({ 1: 0, 2: 0 });
  const [offset, setOffset] = useState({ left: 0, right: 0 });

  const isPhone = useMediaQuery(MediaQueriesDevices.phone);
  const isTablet = useMediaQuery(MediaQueriesDevices.tablet);
  const isLaptop = useMediaQuery(MediaQueriesDevices.laptop);
  const isDesktop = useMediaQuery(MediaQueriesDevices.desktop);
  const isQhd = useMediaQuery(MediaQueriesDevices.qhd);

  const { height, width, resizing } = useWindowSize();

  useEffect(() => {
    if (isPhone) {
      const offset = {
        left: (5.2 / 100) * width + SIDEBAR_OFFSET,
        right: (5.2 / 100) * width,
      };
      const contentWidth = width - offset.right - offset.left;
      const gutter = (3.1 / 100) * contentWidth;
      const column = (5.5 / 100) * contentWidth;
      setItemHeight(CARD_HEIGHT);
      setGutter(gutter);

      setColumnsPerRow(2);
      setItemWidths(computeWidths(column, gutter, PHONE_CARD_SPAN));
      setOffset(offset);
    }
  }, [isPhone, width]);

  useEffect(() => {
    if (isTablet) {
      if (isTv) {
        document.documentElement.style.fontSize = "4px";
        const column = (19.27 / 100) * width;
        const gutter = (1.2 / 100) * width;

        setColumnsPerRow(4);
        setGutter(gutter);
        setItemHeight(height / 2.5);
        setItemWidths(computeWidths(column, gutter, PHONE_CARD_SPAN));
      } else {
        document.documentElement.style.fontSize = "62.5%";
        const offset = {
          left: (3.7 / 100) * width + SIDEBAR_OFFSET,
          right: (3.7 / 100) * width,
        };
        const contentWidth = width - offset.right - offset.left;
        const column = (6.31 / 100) * contentWidth;
        const gutter = (2.2 / 100) * contentWidth;
        const widths = computeWidths(column, gutter, TABLET_CARD_SPAN);

        setColumnsPerRow(3);
        setGutter(gutter);
        setItemHeight(CARD_HEIGHT);
        setItemWidths(widths);
        setOffset(offset);
      }
    }
  }, [isTablet, isTv, height, width]);

  useEffect(() => {
    if (isLaptop) {
      const offset = {
        left: (2.8 / 100) * width + SIDEBAR_OFFSET,
        right: (2.8 / 100) * width,
      };
      const contentWidth = width - offset.right - offset.left;
      const column = (6.775 / 100) * contentWidth;
      const gutter = (1.7 / 100) * contentWidth;
      const widths = computeWidths(column, gutter, LAPTOP_CARD_SPAN);

      setItemHeight(CARD_HEIGHT);
      setColumnsPerRow(4);
      setGutter(gutter);
      setItemWidths(widths);
      setOffset(offset);
    }
  }, [isLaptop, height, width]);

  useEffect(() => {
    if (isDesktop) {
      const offset = {
        left: (2.4 / 100) * width + SIDEBAR_OFFSET,
        right: (2.4 / 100) * width,
      };
      const contentWidth = width - offset.right - offset.left;
      const column = (7.05 / 100) * contentWidth;
      const gutter = (1.4 / 100) * contentWidth;
      const widths = computeWidths(column, gutter, DESKTOP_CARD_SPAN);

      if (isTv) {
        setItemHeight(height / 2.5);
        document.documentElement.style.fontSize = "43.75%";
      } else {
        setItemHeight(CARD_HEIGHT);
        document.documentElement.style.fontSize = "62.5%";
      }

      setItemHeight(CARD_HEIGHT);
      setColumnsPerRow(4);
      setGutter(gutter);
      setItemWidths(widths);
      setOffset(offset);
    }
  }, [isDesktop, isTv, height, width]);

  useEffect(() => {
    if (isQhd) {
      const offset = {
        left: (2.4 / 100) * width + SIDEBAR_OFFSET,
        right: (2.4 / 100) * width,
      };
      const contentWidth = width - offset.right - offset.left;
      const column = (7.05 / 100) * contentWidth;
      const gutter = (1.4 / 100) * contentWidth;
      const widths = computeWidths(column, gutter, DESKTOP_CARD_SPAN);

      if (isTv) {
        setItemHeight(height / 2.5);
        document.documentElement.style.fontSize = "43.75%";
      } else {
        setItemHeight(CARD_HEIGHT);
        document.documentElement.style.fontSize = "62.5%";
      }

      setItemHeight(CARD_HEIGHT);
      setColumnsPerRow(4);
      setGutter(gutter);
      setItemWidths(widths);
      setOffset(offset);
    }
  }, [isQhd, isTv, height, width]);

  return (
    <Container>
      <GridContext.Provider
        value={{
          columnsPerRow,
          gutter,
          itemHeight,
          itemWidths,
          offset,
          resizing,
        }}
      >
        <Memoize>{children}</Memoize>
      </GridContext.Provider>
    </Container>
  );
}
