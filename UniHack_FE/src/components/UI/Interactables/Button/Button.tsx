import React, { forwardRef } from "react";

import { Loader } from "components/UI/Loader";
import { SpacingOffsets } from "types";

import { Container } from "./Button.style";

export enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
  warning = "warning",
  outline = "outline",
  link = "link",
  upgrade = "upgrade",
}

export interface ButtonStyleProps extends SpacingOffsets {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  hasFullWidth?: boolean;
  smallerOnMobile?: boolean;
  hasPointer?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonStyleProps {
  title: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: (type: typeof ButtonVariants) => string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      title,
      className,
      type = "button",
      loading,
      disabled,
      width,
      minWidth,
      maxWidth,
      minHeight,
      marginOffset,
      paddingOffset,
      hasFullWidth,
      smallerOnMobile,
      hasPointer,
      variant,
      onClick,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
    const processTitleAsId = title
      ?.replaceAll(" ", "")
      .replaceAll("+", "")
      .toLowerCase();

    return (
      <Container
        id={processTitleAsId}
        ref={ref}
        className={className}
        type={type}
        variant={variant ? variant(ButtonVariants) : ButtonVariants.primary}
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        marginOffset={marginOffset}
        paddingOffset={paddingOffset}
        hasFullWidth={hasFullWidth}
        smallerOnMobile={smallerOnMobile}
        isLoading={loading}
        clickable={!!onClick}
        disabled={disabled}
        hasPointer={hasPointer}
        onClick={() => !disabled && !loading && onClick && onClick()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {title}
        {loading && (
          <Loader
            color={(c) =>
              variant &&
              (variant(ButtonVariants) === ButtonVariants.outline ||
                variant(ButtonVariants) === ButtonVariants.secondary)
                ? c.primary
                : c.white
            }
          />
        )}
      </Container>
    );
  }
);
