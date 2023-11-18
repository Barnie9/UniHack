import React, { forwardRef, CSSProperties } from "react";

import { StyleColors, SvgComponent, SpacingOffsets } from "types";

import { Container } from "./Icon.style";
import { useIconMetadata } from "./Utils";

export enum IconSizes {
  s = 1.2,
  m = 1.6,
  l = 2.4,
  xl = 3.2,
  // more sizes might be added in the future
}

// Types of icons :
// - the button icon, has background color on-hover and on-active, as defined in the styleguide
// - the simple icon, always has transparent background and doesn't change color on-hover
export enum IconVariants {
  simple = "simple",
  button = "button",
  buttonActive = "buttonActive",
}
export interface OptionalIconProps extends SpacingOffsets {
  colors?: StyleColors;
  rotate?: number;
  active?: boolean;
  disabled?: boolean;
  propagate?: boolean;
  className?: string;
  style?: CSSProperties;
  title?: string;
  showTooltip?: boolean;
  customSize?: number; // better to use as much as possible predefined IconSizes
  id?: string;
  dataTestId?: string;
  size?: (type: typeof IconSizes) => IconSizes;
  variant?: (type: typeof IconVariants) => IconVariants;
  onClick?: (e: React.MouseEvent) => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export type IconProps = OptionalIconProps & { svg: SvgComponent };

/**
 * How to import a new icon:
 *  - step 1: Save the svg image from zeplin in: '/environment/theme/svgs/designx'
 *  - step 2: Change svg content so that it only contains the '<path d="..."' - as a
 * reference check the other saved svgs (this will allow changing the svg's color from code)
 *  - step 3: Export the svg in '/environment/theme/svgs/index' using the same name convention
 *  - step 4: In './Utils' add the corresponding metadata for the new Svg Icon
 *
 * @param variant ButtonIcon (has background color on-hover and on-active),
 * SimpleIcon (doesn't have hover, has the primary color on active and the text color normally)
 * @param size Lg (width, height: 2.4rem & paddings: 0.8rem), Md (width, height: 1.6rem & paddings: 0.4rem),
 * @param customSize any size in rem
 * @param title add custom tooltip
 * @param showTooltip boolean defines whether the tooltip (custom ro default) is shown or not
 * @param colors add custom colors to any of the button states - hover, active, disabled, normal
 */
export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (
    {
      svg,
      colors,
      paddingOffset,
      marginOffset,
      rotate,
      active,
      disabled,
      propagate,
      title,
      className,
      style,
      showTooltip = true,
      customSize,
      id,
      dataTestId,
      size,
      variant,
      onClick,
      onMouseOut,
      onMouseOver,
    },
    ref
  ) => {
    function handleClick(e: React.MouseEvent) {
      if (disabled) return;

      if (!propagate) e.stopPropagation();

      if (onClick) onClick(e);
    }

    const { tooltip, alt } = useIconMetadata(svg);

    const iconVariant = variant ? variant(IconVariants) : IconVariants.simple;

    const iconSize = size ? size(IconSizes) : IconSizes.l;

    const cursorType = onClick ? "pointer" : propagate ? "inherit" : "default";

    return (
      <Container
        title={showTooltip ? (title ? title : tooltip) : undefined}
        variant={iconVariant}
        size={iconSize}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={handleClick}
        aria-label={alt}
        id={id ?? alt?.replaceAll(" ", "").toLowerCase()}
        data-test-id={dataTestId}
        {...{
          ref,
          colors,
          paddingOffset,
          marginOffset,
          rotate,
          active,
          disabled,
          className,
          style,
          customSize,
          cursor: cursorType,
        }}
      >
        <WrapperSvg size={(customSize ?? iconSize) * 10} component={svg} />
      </Container>
    );
  }
);

function WrapperSvg({
  size,
  component: Component,
}: {
  size?: number;
  component: SvgComponent;
}) {
  const componentProps = {
    ...(size && { width: size, height: size }),
  };

  return <Component {...componentProps} />;
}
