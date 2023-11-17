import React, { forwardRef } from "react";
import { generate } from "shortid";

import { Typography } from "components/UI/Typography";
import { Tooltip } from "../../Tooltip";
import { ColorsX, Svgs } from "environment";
import { withMemo } from "helpers";
import { useMemoOnce } from "hooks";
import { InputType } from "types";

import {
  Checkbox,
  CheckIcon,
  Container,
  Wrapper,
  HiddenInput,
  CheckboxWrapper,
} from "../../Checkbox/Checkbox.style";

interface Props {
  name: string;
  label: string;
  value: string;
  error?: string;
  tooltip?: string;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  insideGroup?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      insideGroup,
      onBlur,
      onChange,
    },
    ref
  ) => {
    const id = useMemoOnce(() => `${name}_${value}_${generate()}`);

    // TRIGGER BLUR SO FORM SENSES A CHANGE WHEN GOING FROM CHECKED TO UNCHECKED STATE
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { checked } = e.target;

      if (!checked) e.target.blur();
    }

    return (
      <Wrapper disabled={disabled}>
        <HiddenInput
          ref={ref}
          id={id}
          type={InputType.Checkbox}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange ?? handleOnChange}
        />

        {/*
					THIS 2ND HIDDEN INPUT SERVES THE PURPOSE OF
					HAVING AT ALL TIMES AN INITIAL VALUE OF STRING ARRAY,
					OTHERWISE THE CHECKBOX WILL AUTOMATICALLY CAST TO THE FIRST VALUE
					AS STRING AND DESTROY THE INIITAL VALUES OF EMPTY ARRAY GIVEN TO THE FORM
				 */}
        {insideGroup && (
          <HiddenInput ref={ref} type={InputType.Checkbox} name={name} />
        )}

        <label htmlFor={id}>
          <Container disabled={disabled} className={className}>
            <CheckboxWrapper>
              <Checkbox>
                <CheckIcon
                  customSize={1.1}
                  svg={Svgs.Checkmark}
                  colors={{ color: ColorsX.white }}
                />
              </Checkbox>
            </CheckboxWrapper>

            {label && (
              <Typography.Paragraph
                data-test-id={label + "_checkbox"}
                marginOffset={{ top: 0.2, left: 0.8 }}
                color={error !== undefined ? ColorsX.text.error : undefined}
                data-tip={tooltip}
                data-for={id}
              >
                {label}
              </Typography.Paragraph>
            )}
          </Container>
        </label>

        {tooltip !== undefined && <Tooltip id={id} />}
      </Wrapper>
    );
  }
);

export const CheckboxUncontrolled = withMemo(Component);
