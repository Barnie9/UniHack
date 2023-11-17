import React, { useRef, useState, useEffect } from "react";

import { useOutsideClick, useMeasure } from "hooks";
import { Offset } from "types";

import { PopoverContent } from "./PopoverContent";

import { Container } from "./Popover.style";

interface Props {
  children: React.ReactNode;
  open?: boolean;
  disabled?: boolean;
  width?: number;
  offset?: Offset;
  toggleComponent: (props: {
    ref: React.RefObject<HTMLDivElement>;
    open: boolean;
    toggle: () => void;
  }) => React.ReactNode;
  onToggle?: (open: boolean) => void;
}

export function Popover({
  children,
  open = false,
  disabled,
  width,
  offset,
  toggleComponent,
  onToggle,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [ref, bounds] = useMeasure<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen]);

  function toggle() {
    setIsOpen((open) => !open);
  }

  function close() {
    setIsOpen(false);
  }

  useOutsideClick(() => {
    if (!disabled) close();
  }, [ref, contentRef]);

  return (
    <Container>
      {toggleComponent({ ref, open: isOpen, toggle })}
      {open && (
        <PopoverContent
          ref={contentRef}
          bounds={bounds}
          width={width}
          offset={offset}
        >
          {children}
        </PopoverContent>
      )}
    </Container>
  );
}
