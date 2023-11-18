import React, { useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { isEmpty } from "lodash";

import { Icon, IconSizes } from "components/UI/Icons";
import { PlacementProps, RequireOnlyOne, SvgComponent } from "types";

import { AnimatedTooltip, Arrow, Container, Text } from "./BaseTooltip.style";
import { useMeasure, useEffectOnce } from "hooks";
import { PIXEL_TO_REM_RATIO } from "consts";

interface BaseProps {
  height?: number;
  width?: number;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  maxWidth?: number;
  offset?: PlacementProps;
  position?: "top" | "right" | "bottom" | "left";
  tabIndex?: number;
  onTooltipClick?: (e: React.MouseEvent) => void;
  onTooltipKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface ElementProps {
  icon: {
    type: (types: string) => string;
    svg: SvgComponent;
    size?: ((type: typeof IconSizes) => IconSizes) | undefined;
    color?: string;
  };
  element: React.ReactElement;
}

export type BaseTooltipProps = BaseProps & RequireOnlyOne<ElementProps>;

interface VariantProps {
  visible: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

type Props = BaseTooltipProps & VariantProps;
// TODO -> make children universal (alex s)

export function BaseTooltip({
  height,
  width,
  children,
  className,
  disabled = false,
  element,
  arrow = true,
  icon,
  maxWidth,
  position = "right",
  tabIndex,
  visible,
  onClick,
  onMouseOut,
  onMouseOver,
  onTooltipClick,
  onTooltipKeyDown,
}: Props) {
  const [rendered, setRendered] = useState(false);
  const [computed, setComputed] = useState(false);
  const [containerRef, { height: containerHeight, width: containerWidth }] =
    useMeasure<HTMLDivElement>();
  const [tooltipRef, { height: tooltipHeight, width: tooltipWidth }] =
    useMeasure<HTMLDivElement>();
  const [bounds, setBounds] = useState<PlacementProps>({});

  useEffect(() => {
    if (tooltipRef?.current) {
      let bounds: PlacementProps = {};
      switch (position) {
        case "top": {
          bounds = {
            top: -(tooltipHeight + 30) / PIXEL_TO_REM_RATIO,
            left: -(tooltipWidth - containerWidth) / (2 * PIXEL_TO_REM_RATIO),
          };
          break;
        }
        case "right": {
          bounds = {
            right: -(tooltipWidth + 30) / PIXEL_TO_REM_RATIO,
            bottom:
              (tooltipHeight - containerHeight) / (2 * PIXEL_TO_REM_RATIO),
          };
          break;
        }
        case "left": {
          bounds = {
            left: -(tooltipWidth + 30) / PIXEL_TO_REM_RATIO,
            bottom:
              (tooltipHeight - containerHeight) / (2 * PIXEL_TO_REM_RATIO),
          };
          break;
        }
        case "bottom": {
          bounds = {
            bottom: -(tooltipHeight + 30) / PIXEL_TO_REM_RATIO,
            left: (tooltipWidth - containerWidth) / (2 * PIXEL_TO_REM_RATIO),
          };
          break;
        }
      }
      setBounds(bounds);
    }
  }, [tooltipWidth, tooltipHeight, rendered]);

  useEffect(() => {
    if (rendered && !isEmpty(bounds)) {
      const t = setTimeout(() => {
        setComputed(true);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [rendered, bounds]);

  useEffect(() => {
    if (!visible && rendered) {
      const id = setTimeout(() => {
        setRendered(false);
        setComputed(false);
      }, 50);
      return () => clearTimeout(id);
    }
  }, [rendered, visible, tooltipRef, bounds]);

  useEffectOnce(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  function handleOutsideClick(e: Event) {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node) &&
      tooltipRef.current &&
      !tooltipRef.current.contains(e.target as Node)
    ) {
      setRendered(false);
    }
  }

  // useEffect(() => {
  // 	if (rendered && !bounds) computeBounds();
  // }, [bounds, computeBounds, rendered]);

  function getTooltipWidth() {
    if (typeof children === "string") {
      const text = document.createElement("span");
      document.body.appendChild(text);

      text.style.fontSize = `${1.6}rem`;
      text.style.position = "absolute";
      text.innerHTML = children;
      const textWidth = Math.ceil(text.clientWidth) + 20;
      document.body.removeChild(text);

      return Math.ceil(textWidth) / PIXEL_TO_REM_RATIO;
    }
    return width;
  }

  function handleElementClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();

      if (!visible) {
        setRendered(true);
      }
    }
  }

  function handleMouseOut() {
    if (!disabled && visible && onMouseOut) {
      onMouseOut();
    }
  }

  function hanleMouseOver() {
    if (!disabled && !visible && onMouseOver) {
      onMouseOver();
      setRendered(true);
    }
  }

  const style = useSpring({
    opacity: computed ? 1 : 0,
    config: { duration: 50 },
  });

  if (icon) {
    const { svg, color, size } = icon;
    return (
      <Container className={className}>
        <Icon
          ref={containerRef}
          // type={type}
          // color={color}
          svg={svg}
          size={size}
          onClick={handleElementClick}
          onMouseOut={handleMouseOut}
          onMouseOver={hanleMouseOver}
        />
        {rendered && (
          <AnimatedTooltip
            {...bounds}
            visible={computed}
            ref={tooltipRef}
            maxWidth={maxWidth}
            position={position}
            style={style}
            tabIndex={tabIndex}
            width={getTooltipWidth()}
            onClick={onTooltipClick}
            onKeyDown={onTooltipKeyDown}
          >
            {arrow && <Arrow position={position} />}
            {typeof children === "string" ? <Text>{children}</Text> : children}
          </AnimatedTooltip>
        )}
      </Container>
    );
  }

  if (element) {
    return (
      <Container className={className}>
        <div
          ref={containerRef}
          onClick={handleElementClick}
          onMouseOut={handleMouseOut}
          onMouseOver={hanleMouseOver}
        >
          {element}
        </div>
        {rendered && (
          <AnimatedTooltip
            {...bounds}
            ref={tooltipRef}
            visible={computed}
            maxWidth={maxWidth}
            position={position}
            style={style}
            tabIndex={tabIndex}
            height={height}
            width={getTooltipWidth()}
            onClick={onTooltipClick}
            onKeyDown={onTooltipKeyDown}
          >
            {arrow && <Arrow position={position} />}
            {typeof children === "string" ? <Text>{children}</Text> : children}
          </AnimatedTooltip>
        )}
      </Container>
    );
  }

  return null;
}
