import React, { useEffect } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Typography } from "components/UI/Typography";
import { Flex } from "components/UI/Flex";
import { InputLabel } from "components/UI/Inputs/InputLabel";
import { InputError } from "components/UI/Inputs/InputError";
import { Nullable } from "types";

import { Container, Alignment, Wrapper } from "./CheckboxGroup.style";

interface Item {
  label: string;
  selected: boolean;
}

interface Props {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  items: Item[];
  customItem: Nullable<Item>;
  tooltipComponent?: React.ReactNode;
  isVertical?: boolean;
  error?: string;
  className?: string;
  onSelect: (item: number) => void;
  onChangeValidity?: (valid: boolean) => void;
}

// TODO: make `CheckboxGroupUncontrolled` official
export function CheckboxGroup({
  items,
  label,
  disabled,
  customItem,
  required = false,
  tooltipComponent,
  isVertical = false,
  error,
  className,
  onSelect,
  onChangeValidity,
}: Props) {
  const customItemHasLabel = !!customItem?.label.length;

  const isCustomSelected = !!customItem?.selected;

  useEffect(() => {
    if (onChangeValidity) {
      const isValid = !isCustomSelected || customItemHasLabel;
      onChangeValidity(isValid);
    }
  }, [isCustomSelected, customItemHasLabel]);

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
            <Wrapper key={`radio-group-${item.label}-button-${item.selected}`}>
              <Checkbox
                isInList
                label={item.label}
                checked={item.selected}
                disabled={disabled}
                onClick={() => onSelect(index)}
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
