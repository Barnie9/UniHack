import React, { useEffect, useRef } from "react";

import { DATE_FORMAT, PICKER_DATE_FORMAT } from "consts";
import { debuggerLog } from "helpers";
import {
  useStatic,
  useSelector,
  usePrevious,
  useOutsideClick,
  useRender,
} from "hooks";

import { convertToUTCTime, getDateTime } from "./helpers";

import { TimeInput } from "../TimeInput";
import { DateInput } from "../DateInput";
import { InputLabel } from "../InputLabel";
import { InputError } from "../InputError";

import { Wrapper, Row, Container } from "./DateTimeInput.style";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  options?: Options;
}

interface Options {
  name?: string;
  label?: string;
  error?: string;
  hint?: string;
  small?: boolean;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  readOnlyController?: boolean;
  required?: boolean;
  canClearDate?: boolean;
  openDownwards?: boolean;
  tooltipComponent?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onReadOnly?: () => void;
}

export function DateTimeInput({ value, onChange, options }: Props) {
  // SET TO `true` TO SEE THE LOGS
  const DEBUGGER = false;
  const log = debuggerLog(DEBUGGER);

  const containerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<{
    open(): void;
  }>(null);
  const timeInputRef = useRef<{
    safeTimestamp(): void;
    open(): void;
    reset(): void;
  }>(null);

  const meridian = true;

  const [internalDate, setInternalDate] = useStatic(
    value ? getDateTime(value).date : ""
  );
  const [internalTime, setInternalTime] = useStatic(
    value ? getDateTime(value).time : ""
  );

  const [_, triggerRender] = useRender();

  const errored = options?.error ? !!options.error : false;

  // sync `internalDate`, `internalTime` states
  const prevValue = usePrevious(value);
  const prevMeridian = usePrevious(meridian);
  useEffect(() => {
    if (
      (prevValue !== undefined && prevValue !== value) ||
      (prevMeridian !== undefined && prevMeridian !== meridian)
    ) {
      if (value) {
        const { date, time } = getDateTime(value);

        log("sync `internalDate`, `internalTime` states: getDateTime()", {
          date,
          time,
        });

        setInternalDate(date);
        setInternalTime(time);
      } else {
        setInternalDate("");
        setInternalTime("");
      }

      triggerRender();
    }
  }, [value]);

  function onDateChange({
    formattedDate,
    date,
  }: {
    formattedDate: string;
    date: Date | null;
  }) {
    log("onDateChange()", { formattedDate, date });

    if (options?.readOnlyController && options?.onReadOnly) {
      options.onReadOnly();
      return;
    }

    if (!date) {
      onChange?.("");
      setInternalDate("");
      setInternalTime("");
      triggerRender();

      return;
    }

    setInternalDate(formattedDate);

    if (internalTime() && formattedDate !== "" && onChange) {
      const d = internalDate();
      const t = internalTime();

      const newValue = convertToUTCTime(`${d}T${t}`);

      onChange(newValue);
    }

    /**
     * Sets the current timestamp if no custom time was selected
     */
    timeInputRef.current?.safeTimestamp();

    /**
     * Open the time input dropdown + focus => better UX
     */
    if (!internalTime()) timeInputRef.current?.open();

    triggerRender();
  }

  function onTimeChange(value: string) {
    log("onTimeChange()", { value });

    if (options?.readOnlyController && options?.onReadOnly) {
      options.onReadOnly();
      return;
    }

    setInternalTime(value);

    if (internalDate() && internalDate() !== "" && onChange) {
      const d = internalDate();
      const t = internalTime();

      const newValue = convertToUTCTime(`${d}T${t}`);

      onChange(newValue);
    }

    /**
     * Open the date input dropdown + focus => better UX
     */
    if (!internalDate()) dateInputRef.current?.open();

    triggerRender();
  }

  useOutsideClick(() => {
    const valid = internalDate().length > 0 && internalTime().length > 0;

    if (!valid) {
      if (internalDate()) {
        setInternalDate("");
        triggerRender();
      }
      setInternalTime("");
      timeInputRef.current?.reset();
    }
  }, [containerRef]);

  return (
    <Container ref={containerRef} className={options?.className}>
      <Row>
        <InputLabel
          disabled={options?.disabled}
          required={options?.required}
          label={options?.label}
        />
        {options?.tooltipComponent && options?.tooltipComponent}
      </Row>
      <Wrapper
        className={options?.small ? "date-input-small" : ""}
        stacked={options?.small || meridian}
      >
        <DateInput
          // @ts-ignore
          ref={dateInputRef}
          value={internalDate()}
          disabled={options?.disabled}
          readOnly={options?.readOnly}
          id={options?.label?.replaceAll(" ", "").toLowerCase()}
          error={errored}
          dateFormat={DATE_FORMAT}
          dateDisplayFormat={PICKER_DATE_FORMAT}
          onDateChange={onDateChange}
          onFocus={options?.onFocus}
          onBlur={options?.onBlur}
          canClearDate={options?.canClearDate}
          openDownwards={options?.openDownwards}
        />
        <TimeInput
          ref={timeInputRef}
          value={internalTime()}
          meridian={meridian}
          small={options?.small}
          error={errored}
          disabled={options?.disabled}
          readOnly={options?.readOnly}
          readOnlyController={options?.readOnlyController}
          containerRef={containerRef}
          dateInput={{
            value: internalDate(),
            ref: dateInputRef,
          }}
          onChange={onTimeChange}
          onReadOnly={options?.onReadOnly}
        />
      </Wrapper>
      <InputError error={options?.error} id={`${options?.name}_error`} />
    </Container>
  );
}
