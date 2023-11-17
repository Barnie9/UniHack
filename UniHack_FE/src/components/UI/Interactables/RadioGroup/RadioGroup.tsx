import React from "react";
import { Flex } from "components/UI/Flex";
import { Typography } from "components/UI/Typography";
import { InputLabel } from "components/UI/Inputs/InputLabel";
import { InputError } from "components/UI/Inputs/InputError";
import { withMemo } from "helpers";

import { Container, RadioButton, Alignment, Wrapper } from "./RadioGroup.style";

interface Props {
  items: string[];
  name?: string;
  label?: string;
  error?: string;
  selected?: string;
  disabled?: boolean;
  required?: boolean;
  allowUnselect?: boolean;
  tooltipComponent?: React.ReactNode;
  className?: string;
  isVertical?: boolean;
  onSelect: (item: string) => void;
}

function Component({
  items,
  label,
  error,
  selected,
  disabled,
  required,
  allowUnselect,
  tooltipComponent,
  className,
  isVertical = false,
  onSelect,
}: Props) {
  function handleSelect(item: string) {
    onSelect(allowUnselect ? (item !== selected ? item : "") : item);
  }

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
        {items.length ? (
          items.map((item, index) => (
            <Wrapper key={`radio-group-${label}-button-${index}`}>
              <RadioButton
                className="radio-group-button"
                label={item}
                selected={item === selected}
                disabled={disabled}
                onSelect={() => handleSelect(item)}
              />
            </Wrapper>
          ))
        ) : (
          <Wrapper>
            <Typography.Paragraph>No choices available</Typography.Paragraph>
          </Wrapper>
        )}
      </Alignment>

      <InputError error={error} />
    </Container>
  );
}

export const RadioGroup = withMemo(Component);
