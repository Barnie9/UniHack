import React, { RefObject, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";
import Select, {
  ClearIndicatorProps,
  components,
  createFilter,
  DropdownIndicatorProps,
  MenuListProps,
  MenuPlacement,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import SelectWithCreate from "react-select/creatable";

import { Flex } from "components/UI/Flex";
import { Icon } from "components/UI/Icons";
import { Typography } from "components/UI/Typography";
import { InputError } from "components/UI/Inputs/InputError";
import { InputLabel } from "components/UI/Inputs/InputLabel";
import { ColorsX, Svgs } from "environment";
import { withMemo } from "helpers";
import { Nullable, SelectItem, SelectItemOrGroup } from "types";

import {
  AutoScrollWrapper,
  Container,
  SearchValueContainer,
  SelectContainer,
} from "./CreatableSelect.style";

enum CreatableSelectType {
  Dropdown,
  Search,
}

interface Props {
  _ref?: RefObject<HTMLInputElement>;
  label?: string;
  value?: SelectItem | null;
  defaultCustomValue?: string;
  values?: SelectItem[];
  items: SelectItemOrGroup[];
  className?: string;
  placeholder?: string;
  name?: string;
  hint?: string;
  error?: string;
  borderError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  allowCreate?: boolean;
  allowCreateOnlyOne?: boolean;
  scrollIntoView?: boolean;
  canClear?: boolean;
  maxMenuHeight?: number;
  minMenuHeight?: number;
  hasMultipleValues?: boolean;
  tooltipComponent?: React.ReactNode;
  noOptionsMessage?: React.ReactNode;
  autoFocus?: boolean;
  initiallyOpen?: boolean;
  menuPlacement?: MenuPlacement;
  maxItems?: number;
  type?: (type: typeof CreatableSelectType) => CreatableSelectType;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  formatCreateLabel?: (inputValue: string) => string;
  onValueSelected?: (selectedValue: Nullable<string>) => void;
  onValuesSelected?: (selectedValues: string[]) => void;
  onInputChange?: (newValue: string) => void;
  isItemDisabled?: (item: SelectItem) => boolean;
}

function Component({
  _ref,
  label,
  value = null,
  defaultCustomValue,
  values = [],
  items,
  className,
  placeholder,
  name,
  hint,
  error,
  borderError,
  disabled,
  readOnly,
  required,
  formatCreateLabel,
  allowCreate,
  allowCreateOnlyOne = false,
  scrollIntoView,
  canClear = true,
  maxMenuHeight = 220,
  minMenuHeight = 220,
  hasMultipleValues = false,
  tooltipComponent,
  noOptionsMessage,
  autoFocus,
  initiallyOpen,
  menuPlacement,
  maxItems = 100,
  type,
  onBlur,
  onFocus,
  onValueSelected = () => undefined,
  onValuesSelected = () => undefined,
  onInputChange = () => undefined,
  isItemDisabled,
}: Props) {
  // const selectedItemIndex = value ? items.findIndex(item => item?.label === value.label) : null;
  // const selectedValue = selectedItemIndex !== null ? items[selectedItemIndex] : null;

  function onChangeSingle(selected: SelectItem | null) {
    const parsedValue = selected ? (selected as SelectItem).value : null;

    onValueSelected(parsedValue);
  }

  function onChangeMultiple(values: SelectItem[]) {
    const parsedValues = values ? values.map(({ value }) => value) : [];

    onValuesSelected(parsedValues);
  }

  const creatableSelectType = type
    ? type(CreatableSelectType)
    : CreatableSelectType.Dropdown;

  const valueToShow = hasMultipleValues ? values : value;

  const hasCustomValue = values.reduce(
    (acc, value) => acc || !items.find((item) => isEqual(item, value)),
    false
  );

  // ALLOW ONLY ONE CUSTOM VALUE
  allowCreate =
    allowCreate && allowCreateOnlyOne && hasMultipleValues
      ? !hasCustomValue
      : allowCreate;

  const selectProps = {
    ref: _ref,
    isMulti: hasMultipleValues,
    isClearable: canClear,
    onBlur,
    onFocus,
    value: valueToShow,
    defaultValue: valueToShow,
    defaultInputValue: defaultCustomValue,
    name,
    formatCreateLabel,
    className: "select-container",
    classNamePrefix: "select",
    placeholder,
    options: items,
    isSearchable: true,
    onChange: hasMultipleValues ? onChangeMultiple : onChangeSingle,
    maxMenuHeight,
    minMenuHeight: items
      ? items.length >= 5
        ? minMenuHeight
        : 220
      : minMenuHeight,
    blurInputOnSelect: true,
    menuShouldshouldScrollIntoView: false,
    onInputChange,
    noOptionsMessage: noOptionsMessage ? () => noOptionsMessage : undefined,
    autoFocus,
    defaultMenuIsOpen: initiallyOpen,
    isOptionDisabled: isItemDisabled,
    menuPlacement,
    components: {
      ClearIndicator,
      DropdownIndicator: (props: DropdownIndicatorProps) => (
        <DropdownIndicator
          {...props}
          creatableSelectType={creatableSelectType}
        />
      ),
      ...(creatableSelectType === CreatableSelectType.Search && {
        ValueContainer,
      }),
      Option,
      MenuList: (props: MenuListProps) => (
        <MenuList {...props} maxItems={maxItems} />
      ),
    },
    // improve performance
    filterOption: createFilter({
      ignoreAccents: false,
    }),
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (scrollIntoView && isMenuOpen && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isMenuOpen]);

  return (
    <Container className={className}>
      <Flex align={(a) => a.center}>
        <InputLabel disabled={disabled} required={required} label={label} />
        {tooltipComponent && tooltipComponent}
      </Flex>

      <SelectContainer
        error={!!error || !!borderError}
        disabled={disabled}
        readOnly={readOnly}
        hasValue={!!valueToShow}
        allowCreate={allowCreate}
      >
        <AutoScrollWrapper ref={scrollRef}>
          {allowCreate ? (
            // @ts-ignore
            <SelectWithCreate
              {...selectProps}
              onMenuClose={() => setIsMenuOpen(false)}
              onMenuOpen={() => setIsMenuOpen(true)}
            />
          ) : (
            // @ts-ignore
            <Select
              {...selectProps}
              onMenuClose={() => setIsMenuOpen(false)}
              onMenuOpen={() => setIsMenuOpen(true)}
            />
          )}
        </AutoScrollWrapper>
      </SelectContainer>

      {hint !== undefined && (
        <Typography.Hint marginOffset={{ top: 0.2 }}>{hint}</Typography.Hint>
      )}

      <InputError error={error} />
    </Container>
  );
}

function Option(props: OptionProps<SelectItem>) {
  // improve performance
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;

  return <components.Option {...props}>{props.children}</components.Option>;
}

function ClearIndicator(props: ClearIndicatorProps) {
  return (
    <components.ClearIndicator {...props}>
      <Icon
        svg={Svgs.Clear}
        size={(s) => s.m}
        colors={{
          color: ColorsX.text.disabled,
          hover: ColorsX.text.disabled,
        }}
        onClick={() => null}
      />
    </components.ClearIndicator>
  );
}

function ValueContainer({ children, ...props }: ValueContainerProps) {
  return (
    <SearchValueContainer>
      <Icon
        svg={Svgs.Search}
        size={(s) => s.m}
        colors={{ color: ColorsX.text.disabled }}
        marginOffset={{ left: 0.8 }}
      />

      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    </SearchValueContainer>
  );
}

interface CustomDropdownIndicatorProps extends DropdownIndicatorProps {
  creatableSelectType: CreatableSelectType;
}

function DropdownIndicator({
  creatableSelectType,
  ...props
}: CustomDropdownIndicatorProps) {
  return creatableSelectType === CreatableSelectType.Dropdown ? (
    <components.DropdownIndicator {...props}>
      <Icon svg={Svgs.ChevronDown} onClick={() => null} />
    </components.DropdownIndicator>
  ) : (
    <></>
  );
}

/**
 * Limit `MenuList` to 'maxItems' items
 */
function MenuList({
  children,
  maxItems,
  ...props
}: MenuListProps & {
  maxItems: number;
}) {
  const childrenCount = React.Children.count(children);
  const truncatedChildren = React.Children.toArray(children).slice(0, maxItems);
  const hiddenChildren = childrenCount - maxItems;

  return (
    <components.MenuList {...props}>
      {truncatedChildren}

      {childrenCount > maxItems && (
        <Typography.Caption marginOffset={{ top: 0.8, left: 0.8 }}>
          {`Type for more results.. (${hiddenChildren})`}
        </Typography.Caption>
      )}
    </components.MenuList>
  );
}

export const CreatableSelect = withMemo(Component, [
  "items",
  "value",
  "formatCreateLabel",
  "values",
  "label",
  "error",
  "disabled",
  "required",
  "onBlur",
  "onFocus",
  "onValueSelected",
  "onValuesSelected",
  "maxItems",
]);
