import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Colors } from "environment";
import { PlacementProps } from "types";

export interface Props {
  $disabled?: boolean;
  $margin?: PlacementProps;
  $weight?: number;
}

export const Text = styled.p<Props>`
  color: ${({ $disabled }) =>
    $disabled ? Colors.gray.lighter : Colors.primary};
  cursor: pointer;
  font-weight: ${({ $weight = 700 }) => $weight};
  margin-top: ${({ $margin }) => ($margin?.top ? `${$margin.top}rem` : 0)};
  margin-bottom: ${({ $margin }) =>
    $margin?.bottom ? `${$margin.bottom}rem` : 0};
  margin-left: ${({ $margin }) => ($margin?.left ? `${$margin.left}rem` : 0)};
  margin-right: ${({ $margin }) =>
    $margin?.right ? `${$margin.right}rem` : 0};
  outline: none;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  font-size: 1.4rem;
  line-height: 1.57;
  transition: color 0.2s;
  width: fit-content;

  :focus,
  :hover {
    color: ${({ $disabled }) => !$disabled && Colors.primary};
  }
`;

export const CustomLink = styled(NavLink)<Props>`
  position: relative;
  color: ${({ $disabled }) => ($disabled ? Colors.gray.light : Colors.green)};
  cursor: pointer;
  font-weight: ${({ $weight = 700 }) => $weight};
  margin-top: ${({ $margin }) => ($margin?.top ? `${$margin.top}rem` : 0)};
  margin-bottom: ${({ $margin }) =>
    $margin?.bottom ? `${$margin.bottom}rem` : 0};
  margin-left: ${({ $margin }) => ($margin?.left ? `${$margin.left}rem` : 0)};
  margin-right: ${({ $margin }) =>
    $margin?.right ? `${$margin.right}rem` : 0};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  transition: color 0.2s;

  :focus,
  :hover {
    color: ${({ $disabled }) => !$disabled && Colors.primary};
  }
`;
