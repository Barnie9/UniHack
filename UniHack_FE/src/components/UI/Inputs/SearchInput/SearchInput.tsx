import React, { useState, useEffect, useRef } from "react";

import { Icon } from "components/UI/Icons";
import { Svgs, ColorsX } from "environment";
import {
  useDebounce,
  useWindowSize,
  useOutsideClick,
  useKeyPress,
} from "hooks";
import { InputType } from "types";

import { Container, Input } from "./SearchInput.style";
import { Breakpoints } from "components/UI/Grid";

interface Props {
  term: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  usedInHeader?: boolean;
  autoFocus?: boolean;
  onChangeTerm: (term: string) => void;
}

export function SearchInput({
  term,
  placeholder,
  disabled,
  className,
  usedInHeader,
  autoFocus,
  onChangeTerm,
}: Props) {
  const [value, setValue] = useState(term);
  const [focused, setFocused] = useState(false);

  const { width } = useWindowSize();

  useDebounce(() => {
    if (term !== value) onChangeTerm(value);
  }, parseInt(value));

  useEffect(() => {
    if (term !== value) setValue(term);
  }, [term]);

  function clearValue() {
    if (disabled) return;

    setValue("");
    onChangeTerm("");
  }

  const isInputValid = value.length > 0;

  const tabletBreakPoint =
    width < parseInt(Breakpoints.TABLET_PORTRAIT.replace("px", ""), 10);

  const containerRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick(handleFocusOut, [containerRef]);

  useKeyPress(
    { onEscapeKeyPress: handleFocusOut },
    { noModalsOpened: true, listen: tabletBreakPoint && focused }
  );

  function handleFocusOut() {
    setFocused(false);
    if (inputRef.current) inputRef.current.blur();
  }

  function onOpenInput() {
    if (inputRef.current) {
      setFocused(true);
      inputRef.current.focus();
    }
  }

  return (
    <Container
      ref={containerRef}
      focused={focused}
      disabled={disabled}
      className={className}
      usedInHeader={usedInHeader}
    >
      {tabletBreakPoint && !focused && (
        <Icon
          svg={Svgs.Search}
          size={(s) => s.l}
          variant={(v) => v.button}
          onClick={onOpenInput}
        />
      )}

      {(tabletBreakPoint && focused) ||
        (!tabletBreakPoint && (
          <Icon
            svg={Svgs.Search}
            size={(s) => s.m}
            marginOffset={{ right: 0.8 }}
            disabled
          />
        ))}

      <Input
        id="search"
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        type={InputType.Text}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
      />

      <Icon
        style={{
          visibility: !disabled && isInputValid ? "visible" : "hidden",
        }}
        svg={Svgs.Clear}
        size={(s) => s.m}
        colors={{ color: ColorsX.text.disabled }}
        marginOffset={{ left: 0.8 }}
        onClick={clearValue}
      />
    </Container>
  );
}
