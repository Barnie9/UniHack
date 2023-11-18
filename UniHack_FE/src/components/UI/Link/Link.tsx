import React from "react";
import { NavLinkProps } from "react-router-dom";

import { CustomLink, Text, Props } from "./Link.style";

export interface LinkProps extends Props, Omit<NavLinkProps, "to"> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  margin?: Props["$margin"];
  to?: string;
  weight?: Props["$weight"];
  onClick?: () => void;
  activeClassName?: string;
  isActive?: boolean;
}

export function Link({
  children,
  className,
  disabled = false,
  margin,
  to,
  weight,
  onClick,
  activeClassName = "nav-link-active",
  ...props
}: LinkProps) {
  if (to) {
    return (
      <CustomLink
        // activeClassName={activeClassName}
        onClick={onClick}
        className={className}
        draggable={false}
        $margin={margin}
        to={to}
        $weight={weight}
        {...props}
      >
        {children}
      </CustomLink>
    );
  }

  return (
    <Text
      className={className}
      $disabled={disabled}
      draggable={false}
      $margin={margin}
      tabIndex={0}
      $weight={weight}
      onClick={onClick}
    >
      {children}
    </Text>
  );
}
