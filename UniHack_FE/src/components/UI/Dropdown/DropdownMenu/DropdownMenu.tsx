import React, { useRef, forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import { isEmpty } from "lodash";

import { mergeRefs } from "helpers";
import { useEffectOnce } from "hooks";
import { Bounds, Offset } from "types";

import { ButtonMenu, RegularMenu } from "./DropdownMenu.style";

const computePosition = (
  detached = false,
  distance?: Distance,
  bounds?: Bounds,
  offset?: Offset,
  cursorPosition?: number,
  clientWidth?: number,
  clientHeight?: number,
  isPopup?: boolean
) => {
  let top = bounds && bounds.height ? bounds.height : 0;
  let bottom = 0;
  let left = detached ? (bounds && bounds.width ? bounds.width / 2 : 0) : 0;
  let right = detached ? (bounds && bounds.width ? bounds.width : 0) : 0;

  const position: Offset = {
    top,
    left,
  };

  if (offset) {
    if (offset.top !== undefined) {
      top += offset.top;
      position.top = top;
    }

    if (offset.bottom !== undefined) {
      bottom = offset.bottom;
      position.bottom = bottom;
      delete position.top;
    }

    if (offset.left !== undefined) {
      left += offset.left;
      position.left = left;
    }

    if (offset.right !== undefined) {
      if (detached) {
        position.right = right;
      } else {
        right = offset.right;
        position.right = -right;
      }
      delete position.left;
    }
  }

  if (detached && distance?.right && bounds && clientWidth) {
    const fitsRight = distance.right >= clientWidth + 20;
    const fitsLeft = distance.left >= clientWidth + 20;

    if (fitsRight) {
      position.left = distance.left + bounds?.width + 34;
      delete position.right;
    } else if (fitsLeft) {
      position.right = distance.right + bounds?.width + 40;
      delete position.left;

      // Dropdown may be the same width as the whole screen
    } else {
      if (cursorPosition) {
        // Open submenu at cursor position X axis
        position.left = cursorPosition;
      } else {
        position.right = distance.right;
        delete position.left;
      }
    }

    if (isPopup && clientWidth) {
      if (clientWidth >= distance.right) {
        position.right = clientWidth / 4;
        delete position.left;
      } else {
        position.right = distance.right - clientWidth / 4;
        delete position.left;
      }
    }
  }

  // Adding enough top space to portal component
  if (detached && bounds && distance && clientHeight) {
    if (isPopup) position.top = distance.top + bounds.height;
    else {
      if (distance.bottom && distance.bottom <= clientHeight) {
        position.top = distance.top - clientHeight;
      } else {
        position.top = distance.top - bounds.height;
      }
      delete position.bottom;
    }
  }

  return position;
};

// Distance from the bounds of the window
interface Distance {
  left: number;
  right?: number;
  top: number;
  bottom?: number;
}

interface Props {
  children: React.ReactNode;
  button: boolean;
  bounds?: Bounds;
  width?: number;
  height?: number;
  offset?: Offset;
  className?: string;
  shouldScrollIntoView?: "end" | "start" | "center" | "nearest" | boolean;
  distance?: Distance;
  detached?: boolean;
  cursorPosition?: number;
  isPopup?: boolean;
}

export const DropdownMenu = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      button,
      distance,
      bounds,
      width,
      height,
      offset,
      className,
      shouldScrollIntoView,
      detached,
      cursorPosition,
      isPopup,
    },
    ref
  ) => {
    const [position, setPosition] = useState<Offset>({});

    const innerRef = useRef<HTMLDivElement>(null);

    const mergedRef = mergeRefs([innerRef, ref]);

    useEffectOnce(() => {
      setPosition(
        computePosition(
          detached,
          distance,
          bounds,
          offset,
          cursorPosition,
          innerRef.current?.clientWidth,
          innerRef.current?.clientHeight,
          isPopup
        )
      );

      if (shouldScrollIntoView && innerRef.current) {
        innerRef.current.scrollIntoView({
          block:
            typeof shouldScrollIntoView === "string"
              ? shouldScrollIntoView
              : "center",
          behavior: "smooth",
        });
      }
    });

    const style = position;
    const opacity = isEmpty(position) ? 0 : 1;

    const commonProps = {
      ref: mergedRef,
      className: className,
      maxHeight: height,
    };

    const menuToRender = button ? (
      <ButtonMenu detached={detached} {...commonProps} bounds={bounds}>
        {children}
      </ButtonMenu>
    ) : (
      <RegularMenu
        detached={detached}
        {...commonProps}
        width={width}
        style={{ ...style, opacity }}
      >
        {children}
      </RegularMenu>
    );

    return detached ? createPortal(menuToRender, document.body) : menuToRender;
  }
);
