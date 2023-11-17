import React, { forwardRef, useRef } from "react";
import { generate } from "shortid";
import { Tooltip } from "../../Tooltip";
import { ColorsX } from "environment";
import { withMemo, mergeRefs } from "helpers";
import { useMemoOnce } from "hooks";
import { InputType } from "types";

import {
  Wrapper,
  HiddenInput,
  Container,
  Text,
  RadioButton,
  RadioButtonCheck,
} from "../../RadioButton/RadioButton.style";

interface Props {
  name: string;
  label: string;
  value: string;
  error?: string;
  tooltip?: string;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  allowUnselect?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
}

const Component = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      value,
      error,
      tooltip,
      checked,
      className,
      disabled,
      allowUnselect,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const id = useMemoOnce(() => `${name}_${value}_${generate()}`);

    const innerRef = useRef<HTMLInputElement>(null);
    const mergedRef = mergeRefs([innerRef, ref]);

    // toggle radio select
    function handleToggle() {
      if (!(innerRef && innerRef.current && allowUnselect && !disabled)) return;

      const element = innerRef.current;

      // `mouseUp` EVENT FIRES BEFORE `onChange` / `onClick` SO WE CAN GET THE PREVIOUS VALUE
      const prevChecked = element.checked;

      // USE TIMEOUT TO DELAY THE `mouseUp` EVENT TO GET THE FINAL CHECKED VALUE
      setTimeout(() => {
        if (prevChecked === element.checked) {
          element.checked = false;
          // trigger onChange event
          element.dispatchEvent(new Event("change"));
          if (onChange) onChange("");
        }
      });
    }

    return (
      <Wrapper disabled={disabled}>
        <HiddenInput
          ref={mergedRef}
          id={id}
          type={InputType.Radio}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(e) => onChange && onChange(e.target.value)}
        />

        <label htmlFor={id} onMouseUp={handleToggle}>
          <Container className={className}>
            <RadioButton>
              <RadioButtonCheck />
            </RadioButton>

            {label && (
              <Text
                data-test-id={label}
                color={error !== undefined ? ColorsX.text.error : undefined}
                data-tip={tooltip}
                data-for={id}
              >
                {label}
              </Text>
            )}
          </Container>
        </label>

        {tooltip !== undefined && <Tooltip id={id} />}
      </Wrapper>
    );
  }
);

export const RadioButtonUncontrolled = withMemo(Component);
