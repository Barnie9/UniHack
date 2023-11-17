import React, { forwardRef } from "react";

import { Icon as ErrorIcon } from "components/UI/Icons";
import { Flex } from "components/UI/Flex";
import { InputLabel } from "components/UI/Inputs/InputLabel";
import { ColorsX, Svgs } from "environment";

import { Button, Container, Icon, Title } from "./DropdownToggle.style";

interface Props {
  open: boolean;
  id?: string;
  title?: string;
  titleComponent?: React.ReactNode;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  toggle: () => void;
}

export const DropdownToggle = forwardRef<HTMLDivElement, Props>(
  (
    {
      open,
      id,
      title,
      titleComponent,
      label,
      disabled = false,
      error,
      className,
      required,
      toggle,
    },
    ref
  ) => {
    const onClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!disabled) {
        toggle();
      }
    };

    return (
      <Container ref={ref}>
        {label && (
          <InputLabel
            disabled={disabled}
            required={required}
            label={
              <Flex>
                {label}
                {error && (
                  <ErrorIcon
                    svg={Svgs.Information}
                    colors={{
                      color: ColorsX.text.error,
                    }}
                    marginOffset={{ left: 0.6 }}
                    size={(s) => s.m}
                  />
                )}
              </Flex>
            }
          />
        )}

        <Button
          open={open}
          disabled={disabled}
          error={error}
          className={className}
          onClick={onClick}
          id={id}
        >
          {!!titleComponent && titleComponent}
          {title !== undefined && <Title>{title}</Title>}
          <Icon
            svg={Svgs.ChevronDown}
            colors={{
              color: disabled ? ColorsX.text.disabled : undefined,
            }}
            open={open}
            onClick={onClick}
          />
        </Button>
      </Container>
    );
  }
);
