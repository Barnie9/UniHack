import React from "react";
import { Typography } from "components/UI/Typography";
import { Flex } from "components/UI/Flex";
import { Asterisk } from "components/UI/Asterisk";
import { ColorsX, Svgs } from "environment";
import { SpacingOffsets } from "types";

import {
  Container,
  CheckboxWrapper,
  Checkbox as StyledCheckbox,
  CheckIcon,
} from "./Checkbox.style";

interface Props extends SpacingOffsets {
  label?: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  tooltipComponent?: React.ReactNode;
  isInList?: boolean;
  partial?: boolean;
  required?: boolean;
  onClick: () => void;
}

export function Checkbox({
  label,
  description,
  checked = false,
  disabled,
  className,
  tooltipComponent,
  isInList = false,
  partial,
  required,
  marginOffset,
  paddingOffset,
  onClick,
}: Props) {
  function onClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    if (!disabled) onClick();
  }

  const isChecked = partial || checked;

  const formattedClassName = [className, isChecked ? "checked" : ""].join(" ");

  const color = disabled ? ColorsX.text.disabled : ColorsX.text.main;

  return (
    <Container
      isInList={isInList}
      disabled={disabled}
      onClick={onClickHandler}
      className={formattedClassName}
      checked={isChecked}
      id={`checkbox_${label?.replaceAll(" ", "").toLowerCase()}`}
      marginOffset={marginOffset}
      paddingOffset={paddingOffset}
    >
      <CheckboxWrapper>
        <StyledCheckbox checked={isChecked}>
          <CheckIcon
            propagate
            customSize={partial ? 1.4 : 1.1}
            svg={partial ? Svgs.Minus : Svgs.Checkmark}
            colors={{ color: ColorsX.white }}
          />
        </StyledCheckbox>
      </CheckboxWrapper>

      {label && (
        <Flex marginOffset={{ left: 0.4, top: 0.1 }} column>
          <Typography.Paragraph color={color} marginOffset={{ y: 0.1 }}>
            {label}
            {required && <Asterisk paddingLeft />}
          </Typography.Paragraph>

          {description && (
            <Typography.Caption multiline>{description}</Typography.Caption>
          )}
        </Flex>
      )}

      {tooltipComponent}
    </Container>
  );
}
