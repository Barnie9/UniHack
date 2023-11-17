import React from "react";
import { Dropdown } from "components/UI/Dropdown";
import { Icon } from "components/UI/Icons";
import { Svgs } from "environment";

import {
  Title,
  Toggle,
  Tab,
  DropdownSubmenuItem,
  DropdownTagToggle,
  ToggleIcon,
  TabWrapper,
} from "./Select.style";
import { Typography } from "components/UI/Typography";
import { FunctionType, Offset } from "types";
import {
  NewItems,
  SelectItem,
  SelectTypes,
  SelectTypesE,
  SelectTypesA,
} from "./types";
import { formatToSelectItems } from "helpers";

interface Props {
  error?: string;
  className?: string;
  title: string;
  items: NewItems;
  neutral?: string;
  label?: string;
  disabled?: boolean;
  initiallyOpen?: boolean;
  groupsOpenLeft?: boolean;
  shouldScrollIntoView?: boolean;
  scrollable?: boolean;
  width?: number;
  offset?: Offset;
  type?: FunctionType<typeof SelectTypes, SelectTypesA | SelectTypes>;
  activeItem?: (item: SelectItem) => boolean;
  disableItem?: (item: SelectItem) => boolean;
  itemTitle?: (item: string) => void;
  onSelect: (item: SelectItem, index: number, nestedIndexes?: number[]) => void;
  onSelectNeutral?: () => void;
}

export function Select({
  error,
  className,
  title,
  items,
  neutral,
  label,
  disabled,
  initiallyOpen,
  groupsOpenLeft = true,
  shouldScrollIntoView,
  scrollable,
  width,
  offset,
  type,
  activeItem,
  disableItem,
  itemTitle,
  onSelect,
  onSelectNeutral,
}: Props) {
  function selectToggleType(
    toggleProps: {
      ref: React.RefObject<HTMLDivElement>;
      open: boolean;
      toggle: () => void;
    },
    selectType?: FunctionType<SelectTypes, SelectTypesA>
  ) {
    const { ref, open, toggle } = toggleProps;

    if (selectType) {
      const toggleType: SelectTypesA = selectType(SelectTypes);

      switch (toggleType.type) {
        case SelectTypesE.Tag: {
          return (
            <DropdownTagToggle
              ref={ref}
              open={open}
              disabled={disabled}
              onClick={toggle}
            >
              <Typography.Caption fontweight={(w) => w.medium}>
                {title}
              </Typography.Caption>
              <ToggleIcon />
            </DropdownTagToggle>
          );
        }
        case SelectTypesE.Tab: {
          // Active toggle without Select dropdown open
          const { isActive } = toggleType.payload;

          return (
            <TabWrapper ref={ref} onClick={toggle}>
              <Tab active={isActive} open={open} disabled={disabled}>
                <Typography.Paragraph fontweight={(w) => w.medium}>
                  {title}
                </Typography.Paragraph>
              </Tab>
              <ToggleIcon />
            </TabWrapper>
          );
        }
        case SelectTypesE.Icon: {
          const { icon } = toggleType.payload;

          return (
            <Toggle ref={ref} open={open} onClick={toggle}>
              <Icon
                svg={Svgs.ChevronDown}
                marginOffset={{ right: 0.8 }}
                rotate={open ? 180 : 0}
                onClick={toggle}
              />
              <Title>{title}</Title>
              {icon}
            </Toggle>
          );
        }
      }
    }
  }

  let formattedItems: SelectItem[] = items as SelectItem[];

  if (items) {
    // FORMATTED VALUES
    if (typeof items === "function")
      formattedItems = items(formatToSelectItems);
  }

  function renderGroupItems(item: SelectItem, key: string, index: number[]) {
    if (item.items) {
      return (
        <Dropdown.Submenu
          key={`group-${key}-${item.label}`}
          title={item.label}
          left={groupsOpenLeft}
          small
        >
          {item.items.map((groupItem, groupItemIndex) => {
            return renderGroupItems(groupItem, "group", [
              ...index,
              groupItemIndex,
            ]);
          })}
        </Dropdown.Submenu>
      );
    } else
      return (
        <DropdownSubmenuItem
          key={`select-group-${key}-item-${item.value}`}
          disabled={disabled}
          onClick={() => {
            onSelect(item, index[index.length - 1], [...index]);
          }}
        >
          {item.label}
        </DropdownSubmenuItem>
      );
  }

  const selectType = type && (type(SelectTypes) as SelectTypesA);
  const hasIcon = selectType?.type;

  return (
    <Dropdown
      scrollable={scrollable}
      shouldScrollIntoView={shouldScrollIntoView}
      className={className}
      title={hasIcon ? undefined : title}
      label={label}
      disabled={disabled}
      initiallyOpen={initiallyOpen}
      width={width}
      offset={offset}
      button={!width}
      error={error}
      {...(type && {
        toggleComponent: (toggleProps) =>
          selectToggleType(
            toggleProps,
            type as FunctionType<SelectTypes, SelectTypesA>
          ),
      })}
    >
      {neutral && (
        <Dropdown.Item
          className="select-neutral-item"
          onClick={onSelectNeutral}
        >
          {neutral}
        </Dropdown.Item>
      )}
      {formattedItems.map((item, index) => {
        const defaultActive = item.label === title || item.value === title;

        const active = activeItem ? activeItem(item) : defaultActive;

        if (item.items) {
          // Recursively render any groups inside groups inside groups...inside groups
          return renderGroupItems(item, "", [index]);
        }

        return (
          <Dropdown.Item
            key={`select-item-${item.value}-${index}`}
            dataTestId={item.label}
            active={active}
            disabled={disableItem && disableItem(item)}
            onClick={() => onSelect(item, index)}
          >
            {item.label}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
}
