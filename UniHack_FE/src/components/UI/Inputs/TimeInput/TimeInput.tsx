import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  useMemo,
  forwardRef,
} from "react";
import { throttle } from "lodash";

import { Icon } from "components/UI/Icons";
import { CreatableSelect } from "components/UI/Interactables/CreatableSelect";
import { Typography } from "components/UI/Typography";
import { Flex } from "components/UI/Flex";
import { keyMaps } from "consts";
import { Svgs } from "environment";
import { debuggerLog } from "helpers";
import {
  useOutsideClick,
  usePrevious,
  useMeasureText,
  useStatic,
  useMemoOnce,
} from "hooks";
import { SelectItem } from "types";

import { TimeDropdown } from "./TimeDropdown";

import { MERIDIAN_OPTIONS } from "./consts";
import {
  convert12HourFormatTo24,
  getCurrentTimezoneOffset,
  getDateInformation,
} from "./helpers";

import { Wrapper, TimeSelect, Input } from "./TimeInput.style";

interface RefProps {
  open: () => void;
}

interface Props {
  value: string;
  meridian?: boolean;
  small?: boolean;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyController?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
  dateInput?: {
    value: string;
    ref: React.RefObject<{ open: () => void }>;
  };
  onChange: (e: string) => void;
  onReadOnly?: () => void;
}

