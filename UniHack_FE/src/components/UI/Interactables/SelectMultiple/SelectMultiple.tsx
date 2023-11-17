import React, { useMemo, useState } from "react";

import { Checkbox } from "../Checkbox";
import { Dropdown } from "components/UI/Dropdown";
import { SearchInput } from "components/UI/Inputs/SearchInput";
import { Spacer } from "components/UI/Spacer";
import { Typography } from "components/UI/Typography";
import { formatToSelectItems, truncateList } from "helpers";
import { SelectItem } from "types";

import { SelectItems } from "./types";

import { Container, ItemsContainer } from "./SelectMultiple.style";

interface Props {
  items: SelectItems;
  selectedItems: string[];
  maxHeight?: number;
  maxItems?: number;
  disabled?: boolean;
  withSearch?: boolean;
  className?: string;
  onSelect: (item: SelectItem) => void;
  onToggleAll?: (flag: boolean) => void;
}

export function SelectMultiple({
  items,
  selectedItems,
  maxHeight,
  maxItems = 100,
  disabled,
  withSearch = true,
  className,
  onSelect,
  onToggleAll,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const { formattedItems, selectedState, hasItems } = useMemo(() => {
    const formattedItems = getFormattedItems(items);
    const selectedState = getSelectedState(formattedItems, selectedItems);
    const hasItems = formattedItems.length > 0;

    return { formattedItems, selectedState, hasItems };
  }, [items]);

  const computedItems = useMemo(() => {
    let computedItems = formattedItems;

    const curatedSearchTerm = sanatize(searchTerm);
    const isSearchTermValid = curatedSearchTerm.length > 0;

    if (isSearchTermValid) {
      computedItems = formattedItems.filter((item) =>
        sanatize(item.label).includes(curatedSearchTerm)
      );
    }

    function sanatize(value: string) {
      return value.toLowerCase().trim();
    }

    return computedItems;
  }, [formattedItems, searchTerm]);

  const { truncated: truncatedItems, rest: hiddenItems } = useMemo(() => {
    return truncateList(computedItems, maxItems);
  }, [computedItems]);

  function getFormattedItems(items: SelectItems): SelectItem[] {
    // WITH FORMATTER
    if (typeof items === "function") return items(formatToSelectItems);

    return items;
  }

  function getSelectedState(items: SelectItem[], selectedItems: string[]) {
    const all =
      items.length > 0 &&
      items.every((item) => selectedItems.includes(item.value));
    const some = selectedItems.length > 0;

    const partial = some && !all;

    return { all, partial };
  }

  /**
   * Toggles all - `checked` / `un-checked`
   */
  function handleToggleAll() {
    if (disabled) return;

    if (onToggleAll) {
      const flag = !selectedState.all;

      onToggleAll(flag);
    }
  }

  function handleOnSelect(item: SelectItem) {
    if (disabled) return;

    onSelect(item);
  }

  return (
    <Container className={className} disabled={disabled}>
      {/* SEARCH */}
      {withSearch && (
        <>
          <SearchInput
            term={searchTerm}
            placeholder="Search items"
            onChangeTerm={setSearchTerm}
            autoFocus
          />
          <Spacer size={(s) => s.s} />
        </>
      )}

      {/* TOGGLE ALL */}
      {onToggleAll && hasItems && (
        <>
          <Checkbox
            label={`Check/Uncheck all`}
            checked={selectedState.all}
            partial={selectedState.partial}
            onClick={handleToggleAll}
          />
          <Spacer size={(s) => s.xs} />
        </>
      )}

      {/* ITEMS */}
      <ItemsContainer maxHeight={maxHeight}>
        {truncatedItems.map((item, index) => (
          <Dropdown.Item
            key={`select-multiple-item-${item.value}-index-${index}`}
            onClick={() => handleOnSelect(item)}
          >
            <Checkbox
              label={item.label}
              checked={selectedItems.includes(item.value)}
              onClick={() => handleOnSelect(item)}
            />
          </Dropdown.Item>
        ))}

        {truncatedItems.length > maxItems && (
          <Typography.Caption marginOffset={{ top: 0.8, left: 0.8 }}>
            {`Type for more results.. (${hiddenItems})`}
          </Typography.Caption>
        )}
      </ItemsContainer>
    </Container>
  );
}
