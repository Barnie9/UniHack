import { animated } from "react-spring";
import styled, { css } from "styled-components/macro";
import { Colors, Layers } from "environment";
import { PlacementProps, Position } from "types";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

interface TooltipProps extends PlacementProps {
  maxWidth?: number;
  position: Position;
  width: number;
  height?: number;
  visible?: boolean;
}

const Tooltip = styled.div<TooltipProps>`
  position: absolute;
  visibility: ${({ visible = true }) => (visible ? "visible" : "hidden")};
  bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : undefined)};
  left: ${({ left }) => (left ? `${left}rem` : undefined)};
  right: ${({ right }) => (right ? `${right}rem` : undefined)};
  top: ${({ top }) => (top ? `${top}rem` : undefined)};
  transition: opacity 0.2s;
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}rem` : "auto")};
  width: ${({ width }) => (width ? `${width}rem` : "auto")};
  height: ${({ height }) => `${height}rem` || "auto"};
  z-index: ${Layers.floater};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-radius: 0.6rem;
  outline: none;

  :focus {
    background-color: ${Colors.primary};
  }

  ${({ onClick }) => css`
    cursor: ${onClick ? "pointer" : "default"};
  `}
`;

export const AnimatedTooltip = animated(Tooltip);

interface ArrowProps {
  position: Position;
}

export const Arrow = styled.div<ArrowProps>`
  position: absolute;
  background-color: inherit;
  top: ${({ position }) => position === "bottom" && "-0.5rem"};
  right: ${({ position }) => position === "left" && "-0.5rem"};
  left: ${({ position }) => position === "right" && "-0.5rem"};
  bottom: ${({ position }) => position === "top" && "-0.5rem"};
  transform: rotate(45deg);
  height: 1rem;
  width: 1rem;
`;

export const Text = styled.span`
  font-size: 1.6rem;
`;