export const TimeInput = forwardRef<RefProps, Props>(
  (
    {
      value,
      meridian,
      small,
      error,
      disabled,
      readOnly,
      readOnlyController,
      containerRef,
      dateInput,
      onChange,
      onReadOnly,
    },
    ref
  ) => {
    // SET TO `true` TO SEE THE LOGS
    const DEBUGGER = false;
    const log = debuggerLog(DEBUGGER);

    const timeRef = useRef<HTMLInputElement>(null);
    const hoursInputRef = useRef<HTMLInputElement>(null);
    const minutesInputRef = useRef<HTMLInputElement>(null);
    const meridianInputRef = useRef<HTMLInputElement>(null);
    const placeholderRef = useRef(null);

    const { measureText } = useMeasureText();

    const initialState = useMemoOnce(() => getDateInformation(value));

    const [h, setH] = useState(initialState.h);
    const [m, setM] = useState(initialState.m);
    const [draftH, setDraftH] = useState(initialState.h);
    const [draftM, setDraftM] = useState(initialState.m);

    const [timezoneOffset, setTimezoneOffset] = useState(initialState.timezone);
    const [internalMeridian, setInternalMeridian] = useState(
      initialState.meridianValue
    );

    const [open, setOpen] = useState<boolean>(false);

    const [hoursInputFocused, setHoursInputFocused] = useStatic(false);
    const [minutesInputFocused, setMinutesInputFocused] = useStatic(false);

    const { hours, minutes } = useMemo(
      () => generateTimeValues(meridian),
      [meridian]
    );

    /**
     * Expose `open` function to the parent through `ref`
     */
    useImperativeHandle(ref, () => ({
      safeTimestamp() {
        if (!h && !m && (meridian ? !internalMeridian : true)) {
          const timeNow = new Date().toISOString().split("T")[1];

          const dateInformation = getDateInformation(timeNow);

          handleSetH(dateInformation.h);
          handleSetM(dateInformation.m);
          setTimezoneOffset(dateInformation.timezone);
          setInternalMeridian(dateInformation.meridianValue);

          setTimeout(() => hoursInputRef.current?.select());
        }
      },
      open() {
        if (!h) {
          openTimeDropdown();
          hoursInputRef.current?.focus();

          return;
        }

        if (!m) {
          openTimeDropdown();
          minutesInputRef.current?.focus();

          return;
        }

        if (meridian && !internalMeridian) {
          closeTimeDropdown();
          meridianInputRef.current?.focus();

          return;
        }
      },
      reset() {
        resetValues();
        closeTimeDropdown();
      },
    }));

    // officialize values
    const firstRender = usePrevious(true);
    useEffect(() => {
      if (!firstRender) return;

      handleSubmit(h, m, internalMeridian);
    }, [h, m, internalMeridian]);

    // officialize `draftH` when valid
    useEffect(() => {
      if (draftH === h) return;

      if (hours.includes(draftH)) {
        const computedH = meridian
          ? convert12HourFormatTo24(draftH, internalMeridian)
          : draftH;

        setH(computedH);

        // allow the user to type 2 digits possibilities
        if (meridian && draftH.startsWith("1") && draftH.length === 1) return;

        if (!m) {
          return minutesInputRef.current?.focus();
        }
        if (meridian && !internalMeridian) {
          closeTimeDropdown();
          meridianInputRef.current?.focus();

          return;
        }
      }
    }, [draftH]);

    // officialize `draftM` when valid
    useEffect(() => {
      if (draftM === m) return;

      if (minutes.includes(draftM)) {
        setM(draftM);

        if (!h) {
          return hoursInputRef.current?.focus();
        }
        if (meridian && !internalMeridian) {
          closeTimeDropdown();
          meridianInputRef.current?.focus();

          return;
        }
      }
    }, [draftM]);

    // hydrate `draftH`
    useEffect(() => {
      if (h !== draftH) {
        log("hydrate `draftH`");

        setDraftH(h);
      }
    }, [h]);

    // hydrate `draftM`
    useEffect(() => {
      if (m !== draftM) {
        log("hydrate `draftM`");

        setDraftM(m);
      }
    }, [m]);

    useEffect(() => {
      if (open) {
        // allow custom user focus to take place
        if (hoursInputFocused() || minutesInputFocused()) return;

        // focus on empty field on dropdown open
        if (!draftH) {
          return hoursInputRef.current?.focus();
        }
        if (!draftM) {
          return minutesInputRef.current?.focus();
        }

        return hoursInputRef.current?.focus();
      }
      // clear draft values on dropdown close
      else {
        if (draftH !== h) setDraftH(h);
        if (draftM !== m) setDraftM(m);
      }
    }, [open]);

    // hydrate states
    const prevValue = usePrevious(value);
    useEffect(() => {
      if (prevValue !== undefined && prevValue !== value) {
        if (!value) {
          log("hydrate states - CLEAR values");

          return resetValues();
        }

        const dateInformation = getDateInformation(value);

        if (
          dateInformation.h !== h ||
          dateInformation.m !== m ||
          (meridian
            ? dateInformation.meridianValue !== internalMeridian
            : false) ||
          dateInformation.timezone !== timezoneOffset
        ) {
          log("hydrate states - SET values", {
            value,
            dateInformation,
          });

          handleSetH(dateInformation.h);
          handleSetM(dateInformation.m);
          setTimezoneOffset(dateInformation.timezone);
          setInternalMeridian(dateInformation.meridianValue);
        }
      }
    }, [value]);

    /**
     * Reset internal state when user clicks outside parent component
     * to maintain clean state
     */
    useOutsideClick(
      () => {
        const valid =
          h.length > 0 &&
          m.length > 0 &&
          timezoneOffset.length > 0 &&
          (meridian ? internalMeridian !== "" : true);

        if (!valid) resetValues();
      },
      [containerRef ?? placeholderRef],
      {
        listen: !!containerRef,
      }
    );

    function handleSubmit(h: string, m: string, internalMeridian: string) {
      log("handleSubmit()", { h, m, internalMeridian });

      if (h !== "" && m !== "" && (meridian ? internalMeridian !== "" : true)) {
        const result = `${h}:${m}:00${timezoneOffset}`;

        log("onChange()", { result });
        onChange(result);
      }
    }

    function generateTimeValues(meridian?: boolean) {
      let hours: string[] = [];
      let minutes: string[] = [];

      if (meridian) {
        hours = createArray(12).map((_, i) => `${i + 1}`);
      } else {
        hours = createArray(24).map((_, i) => `${i < 10 ? "0" + i : i}`);
      }

      minutes = createArray(60).map((_, i) => `${i < 10 ? "0" + i : i}`);

      return { hours, minutes };
    }

    function createArray(length: number, defaultValue = null) {
      return [...new Array(length).fill(defaultValue)];
    }

    function handleSetH(value: string) {
      setH(value);
      setDraftH(value);
    }

    function handleSetM(value: string) {
      setM(value);
      setDraftM(value);
    }

    function toggleTimeDropdown() {
      if (disabled || readOnly) return;

      setOpen((state) => !state);
    }

    function closeTimeDropdown() {
      setOpen(false);
      setTimeout(() => {
        hoursInputRef.current?.blur();
        minutesInputRef.current?.blur();
      });
    }

    function openTimeDropdown() {
      setOpen(true);
    }

    function closeTimeDropdownSafe(h: string, m: string) {
      if ([h, m].includes("")) return;

      closeTimeDropdown();
    }

    function onHoursChange(hours: string) {
      log("onHoursChange()", { hours });

      if (readOnlyController && onReadOnly) {
        onReadOnly();
        return;
      }

      if (hours === h) return closeTimeDropdown();

      const computedH = meridian
        ? convert12HourFormatTo24(hours, internalMeridian)
        : hours;

      handleSetH(computedH);
      closeTimeDropdownSafe(computedH, m);

      if (hours && m && meridian && !internalMeridian) {
        meridianInputRef.current?.focus();
      }
    }

    function onMinutesChange(minutes: string) {
      log("onMinutesChange()", { minutes });

      if (readOnlyController && onReadOnly) {
        onReadOnly();
        return;
      }

      if (minutes === m) return closeTimeDropdown();

      handleSetM(minutes);
      closeTimeDropdownSafe(h, minutes);

      if (h && minutes && meridian && !internalMeridian) {
        meridianInputRef.current?.focus();
      }
    }

    function onMeridianChange(value: string) {
      log("onMeridianChange()", { value });

      if (readOnlyController && onReadOnly) {
        onReadOnly();
        return;
      }

      if (value === internalMeridian) return;

      setInternalMeridian(value);

      if (h) {
        const h_12 = `${Number(h) % 12 || 12}`;
        const computedH = convert12HourFormatTo24(h_12, value);

        handleSetH(computedH);
      }

      if (!h) {
        openTimeDropdown();
        hoursInputRef.current?.focus();

        return;
      }

      if (!m) {
        openTimeDropdown();
        minutesInputRef.current?.focus();

        return;
      }

      if (dateInput && !dateInput.value) {
        dateInput.ref?.current?.open();

        return;
      }
    }

    function resetValues() {
      const timezone = getCurrentTimezoneOffset();

      handleSetH("");
      handleSetM("");
      setInternalMeridian("");
      setTimezoneOffset(timezone);
    }

    function displayHourInputValue() {
      let computedH = draftH;

      if (meridian && computedH !== "")
        computedH = `${Number(computedH) % 12 || 12}`;

      return computedH;
    }

    const meridianSelectItems: SelectItem[] = [
      {
        label: MERIDIAN_OPTIONS.AM,
        value: MERIDIAN_OPTIONS.AM,
      },
      {
        label: MERIDIAN_OPTIONS.PM,
        value: MERIDIAN_OPTIONS.PM,
      },
    ];

    function onHoursInputChange(value: string) {
      if (disabled || readOnly) return;

      log("onHoursInputChange()", { value });

      // allow numbers only
      value = value.replace(/[^0-9]+/g, "");
      // allow only 2 characters
      value = value.slice(0, 2);

      setDraftH(value);
    }

    function onMinutesInputChange(value: string) {
      if (disabled || readOnly) return;

      log("onMinutesInputChange()", { value });

      // allow numbers only
      value = value.replace(/[^0-9]+/g, "");
      // allow only 2 characters
      value = value.slice(0, 2);

      setDraftM(value);
    }

    function isHourActive(value: string) {
      if (!h) return false;

      let active = false;

      if (meridian) {
        const h_12 = `${Number(h) % 12 || 12}`;

        active = value === h_12;
      } else {
        active = value === h;
      }

      return active;
    }

    function getHourInputWidth() {
      const placeholderWith = meridian ? 8 : 16;

      return measureText(displayHourInputValue()) || placeholderWith;
    }

    function handleKeyPress(
      e: React.KeyboardEvent<HTMLInputElement>,
      type: "hours" | "minutes"
    ) {
      if (disabled || readOnly) return;

      e.stopPropagation();

      // ENTER
      if (keyMaps.enter.includes(e.key)) {
        e.preventDefault();

        if (h && m) {
          if (meridian && !internalMeridian) {
            return meridianInputRef.current?.focus();
          }

          return closeTimeDropdown();
        }

        if (type === "hours" && !m) {
          handleSetM(minutes[0]);
          setTimeout(() => minutesInputRef.current?.select());
        }
        if (type === "minutes" && !h) {
          const computedH = meridian
            ? convert12HourFormatTo24(hours[0], internalMeridian)
            : hours[0];

          handleSetH(computedH);

          setTimeout(() => hoursInputRef.current?.select());
        }
      }

      // ARROW LEFT
      if (keyMaps.arrowLeft.includes(e.key)) {
        if (!h) {
          const computedH = meridian
            ? convert12HourFormatTo24(hours[0], internalMeridian)
            : hours[0];

          handleSetH(computedH);
        }

        setTimeout(() => hoursInputRef.current?.select());
      }
      // ARROW RIGHT
      if (keyMaps.arrowRight.includes(e.key)) {
        if (!m) handleSetM(minutes[0]);

        setTimeout(() => minutesInputRef.current?.select());
      }

      if (type === "hours") {
        // ARROW UP
        if (keyMaps.arrowUp.includes(e.key)) hours_controller.increment();
        // ARROW DOWN
        if (keyMaps.arrowDown.includes(e.key)) hours_controller.decrement();
      }

      if (type === "minutes") {
        // ARROW UP
        if (keyMaps.arrowUp.includes(e.key)) minute_controller.increment();
        // ARROW DOWN
        if (keyMaps.arrowDown.includes(e.key)) minute_controller.decrement();
      }

      // ESC
      if (keyMaps.escape.includes(e.key)) closeTimeDropdown();
    }

    function handleWheel(deltaY: number, type: "hours" | "minutes") {
      if (disabled || readOnly) return;

      const increment = deltaY < 0;

      if (type === "hours") {
        if (increment) {
          hours_controller.increment();
        } else {
          hours_controller.decrement();
        }
      }

      if (type === "minutes") {
        if (increment) {
          minute_controller.increment();
        } else {
          minute_controller.decrement();
        }
      }
    }

    /**
     * Avoid infinite render loop
     */
    const handleWheelThrottled = throttle(handleWheel, 10, {
      leading: false,
      trailing: true,
    });

    /**
     * Handles `hours` increment/decrement.
     *
     * supports infinite loop
     */
    const hours_controller = {
      firstValue: hours[0],
      get index() {
        let _h = h;

        if (meridian && _h !== "") _h = `${Number(_h) % 12 || 12}`;

        return hours.indexOf(_h);
      },
      increment() {
        const { index, firstValue } = this;

        let nextValue = firstValue;

        if (index !== -1) {
          const nextIndex = (index + 1) % hours.length;
          const computedH = meridian
            ? convert12HourFormatTo24(hours[nextIndex], internalMeridian)
            : hours[nextIndex];

          nextValue = computedH;
        }

        handleSetH(nextValue);
        setTimeout(() => hoursInputRef.current?.select());

        log("hours_controller.increment()", { h: nextValue });
      },
      decrement() {
        const { index, firstValue } = this;

        let nextValue = firstValue;

        if (index !== -1) {
          const infiniteIndex = index - 1 < 0 ? hours.length : index;
          const nextIndex = infiniteIndex - 1;
          const computedH = meridian
            ? convert12HourFormatTo24(hours[nextIndex], internalMeridian)
            : hours[nextIndex];

          nextValue = computedH;
        }

        handleSetH(nextValue);
        setTimeout(() => hoursInputRef.current?.select());

        log("hours_controller.decrement()", { h: nextValue });
      },
    };

    /**
     * Handles `minutes` increment/decrement.
     *
     * supports infinite loop
     */
    const minute_controller = {
      index: minutes.indexOf(m),
      firstValue: minutes[0],
      increment() {
        const { index, firstValue } = this;

        let nextValue = firstValue;

        if (index !== -1) {
          const nextIndex = (index + 1) % minutes.length;

          nextValue = minutes[nextIndex];
        }

        handleSetM(nextValue);
        setTimeout(() => minutesInputRef.current?.select());

        log("minute_controller.increment()", { m: nextValue });
      },
      decrement() {
        const { index, firstValue } = this;

        let nextValue = firstValue;

        if (index !== -1) {
          const infiniteIndex = index - 1 < 0 ? minutes.length : index;
          const nextIndex = infiniteIndex - 1;

          nextValue = minutes[nextIndex];
        }

        handleSetM(nextValue);
        setTimeout(() => minutesInputRef.current?.select());

        log("minute_controller.decrement()", { m: nextValue });
      },
    };

    log({ value, h, m, draftH, draftM, timezoneOffset });

    return (
      <Wrapper
        small={small}
        meridian={meridian}
        disabled={disabled}
        readOnly={readOnly}
      >
        <TimeSelect
          ref={timeRef}
          open={open}
          meridian={meridian}
          onClick={toggleTimeDropdown}
          error={error}
        >
          <Flex align={(a) => a.center} flex={1}>
            <Input
              ref={hoursInputRef}
              placeholder={meridian ? `-` : `--`}
              value={displayHourInputValue()}
              size={meridian ? 1 : 2}
              style={{ width: `${getHourInputWidth()}px` }}
              onClick={(e) => {
                if (disabled || readOnly) return;

                e.stopPropagation();
                openTimeDropdown();
              }}
              onChange={(e) => onHoursInputChange(e.target.value)}
              onFocus={(e) => {
                if (disabled || readOnly) return;

                setHoursInputFocused(true);
                openTimeDropdown();

                if (draftH) e.target.select();
              }}
              onBlur={() => {
                if (disabled || readOnly) return;

                setHoursInputFocused(false);

                if (draftH !== h) setDraftH(h);

                setTimeout(() => {
                  const focused = [
                    hoursInputRef.current,
                    minutesInputRef.current,
                  ].some((node) => document.activeElement?.contains(node));

                  if (!focused) closeTimeDropdown();
                });
              }}
              onKeyDown={(e) => handleKeyPress(e, "hours")}
              onWheel={(e) => handleWheelThrottled(e.deltaY, "hours")}
            />
            <Typography.Paragraph className="time-input__hour-divider">{`:`}</Typography.Paragraph>
            <Input
              ref={minutesInputRef}
              placeholder={`--`}
              value={draftM}
              size={2}
              onClick={(e) => {
                if (disabled || readOnly) return;

                e.stopPropagation();
                openTimeDropdown();
              }}
              onChange={(e) => onMinutesInputChange(e.target.value)}
              onFocus={(e) => {
                if (disabled || readOnly) return;

                setMinutesInputFocused(true);
                openTimeDropdown();

                if (draftM) e.target.select();
              }}
              onBlur={() => {
                if (disabled || readOnly) return;

                setMinutesInputFocused(false);

                if (draftM !== m) setDraftM(m);

                setTimeout(() => {
                  const focused = [
                    hoursInputRef.current,
                    minutesInputRef.current,
                  ].some((node) => document.activeElement?.contains(node));

                  if (!focused) closeTimeDropdown();
                });
              }}
              onKeyDown={(e) => handleKeyPress(e, "minutes")}
              onWheel={(e) => handleWheelThrottled(e.deltaY, "minutes")}
            />
          </Flex>
          <Icon
            className="time-input__toggle-icon"
            svg={Svgs.Clock}
            size={(s) => s.l}
            customSize={small ? 2 : undefined}
            propagate
          />

          {open && (
            <TimeDropdown
              parentRef={timeRef}
              hours={hours}
              minutes={minutes}
              small={small}
              isHourActive={isHourActive}
              isMinuteActive={(value) => value === m}
              onHoursChange={onHoursChange}
              onMinutesChange={onMinutesChange}
              onClose={closeTimeDropdown}
            />
          )}
        </TimeSelect>

        {meridian && (
          <CreatableSelect
            _ref={meridianInputRef}
            className={small ? "creatable-select-small" : undefined}
            placeholder={`--`}
            items={meridianSelectItems}
            value={meridianSelectItems.find(
              (item) => item.value === internalMeridian
            )}
            borderError={error}
            disabled={disabled}
            readOnly={readOnly}
            onValueSelected={(value) => value && onMeridianChange(value)}
            menuPlacement="auto"
            canClear={false}
          />
        )}
      </Wrapper>
    );
  }
);
