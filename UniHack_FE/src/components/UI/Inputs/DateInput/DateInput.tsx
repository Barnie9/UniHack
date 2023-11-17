import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { parseISO } from "date-fns";
import format from "date-fns/format";

import { Icon } from "components/UI/Icons";
import { DATE_FORMAT, PICKER_DATE_FORMAT } from "consts";
import { mergeRefs } from "helpers";
import { useEffectOnce } from "hooks";
import { Svgs, ColorsX } from "environment";

import { DatePicker, HiddenInput } from "./DateInput.style";

interface Props {
  value?: string;
  name?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  dateFormat?: string;
  dateDisplayFormat?: string;
  canClearDate?: boolean;
  openDownwards?: boolean;
  onDateChange?: ({
    formattedDate,
    date,
  }: {
    formattedDate: string;
    date: Date | null;
  }) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const DateInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      name,
      className,
      id,
      disabled,
      readOnly,
      error,
      dateFormat = DATE_FORMAT,
      dateDisplayFormat = PICKER_DATE_FORMAT,
      canClearDate = true,
      openDownwards,
      onBlur,
      onFocus,
      onDateChange,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<Date | null>(null);
    const isUncontrolled = value === undefined;

    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs([hiddenInputRef, ref]);
    const iconRef = useRef<HTMLInputElement>(null);

    /**
     * Expose `open` function to the parent through `ref`
     */
    // @ts-ignore
    useImperativeHandle(ref, () => ({
      ...ref,
      open: () => {
        iconRef.current?.click();
      },
    }));

    useEffectOnce(() => {
      const yearInput = document.querySelector(
        "input.react-date-picker__inputGroup__input[name=year]"
      );
      if (yearInput) yearInput.setAttribute("max", "9999");
    });

    // set initial uncontrolled value if any
    useEffect(() => {
      if (isUncontrolled && hiddenInputRef && hiddenInputRef.current) {
        const value = hiddenInputRef.current.valueAsDate;
        setInternalValue(value);
      }
    }, [hiddenInputRef]);

    useEffect(() => {
      if (open && hiddenInputRef && hiddenInputRef.current) {
        hiddenInputRef.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }, [open]);

    // get hidden input Element from ref
    function getHiddenInputElement() {
      return hiddenInputRef && hiddenInputRef.current;
    }

    function onChange(date: Date | null) {
      if (disabled || readOnly) return;

      const formattedDate = date ? format(date, dateFormat) : "";

      const element = getHiddenInputElement();
      if (element) {
        element.value = formattedDate;

        if (!date) element.dispatchEvent(new Event("blur"));
      }

      if (onDateChange) onDateChange({ formattedDate, date });
      if (isUncontrolled) setInternalValue(date);
    }

    function onCalendarOpen() {
      setOpen(true);

      // keep vanilla date input (HiddenInput) in sync and dispatch real `onFocus` event
      const element = getHiddenInputElement();
      if (element) element.dispatchEvent(new Event("focus"));
    }

    function onCalendarClose() {
      setOpen(false);

      // keep vanilla date input (HiddenInput) in sync and dispatch real `onBlur` event
      const element = getHiddenInputElement();
      if (element) element.dispatchEvent(new Event("blur"));
    }

    const date = useMemo(() => {
      if (value) {
        // prevent an app crash if not a valid date `value` is provided, PRJCTS-2233
        const ret = parseISO(value);
        return !isNaN(ret as any) ? ret : null;
      }
      return null;
    }, [value]);

    const valueToShow = isUncontrolled ? internalValue : date;

    return (
      <>
        <HiddenInput
          ref={mergedRef}
          type="date"
          name={name}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <DatePicker
          id={id}
          open={open}
          value={valueToShow}
          format={dateDisplayFormat}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          error={error}
          calendarIcon={<Icon ref={iconRef} svg={Svgs.Calendar} propagate />}
          clearIcon={
            canClearDate && valueToShow ? (
              <Icon
                svg={Svgs.Clear}
                size={(s) => s.m}
                colors={{ color: ColorsX.text.disabled }}
                propagate
              />
            ) : null
          }
          prevLabel={<Icon svg={Svgs.ChevronLeft} propagate />}
          prev2Label={<Icon svg={Svgs.ChevronLeftDouble} propagate />}
          nextLabel={<Icon svg={Svgs.ChevronRight} propagate />}
          next2Label={<Icon svg={Svgs.ChevronRightDouble} propagate />}
          onChange={onChange}
          onCalendarOpen={onCalendarOpen}
          onCalendarClose={onCalendarClose}
          openDownwards={openDownwards}
          showLeadingZeros
        />
      </>
    );
  }
);
