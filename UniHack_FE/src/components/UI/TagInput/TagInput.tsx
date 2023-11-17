import React, { useState, useRef, useMemo } from "react";
import { createGlobalStyle } from "styled-components/macro";
import {
  SortableContainer,
  SortableElement,
  SortEndHandler,
} from "react-sortable-hoc";

import { Tag } from "../Tags";
import { Typography } from "../Typography";
import { Flex } from "../Flex";
import { InputError } from "components/UI/Inputs/InputError";
import { keyMaps } from "consts";
import { arrayUtils } from "helpers";
import { useOutsideClick } from "hooks";
import { SelectItem, SpacingOffsets } from "types";

import { InputLabel } from "../Inputs/InputLabel";

import { ClearInput, Container } from "./TagInput.style";

type Items = SelectItem[];
type MixedItems = (SelectItem | string)[];

interface Props extends SpacingOffsets {
  items: MixedItems;
  label?: string;
  hint?: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  autoFocus?: boolean;
  uniqueItems?: boolean;
  toLowerCase?: boolean;
  required?: boolean;
  sortable?: boolean;
  delimiters?: (string | number)[][];
  readOnly?: boolean;
  focusOutOnDelete?: boolean;
  onChange?: (value: string[]) => void;
  onClick?: (value: string) => void;
  onCreate?: (value: string) => void;
  onDelete?: (value: string) => void;
  onDeleteAll?: () => void;
  onMove?: (input: {
    value: string;
    sourceIndex: number;
    destinationIndex: number;
  }) => void;
  onSubmit?: () => void;
  onBlur?: () => void;
}

export function TagInput({
  items: mixedItems,
  label,
  hint,
  disabled,
  error,
  placeholder,
  autoFocus,
  uniqueItems = true,
  toLowerCase,
  required,
  sortable,
  delimiters = [],
  readOnly,
  focusOutOnDelete,
  marginOffset,
  paddingOffset,
  onChange = () => null,
  onClick,
  onCreate = () => null,
  onDelete = () => null,
  onDeleteAll = () => null,
  onMove = () => null,
  onSubmit = () => null,
  onBlur = () => null,
}: Props) {
  const _items = useMemo(() => parseMixedItems(mixedItems), [mixedItems]);
  const _itemsValue = useMemo(() => _items.map((item) => item.value), [_items]);

  const [newItemValue, setNewItemValue] = useState<string>("");

  const isNewItemValid = newItemValue.trim().length > 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function parseMixedItems(mixedItems: MixedItems) {
    const items: Items = [];

    mixedItems.forEach((mixedItem) => {
      const item: Items[0] =
        typeof mixedItem === "string"
          ? {
              label: mixedItem,
              value: mixedItem,
            }
          : mixedItem;

      items.push(item);
    });

    return items;
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewItemValue(e.target.value);
  }

  function handleOnBlur() {
    if (uniqueItems && !isNewItemUnique()) return resetInput();
    if (isNewItemValid) addItem();
  }

  function addItem() {
    const itemValue = toLowerCase ? newItemValue.toLowerCase() : newItemValue;

    onCreate(itemValue);
    onChange([..._itemsValue, itemValue]);
    resetInput();
  }

  function deleteItem(index: number) {
    const newItems = [..._itemsValue];
    newItems.splice(index, 1);

    onDelete(_itemsValue[index]);
    onChange([...newItems]);

    if (focusOutOnDelete) focusOut();
  }

  function deleteItems() {
    onDeleteAll();
    onChange([]);
  }

  function inputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const pressedCmdOrCtrl = e.metaKey;

    const pressedEnter = keyMaps.enter.includes(e.key);
    const pressedBackspace = keyMaps.backspace.includes(e.key);
    const pressedTab = keyMaps.tab.includes(e.key);

    const pressedDelimiter = delimiters.some((delimiter) =>
      delimiter.includes(e.key)
    );

    // ADD NEW ITEM
    if (pressedTab || pressedEnter || pressedDelimiter) {
      if (isNewItemValid) {
        e.preventDefault();
        e.stopPropagation();

        if (uniqueItems && !isNewItemUnique()) return;

        return addItem();
      }

      if (pressedEnter) return onSubmit();
    }

    if (pressedBackspace) {
      // REMOVE ALL ITEMS
      if (pressedCmdOrCtrl) {
        if (isNewItemValid) return;

        return deleteItems();
      }

      // REMOVE LAST ITEM
      if (!isNewItemValid) return deleteItem(_itemsValue.length - 1);
    }
  }

  function resetInput() {
    setNewItemValue("");
  }

  function isNewItemUnique() {
    const itemFound = _items.find(
      (item) =>
        item.label.trim().toLowerCase() === newItemValue.trim().toLowerCase()
    );

    return !itemFound;
  }

  function focusOut() {
    if (inputRef && inputRef.current) inputRef.current.blur();
  }

  const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
    const newOrder = arrayUtils.move(_itemsValue, oldIndex, newIndex);

    onMove({
      value: _itemsValue[oldIndex],
      sourceIndex: oldIndex,
      destinationIndex: newIndex,
    });
    onChange(newOrder);
  };

  useOutsideClick(onBlur, [containerRef]);

  return (
    <Flex column fullWidth>
      <InputLabel disabled={disabled} required={required} label={label} />

      <GlobalStyle />

      <Container
        ref={containerRef}
        paddingOffset={paddingOffset}
        marginOffset={marginOffset}
        disabled={disabled}
        hasError={!!error}
      >
        {sortable ? (
          <SortableItems
            helperClass="draggable-item"
            // custom props
            items={_items}
            isDisabled={disabled}
            readOnly={readOnly}
            onClick={onClick}
            onDelete={deleteItem}
            // sortable props
            axis="xy"
            distance={4}
            onSortEnd={onSortEnd}
            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
            getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            // lockToContainerEdges
          />
        ) : (
          <Flex style={{ gap: "0.8rem" }} wrap>
            {_items.map((item, index) => (
              <Tag
                key={`item-${item.value}-${index}`}
                title={item.label}
                disabled={disabled}
                propagate={readOnly}
                onClick={onClick ? () => onClick(item.value) : undefined}
                onDelete={readOnly ? undefined : () => deleteItem(index)}
                active
              />
            ))}
          </Flex>
        )}

        {!readOnly && (
          <ClearInput
            ref={inputRef}
            onKeyDown={inputKeyDown}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            value={newItemValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            id="tagInput"
          />
        )}
      </Container>

      {hint !== undefined && (
        <Typography.Hint marginOffset={{ top: 0.2 }} multiline>
          {hint}
        </Typography.Hint>
      )}

      <InputError error={error} />
    </Flex>
  );
}

