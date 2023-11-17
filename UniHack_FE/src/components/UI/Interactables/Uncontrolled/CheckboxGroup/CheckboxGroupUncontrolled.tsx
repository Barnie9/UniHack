import React, { forwardRef, useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";

import { Flex } from "components/UI/Flex";
import { Input } from "components/UI/Inputs/Input";
import { Typography } from "components/UI/Typography";
import { InputLabel } from "components/UI/Inputs/InputLabel";
import { InputError } from "components/UI/Inputs/InputError";
import { ColorsX } from "environment";
import { withMemo, mergeRefs, loseFocus } from "helpers";
import { usePrevious } from "hooks";
import { InputType } from "types";

import {
  AddNewValue,
  CancelButton,
} from "../RadioGroup/RadioGroupUncontrolled.style";

import {
  Container,
  CheckboxUncontrolled,
  Alignment,
  Wrapper,
  NewValueWrapper,
} from "./CheckboxGroupUncontrolled.style";

interface Option {
  label: string;
  value: string;
  tooltip?: string;
}

interface Props {
  name: string;
  label?: string;
  values?: string[];
  options: Option[];
  error?: string;
  errorCustom?: string;
  borderError?: boolean;
  initialCustomValue?: string;
  initialCustomEnabled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  allowCreate?: boolean;
  tooltipComponent?: React.ReactNode;
  className?: string;
  isVertical?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (values: string[]) => void;
  onChangeCustom?: (value: string) => void;
}

const Component = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      values,
      options,
      error,
      errorCustom,
      borderError,
      initialCustomValue,
      initialCustomEnabled = false,
      disabled,
      readOnly,
      required,
      allowCreate,
      tooltipComponent,
      className,
      isVertical = false,
      onBlur,
      onChange,
      onChangeCustom,
    },
    ref
  ) => {
    const [customEnabled, setCustomEnabled] = useState(initialCustomEnabled);
    const [customValue, setCustomValue] = useState(initialCustomValue ?? "");

    const customInputRef = useRef<HTMLInputElement>(null);

    const mergedCustomInputRef = mergeRefs([customInputRef, ref]);

    // FOCUS CUSTOM VALUE INPUT ON SHOW
    useEffect(() => {
      const element = getCustomInputElement();

      if (!initialCustomEnabled && customEnabled && element) element.focus();
    }, [customEnabled]);

    // cancel custom value when options change
    const prevOptions = usePrevious(options);
    useEffect(() => {
      if (prevOptions !== undefined) {
        const optionsChanged = !isEqual(prevOptions, options);

        if (optionsChanged) cancelCustom();
      }
    }, [options]);

    // SYNC `customEnabled` STATE
    useEffect(() => {
      if (initialCustomEnabled !== customEnabled)
        setCustomEnabled(initialCustomEnabled);
    }, [initialCustomEnabled]);

    // SYNC `customValue` STATE
    useEffect(() => {
      if (initialCustomValue !== customValue)
        setCustomValue(initialCustomValue ?? "");
    }, [initialCustomValue]);

    // CONTROLLED STATE - RETURN ARRAY OF VALUES
    function onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!(values && onChange)) return;

      const { value, checked } = e.target;

      let newValues = [...values];

      if (checked) {
        newValues.push(value);
      } else {
        newValues = newValues.filter((v) => v !== value);
      }

      onChange(newValues);
    }

    // ON CHANGE
    function onCustomChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      setCustomValue(e.target.value);
      if (onChangeCustom) onChangeCustom(e.target.value);
    }

    // ON BLUR
    function onCustomBlur(
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      const isCustomValueEmpty = !e.target.value.trim().length;

      if (isCustomValueEmpty) resetCustom();
    }

    function addCustom() {
      setCustomValue("");
      setCustomEnabled(true);
    }

    function cancelCustom() {
      setCustomValue("");
      setCustomEnabled(false);
    }

    function resetCustom() {
      cancelCustom();
      resetCustomInput();
      if (onChangeCustom) onChangeCustom("");
    }

    // ======== START ========
    // HIDDEN INPUT FUNCTIONS
    // =======================

    function resetCustomInput() {
      const element = getCustomInputElement();

      if (element) {
        element.value = "";
        element.focus();
      }
    }

    // get custom input Element from ref
    function getCustomInputElement() {
      return customInputRef && customInputRef.current;
    }

    // =======================
    // HIDDEN INPUT FUNCTIONS
    // ========= END =========

    return (
      <Container className={className}>
        <Flex align={(a) => a.center} marginOffset={!!label && { bottom: 1.6 }}>
          <InputLabel
            disabled={disabled}
            required={required}
            label={label}
            marginBottom={0}
          />
          {tooltipComponent && tooltipComponent}
        </Flex>

        <Alignment isVertical={isVertical}>
          {options.length ? (
            options.map((item, index) => (
              <Wrapper key={`checkbox-group-${label}-button-${index}`}>
                <CheckboxUncontrolled
                  ref={ref}
                  name={name}
                  label={item.label}
                  value={item.value}
                  tooltip={item.tooltip}
                  checked={values ? values.includes(item.value) : undefined}
                  disabled={disabled}
                  onBlur={onBlur}
                  onChange={values ? onCheckboxChange : undefined}
                  error={
                    borderError && values?.includes(item.value) ? "" : undefined
                  }
                  insideGroup
                />
              </Wrapper>
            ))
          ) : (
            <Typography.Paragraph
              marginOffset={{ right: 0.8 }}
              color={ColorsX.text.disabled}
            >
              No choices available
            </Typography.Paragraph>
          )}

          {!disabled && !readOnly && allowCreate && (
            <>
              {customEnabled && (
                <NewValueWrapper>
                  <Input
                    id={
                      label ? label.replace(/ /g, "") : "add_new_value_" + label
                    }
                    ref={mergedCustomInputRef}
                    name={name}
                    defaultValue={customValue}
                    type={InputType.Text}
                    placeholder={"Add new value"}
                    error={errorCustom}
                    onChange={onCustomChange}
                    onBlur={onCustomBlur}
                    onSubmit={loseFocus}
                  />
                  <CancelButton onClick={resetCustom}>Cancel</CancelButton>
                </NewValueWrapper>
              )}

              {!customEnabled && (
                <AddNewValue
                  disabled={disabled}
                  onClick={!disabled ? addCustom : undefined}
                >
                  <Typography.Paragraph color={ColorsX.primary.normal}>
                    New value
                  </Typography.Paragraph>
                </AddNewValue>
              )}
            </>
          )}
        </Alignment>

        {!customEnabled && <InputError error={error} />}
      </Container>
    );
  }
);

export const CheckboxGroupUncontrolled = withMemo(Component, [
  "name",
  "label",
  "values",
  "options",
  "error",
  "errorCustom",
  "borderError",
  "initialCustomValue",
  "initialCustomEnabled",
  "disabled",
  "readOnly",
  "required",
  "allowCreate",
  "isVertical",
]);
