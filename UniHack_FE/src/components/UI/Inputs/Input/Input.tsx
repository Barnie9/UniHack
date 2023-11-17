import React, { forwardRef, useRef } from "react";

import { withMemo, mergeRefs, loseFocus } from "helpers";
import { InputType, HTMLInput, SpacingOffsets } from "types";

import { DateInput } from "../DateInput";
import { InputLabel } from "../InputLabel";
import { InputError } from "../InputError";

import { Container, RegularInput, Row } from "./Input.style";
import { Flex } from "components/UI/Flex";
import { Typography } from "components/UI/Typography";
import { keyMaps } from "consts";

interface Props extends SpacingOffsets {
  type: InputType;
  value?: string | number;
  minValue?: number;
  maxValue?: number;
  defaultValue?: string | number;
  label?: string;
  hint?: string;
  placeholder?: string;
  error?: string;
  borderError?: boolean;
  rows?: number;
  name?: string;
  center?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: "off";
  autoFocus?: boolean;
  tooltipComponent?: React.ReactNode;
  className?: string;
  overflow?: boolean;
  dateFormat?: string;
  dateDisplayFormat?: string;
  canClearDate?: boolean;
  openDateDownwards?: boolean;
  title?: string;
  id?: string;
  onSubmit?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInput>) => void;
  onDateChange?: ({
    formattedDate,
    date,
  }: {
    formattedDate: string;
    date: Date | null;
  }) => void;
  onFocus?: (e: React.FocusEvent<HTMLInput>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInput>) => void;
  onCancel?: () => void;
}

const Component = forwardRef<HTMLInput, Props>(
  (
    {
      type,
      value,
      minValue,
      maxValue,
      defaultValue,
      name,
      label,
      hint,
      placeholder,
      error,
      borderError,
      rows,
      center,
      disabled,
      readOnly,
      required,
      autoComplete,
      autoFocus,
      tooltipComponent,
      dateFormat,
      dateDisplayFormat,
      canClearDate,
      className,
      openDateDownwards,
      title,
      id,
      onSubmit,
      onChange,
      onDateChange,
      onFocus,
      onBlur,
      onCancel,
      // SPACING OFFSETS
      paddingOffset,
      marginOffset,
    },
    ref
  ) => {
    const isDateInput = type === InputType.Date;
    const isTextareaInput = type === InputType.Textarea;
    const isRegularInput = [
      InputType.Email,
      InputType.Number,
      InputType.Password,
      InputType.Text,
    ].includes(type);

    const innerRef = useRef<HTMLInput>(null);

    const mergedRef = mergeRefs([innerRef, ref]);

    function handleStopPropagation(e: React.MouseEvent) {
      e.stopPropagation();
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInput>) {
      // CMD + ENTER - SUBMIT (USED FOR TEXTAREA)
      if (keyMaps.enter.includes(e.key) && e.metaKey) {
        if (onSubmit) {
          e.preventDefault();
          e.stopPropagation();

          return onSubmit();
        }

        if (innerRef.current && innerRef.current.form) {
          const parentForm = innerRef.current.form;

          const buttonElement = document.createElement("button");

          buttonElement.setAttribute("type", "submit");
          buttonElement.setAttribute(
            "style",
            "visibility: none; height: 0; width: 0;"
          );

          parentForm.append(buttonElement);

          buttonElement.click();
          buttonElement.remove();
        }

        return;
      }

      // ENTER - SUBMIT
      if (keyMaps.enter.includes(e.key)) {
        if (isTextareaInput) return;

        if (onSubmit) {
          e.preventDefault();
          e.stopPropagation();

          onSubmit();
        }
      }
      // ESC - LOSE FOCUS
      if (keyMaps.escape.includes(e.key)) {
        if (onCancel) onCancel();

        e.preventDefault();
        e.stopPropagation();

        loseFocus();
      }
    }

    const errored = !!error || borderError;

    return (
      <Container
        className={className}
        marginOffset={marginOffset}
        paddingOffset={paddingOffset}
      >
        <Flex align={(a) => a.center}>
          <InputLabel disabled={disabled} required={required} label={label} />
          {tooltipComponent && tooltipComponent}
        </Flex>

        <Row className={`test_${label?.replaceAll(" ", "").toLowerCase()}`}>
          {isDateInput && (
            <DateInput
              ref={mergedRef}
              name={name}
              id={id}
              value={value as string}
              disabled={disabled}
              readOnly={readOnly}
              error={errored}
              dateFormat={dateFormat}
              dateDisplayFormat={dateDisplayFormat}
              onDateChange={onDateChange}
              onFocus={onFocus}
              onBlur={onBlur}
              canClearDate={canClearDate}
              openDownwards={openDateDownwards}
            />
          )}

          {isRegularInput && (
            <RegularInput
              ref={mergedRef}
              type={type}
              name={name}
              id={id}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={disabled}
              min={minValue}
              max={maxValue}
              readOnly={readOnly}
              tabIndex={readOnly ? -1 : undefined}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              error={errored}
              center={center}
              title={title}
              onClick={handleStopPropagation}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          )}
        </Row>

        {hint !== undefined && (
          <Typography.Hint marginOffset={{ top: 0.2 }}>{hint}</Typography.Hint>
        )}

        <InputError error={error} id={`${name}_error`} />
      </Container>
    );
  }
);

export const Input = withMemo(Component, [
  "value",
  "defaultValue",
  "label",
  "placeholder",
  "error",
  "borderError",
  "disabled",
  "readOnly",
  "rows",
  "onChange",
  "onDateChange",
  "onFocus",
  "onBlur",
  "onSubmit",
  "id",
]);
