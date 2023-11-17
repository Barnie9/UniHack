import React, { useState, useRef, useEffect } from "react";

import { VirtualizedProps } from "./Virtualized";
import { useStatic, useMemoOnce } from "hooks";

interface CalculateItemsHeightProps<T> extends VirtualizedProps<T> {
  handleItemsHeight: (itemHeight: number) => void;
  setCalculatingHeight: (value: boolean) => void;
  virtualizeData: () => void;
}
export function CalculateItemsHeight<T>({
  data,
  renderItem,
  handleItemsHeight,
  setCalculatingHeight,
  virtualizeData,
}: CalculateItemsHeightProps<T>) {
  const [getStartIndex, setStartIndex] = useStatic(0);
  const [getStopCalculate, setStopCalculate] = useStatic(false);

  // THE NUMBER OF ITEMS TO MAP OVER IN A HEIGHT CALCULATION ROUND
  const throttleNumber = useMemoOnce(() => {
    // REACT WILL TRIGGER AN ERROR
    const MAX_REACT_SET_STATE_LOOP_BEFORE_ERROR = 49;

    let number = 100;

    while (data.length / number >= MAX_REACT_SET_STATE_LOOP_BEFORE_ERROR) {
      number += 50;
    }

    return number;
  });

  const initialThrottleData = useMemoOnce(() => getThrottledData(data));

  const [throttledData, setThrottledData] = useState(initialThrottleData);

  function getThrottledData(data: T[]): T[] {
    const throttled = [...data].slice(
      getStartIndex(),
      getStartIndex() + throttleNumber
    );

    if (throttled.length === throttleNumber) {
      setStartIndex(getStartIndex() + throttleNumber);
    } else {
      // EXACTLY 0 DATA LEFT TO THROTTLE
      if (throttled.length === 0) setCalculatingHeight(false);
      setStopCalculate(true);
    }

    return throttled;
  }

  function stop() {
    virtualizeData();

    // IF NO MORE DATA TO THROTTLE - STOP HEIGHT CALCULATION
    if (getStopCalculate()) {
      setCalculatingHeight(false);
    }
    // THROTTLE MORE DATA
    else {
      setThrottledData(getThrottledData(data));
    }
  }

  return (
    <div style={{ position: "fixed", visibility: "hidden" }}>
      {throttledData.map((item, itemIndex) => {
        const isLast = itemIndex === throttledData.length - 1;

        return (
          <GetItemHeight
            key={itemIndex}
            item={renderItem({ item, itemIndex })}
            isLast={isLast}
            stop={stop}
            handleItemsHeight={handleItemsHeight}
          />
        );
      })}
    </div>
  );
}

interface GetItemHeightProps {
  item: React.ReactNode;
  isLast: boolean;
  stop: () => void;
  handleItemsHeight: (itemHeight: number) => void;
}
function GetItemHeight({
  item,
  isLast,
  stop,
  handleItemsHeight,
}: GetItemHeightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      handleItemsHeight(ref.current.clientHeight);
      if (isLast) stop();
    }
  });

  return <div ref={ref}>{item}</div>;
}
