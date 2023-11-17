import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { isEqual } from "lodash";

import { useStatic, usePrevious, useEffectOnce } from "hooks";
import { EventType } from "types";

import { CalculateItemsHeight } from "./CalculateItemsHeight";

export interface VirtualizedProps<T> {
  data: T[];
  renderItem: (props: RenderItem<T>) => React.ReactNode;
}
interface RenderItem<T> {
  item: T;
  itemIndex: number;
}

export function Virtualized<T>({ data, renderItem }: VirtualizedProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [totalHeight, setTotalHeight] = useStatic<number>(0);
  const [getItemsHeight, setItemsHeight] = useStatic<number[]>([]);

  const [calculatingHeight, setCalculatingHeight] = useState(true);
  const [state, setState] = useState<{
    itemsToShow: number[];
    fakeHeights: {
      top: number;
      bottom: number;
    };
  }>({
    itemsToShow: [],
    fakeHeights: {
      top: 0,
      bottom: 0,
    },
  });

  const prevData = usePrevious(data);
  useEffect(() => {
    if (prevData !== undefined && !isEqual(prevData, data)) {
      if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
      setTotalHeight(0);
      setItemsHeight([]);
      setCalculatingHeight(true);
    }
  }, [data]);

  useEffectOnce(() => {
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener(EventType.Scroll, virtualizeData);
    }

    window.addEventListener(EventType.Resize, virtualizeData);
  });

  function virtualizeData() {
    if (!(wrapperRef && wrapperRef.current)) return;

    const { clientHeight, scrollTop } = wrapperRef.current;

    const toShow: number[] = [];

    let acc = 0;
    let startIndex = 0;

    for (let itemIndex = 0; scrollTop; itemIndex++) {
      const itemHeight = getItemsHeight()[itemIndex];

      if (itemHeight === undefined) break;

      if (acc > scrollTop - itemHeight) break;

      acc += itemHeight;
      startIndex++;
    }

    let visibleItemsHeight = 0;
    for (let index = startIndex; visibleItemsHeight < clientHeight; index++) {
      const itemHeight = getItemsHeight()[index];

      if (itemHeight === undefined) break;

      toShow.push(index);
      visibleItemsHeight += itemHeight;
    }

    const bottomHeight = totalHeight() - visibleItemsHeight - acc;
    const topHeight = acc;

    setState({
      itemsToShow: toShow,
      fakeHeights: { top: topHeight, bottom: bottomHeight },
    });
  }

  function handleItemsHeight(itemHeight: number) {
    const itemsHeight = getItemsHeight();

    setItemsHeight([...itemsHeight, itemHeight]);
    setTotalHeight(totalHeight() + itemHeight);
  }

  const { itemsToShow, fakeHeights } = state;

  const styles: CSSProperties = {
    height: "100%",
    overflow: "auto",
    ...(calculatingHeight && {
      opacity: 0.5,
      pointerEvents: "none",
    }),
  };

  return (
    <div ref={wrapperRef} className="virtualized-container" style={styles}>
      {calculatingHeight && (
        /*
					CALCULATE ALL ITEMS HEIGHT AND PUT THEM IN AN ARRAY - V2 WITH STATE
					(doesn't block the main thread, rendering items 1 by 1 to DOM and then removing them async)
					NOTE: this causes `Maximum update depth exceeded` errors (React)
				*/
        <CalculateItemsHeight
          data={data}
          renderItem={renderItem}
          handleItemsHeight={handleItemsHeight}
          setCalculatingHeight={setCalculatingHeight}
          virtualizeData={virtualizeData}
        />
      )}

      {/* PLACEHOLDER FOR THE UN-RENDERED ELEMENTS */}
      {fakeHeights.top > 0 && <div style={{ height: fakeHeights.top }}></div>}

      {/* ONLY VISIBLE IN-VIEW-PORT ITEMS */}
      {itemsToShow.map((itemIndex) =>
        renderItem({ item: data[itemIndex], itemIndex })
      )}

      {/* PLACEHOLDER FOR THE UN-RENDERED ELEMENTS */}
      {fakeHeights.bottom > 0 && (
        <div style={{ height: fakeHeights.bottom }}></div>
      )}
    </div>
  );
}