const GlobalStyle = createGlobalStyle`
	body {
		.draggable-item {
			/* The tag item that the user moves inside the input */
			/* is injected like a portal right in the body */
			/* so we gotta lift it up over all the content to be visible */
			z-index: 99999;
		}
	}
`;

/**
 * ===================
 * SORTABLE COMPONENTS
 * ===================
 */

interface SortableItemProps {
  item: Items[0];
  itemIndex: number;
  isDisabled?: boolean;
  readOnly?: boolean;
  onClick?: (value: string) => void;
  onDelete: (index: number) => void;
}

const SortableItem = SortableElement<SortableItemProps>(
  ({
    item,
    itemIndex,
    isDisabled,
    readOnly,
    onClick,
    onDelete,
  }: SortableItemProps) => (
    <Tag
      title={item.label}
      disabled={isDisabled}
      propagate={readOnly}
      onClick={onClick ? () => onClick(item.value) : undefined}
      onDelete={readOnly ? undefined : () => onDelete(itemIndex)}
      active
    />
  )
);

interface SortableItemsProps {
  items: Items;
  isDisabled?: boolean;
  readOnly?: boolean;
  onClick?: (value: string) => void;
  onDelete: (index: number) => void;
}

const SortableItems = SortableContainer<SortableItemsProps>(
  ({ items, isDisabled, readOnly, onClick, onDelete }: SortableItemsProps) => (
    <Flex style={{ gap: "0.8rem" }} wrap>
      {items.map((item, index) => (
        <SortableItem
          key={`item-${item.value}-${index}`}
          index={index}
          item={item}
          itemIndex={index}
          disabled={isDisabled} // this prop disables the drag functionality
          isDisabled={isDisabled}
          readOnly={readOnly}
          onClick={onClick}
          onDelete={onDelete}
        />
      ))}
    </Flex>
  )
);
