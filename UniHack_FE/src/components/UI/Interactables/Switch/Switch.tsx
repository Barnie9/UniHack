import React from "react";

import { Asterisk } from "components/UI/Asterisk";
import { Flex } from "components/UI/Flex";
import { Typography } from "components/UI/Typography";
import { ColorsX } from "environment";
import { SpacingOffsets } from "types";

import { Container, Slider, SliderContainer } from "./Switch.style";

interface Props extends SpacingOffsets {
  label?: string;
  description?: string;
  on?: boolean;
  className?: string;
  size?: number;
  disabled?: boolean;
  dataTestId?: string;
  reverse?: boolean;
  required?: boolean;
  propagate?: boolean;
  onChange?: () => void;
}

export function Switch({
  label,
  description,
  on,
  className,
  size = 2.4,
  disabled,
  dataTestId,
  reverse,
  required,
  propagate,
  onChange,
  //
  marginOffset,
  paddingOffset,
}: Props) {
  function onClickHandler(e: React.MouseEvent) {
    handlePropagation(e);

    if (disabled) return;

    if (onChange) onChange();
  }

  function handlePropagation(e: React.MouseEvent) {
    if (!propagate) e.stopPropagation();
  }

  const color = disabled ? ColorsX.text.disabled : ColorsX.text.main;

  return (
    <Container
      marginOffset={marginOffset}
      paddingOffset={paddingOffset}
      disabled={disabled}
      onClick={onClickHandler}
      reverse={reverse}
      className={className}
      data-test-id={dataTestId}
      id={`switch_${dataTestId}`}
    >
      <SliderContainer size={size}>
        <Slider disabled={disabled} checked={on} size={size} />
      </SliderContainer>

      {label && (
        <Flex className="switch-label-container" column>
          <Typography.Paragraph color={color} marginOffset={{ y: 0.1 }}>
            {label}
            {required && <Asterisk paddingLeft />}
          </Typography.Paragraph>

          {description && (
            <Typography.Caption multiline>{description}</Typography.Caption>
          )}
        </Flex>
      )}
    </Container>
  );
}
