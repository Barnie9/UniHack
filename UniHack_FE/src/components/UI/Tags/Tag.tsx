import React from "react";
import { Typography } from "components/UI/Typography";
import { TagWrapper } from "./Tag.style";
import { ColorsX, Svgs } from "environment";
import { Icon } from "components/UI/Icons";
import { StyleOffsets } from "types";

interface Props {
  className?: string;
  disabled?: boolean;
  active?: boolean;
  propagate?: boolean;
  width?: number;
  title: string;
  tooltipTitle?: string;
  paddingOffset?: StyleOffsets;
  marginOffset?: StyleOffsets;
  onClick?: () => void;
  onDelete?: () => void;
}

export function Tag({
  className,
  active,
  disabled,
  propagate,
  onClick,
  onDelete,
  title,
  tooltipTitle,
  paddingOffset,
  marginOffset,
}: Props) {
  function handleClick(e: React.MouseEvent) {
    handlePropagation(e);

    if (onClick) onClick();
  }

  function handleDelete(e: React.MouseEvent) {
    handlePropagation(e);

    if (onDelete) onDelete();
  }

  function handlePropagation(e: React.MouseEvent) {
    if (!propagate) e.stopPropagation();
  }

  return (
    <div className={className}>
      <TagWrapper
        active={active}
        disabled={disabled}
        paddingOffset={paddingOffset}
        marginOffset={marginOffset}
        onClick={handleClick}
        clickable={!!onClick}
      >
        <Typography.Caption
          title={tooltipTitle}
          color={
            disabled
              ? ColorsX.text.disabled
              : active
              ? ColorsX.primary.normal
              : ColorsX.text.caption
          }
        >
          {title}
        </Typography.Caption>

        {onDelete && (
          <Icon
            svg={Svgs.Close}
            size={(s) => s.s}
            onClick={handleDelete}
            marginOffset={{ left: 1, right: -0.4 }}
            disabled={disabled}
            active={active}
          />
        )}
      </TagWrapper>
    </div>
  );
}
