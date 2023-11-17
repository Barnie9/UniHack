import React from "react";
import {
  Container,
  Text,
  RadioButton as RadioButtonBody,
  RadioButtonCheck,
} from "./RadioButton.style";

interface Props {
  selected: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  onSelect: () => void;
}

export function RadioButton({
  label,
  selected,
  disabled,
  className,
  onSelect,
}: Props) {
  function onClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!disabled) {
      onSelect();
    }
  }

  return (
    <Container
      selected={selected}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      <RadioButtonBody>{selected && <RadioButtonCheck />}</RadioButtonBody>

      {label && (
        <Text title={label} id={label?.replaceAll(" ", "").toLowerCase()}>
          {label}
        </Text>
      )}
    </Container>
  );
}
