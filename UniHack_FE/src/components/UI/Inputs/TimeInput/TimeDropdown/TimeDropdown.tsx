import React, {
  useRef,
  useState,
  useLayoutEffect,
  RefObject,
  useEffect,
} from "react";

import { useOutsideClick } from "hooks";

import { Wrapper, Button, Column } from "./TimeDropdown.style";

import { isInViewPort } from "../helpers";

interface Props {
  parentRef: RefObject<HTMLDivElement>;
  hours: string[];
  minutes: string[];
  small?: boolean;
  isHourActive: (hour: string, index: number) => boolean;
  isMinuteActive: (minute: string, index: number) => boolean;
  onHoursChange: (value: string) => void;
  onMinutesChange: (value: string) => void;
  onClose: () => void;
}

export function TimeDropdown({
  parentRef,
  hours,
  minutes,
  small,
  isHourActive,
  isMinuteActive,
  onHoursChange,
  onMinutesChange,
  onClose,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isUpwards, setIsUpwards] = useState(false);

  useOutsideClick(onClose, [parentRef, dropdownRef]);

  useLayoutEffect(() => {
    const isInView = isInViewPort(dropdownRef);

    if (typeof isInView === "boolean") {
      if (isInView) {
        setIsUpwards(false);
      } else {
        setIsUpwards(true);
      }
    }
  }, [dropdownRef]);

  useEffect(() => {
    const activeHour = document.querySelector(".time__dropdown__btn_h__active");
    const activeMinute = document.querySelector(
      ".time__dropdown__btn_m__active"
    );

    activeHour?.scrollIntoView({ block: "nearest" });
    activeMinute?.scrollIntoView({ block: "nearest" });
  });

  return (
    <Wrapper
      small={small}
      ref={dropdownRef}
      openUpwards={isUpwards}
      onClick={(e) =>
        // isolate `onClick` event
        e.stopPropagation()
      }
    >
      <Column>
        {hours.map((hour, index) => (
          <Button
            key={`time__dropdown__btn_h_${index}`}
            className={
              isHourActive(hour, index)
                ? `time__dropdown__btn_h__active`
                : undefined
            }
            active={isHourActive(hour, index)}
            onClick={() => onHoursChange(hour)}
          >
            {hour}
          </Button>
        ))}
      </Column>
      <Column>
        {minutes.map((minute, index) => (
          <Button
            key={`time__dropdown__btn_m_${index}`}
            className={
              isMinuteActive(minute, index)
                ? `time__dropdown__btn_m__active`
                : undefined
            }
            active={isMinuteActive(minute, index)}
            onClick={() => onMinutesChange(minute)}
          >
            {minute}
          </Button>
        ))}
      </Column>
    </Wrapper>
  );
}
