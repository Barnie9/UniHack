import React from "react";

import { SpacingOffsets } from "types";
import {
  Container,
  ToggleIconContainer,
  Button,
  Dropdown,
} from "./SplitButton.style";
import { Icon } from "components/UI/Icons";
import { Svgs, ColorsX } from "environment";

export enum ButtonVariants {
  primary = "primary",
  outline = "outline",
}

interface Option {
  label: string;
  disabled?: boolean;
  dataTestId?: string;
  onClick?: () => void;
}

interface StyleProps {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  menuWidth?: number;
  hasFullWidth?: boolean;
  smallerOnMobile?: boolean;
  hasPointer?: boolean;
  height?: number;
}

interface Props extends StyleProps, SpacingOffsets {
  title: string;
  options: Option[];
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  dataTestId?: string;
  className?: string;
  variant?: (type: typeof ButtonVariants) => ButtonVariants;
  onClick?: () => void;
}

export const SplitButton = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      title,
      options,
      loading,
      disabled,
      type = "button",
      dataTestId,
      className,
      variant,
      onClick,
      //
      width = 10,
      minWidth = 10,
      maxWidth,
      minHeight = 4,
      menuWidth = 14,
      hasFullWidth,
      smallerOnMobile,
      hasPointer,
      height,
      //
      marginOffset,
      paddingOffset,
    },
    ref
  ) => {
    const _variant = variant ? variant(ButtonVariants) : ButtonVariants.primary;

    function getToggleIconColor() {
      if (disabled) return ColorsX.text.disabled;

      const iconColorsByVariant = {
        [ButtonVariants.primary]: ColorsX.background.disabled,
        [ButtonVariants.outline]: ColorsX.primary.normal,
      };

      return iconColorsByVariant[_variant];
    }

    return (
      <Container
        ref={ref}
        data-test-id={dataTestId}
        className={className}
        marginOffset={marginOffset}
        paddingOffset={paddingOffset}
        minHeight={minHeight}
        height={height}
      >
        <Button
          variant={() => _variant}
          width={width}
          maxWidth={maxWidth}
          minWidth={minWidth}
          hasFullWidth={hasFullWidth}
          smallerOnMobile={smallerOnMobile}
          loading={loading}
          disabled={disabled}
          hasPointer={hasPointer}
          onClick={onClick}
          type={type}
          title={title}
        />

        <Dropdown
          toggleComponent={({ ref, toggle }) => (
            <ToggleIconContainer
              onClick={loading ? undefined : toggle}
              disabled={disabled}
              ref={ref}
              clickable={!disabled && (!!toggle || hasPointer)}
              variant={_variant}
            >
              <Icon
                svg={Svgs.ArrowDown}
                colors={{ color: getToggleIconColor() }}
                propagate
              />
            </ToggleIconContainer>
          )}
          offset={{ top: 2, right: 0 }}
          width={menuWidth}
          disabled={disabled}
          minHeight={minHeight}
          height={height}
        >
          {options.map((option, index) => (
            <Dropdown.Item
              key={index}
              dataTestId={option.dataTestId}
              title={option.label}
              disabled={option.disabled}
              onClick={option.onClick}
            />
          ))}
        </Dropdown>
      </Container>
    );
  }
);
