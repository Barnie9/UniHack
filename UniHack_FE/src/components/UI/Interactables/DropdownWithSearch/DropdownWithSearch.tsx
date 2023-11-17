import React, { useState } from "react";
import Select from "react-select";

import { Icon } from "components/UI/Icons";
import { DropdownToggle } from "components/UI/Dropdown/DropdownToggle";
import { Svgs } from "environment";
import { Colors } from "environment";

import { Container, Menu } from "./DropdownWithSearch.style";

function DropdownIndicator() {
  return <Icon svg={Svgs.Search} />;
}

interface TimeValue {
  value: string;
  label: string;
}

interface Props {
  title?: string;
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  items: TimeValue[];
  width?: number;
  disabled?: boolean;
  maxMenuHeight?: number;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onSelect: (item: TimeValue) => void;
}

export function DropdownWithSearch({
  title,
  label,
  placeholder,
  items,
  error,
  required,
  disabled,
  maxMenuHeight = 180,
  className,
  onBlur,
  onFocus,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<TimeValue>();

  const selectStyles = {
    container: () => ({ fontSize: "1.6rem" }),
    menu: () => ({ borderStyle: "none" }),
    control: (baseStyle: any, { isFocused }: any) => ({
      ...baseStyle,
      margin: 8,
      borderColor: isFocused ? Colors.gray.lightest : "white",
      boxShadow: isFocused ? "none" : null,
      ":hover": {
        boxShadow: "none",
      },
    }),
    option: (baseStyle: any, { isSelected }: any) => ({
      ...baseStyle,
      padding: "1.15rem 1.2rem",
      backgroundColor: isSelected ? Colors.gray.lightest : null,
      color: Colors.black,
      ":hover": {
        backgroundColor: Colors.gray.lightest,
      },
    }),
  };

  function onSelectChange(value: any) {
    setIsOpen(!isOpen);
    setValue(value);
    onSelect(value);
  }

  return (
    <Container className={className}>
      <DropdownToggle
        open={isOpen}
        title={title}
        error={error}
        label={label}
        toggle={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
        required={required}
      />
      {isOpen && (
        <Menu>
          <Select
            menuPlacement="auto"
            components={{
              DropdownIndicator,
              IndicatorSeparator: null,
            }}
            onChange={onSelectChange}
            options={items}
            styles={selectStyles}
            value={value}
            placeholder={placeholder}
            maxMenuHeight={maxMenuHeight}
            onBlur={onBlur}
            onFocus={onFocus}
            menuIsOpen={isOpen}
            onMenuClose={() => setIsOpen(false)}
            menuShouldScrollIntoView
            autoFocus
          />
        </Menu>
      )}
    </Container>
  );
}
