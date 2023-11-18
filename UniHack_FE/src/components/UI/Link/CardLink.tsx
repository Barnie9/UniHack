import React from "react";
import { useLocation } from "react-router";
import styled, { css } from "styled-components/macro";

import { Colors } from "environment";
import { usePlatformContext } from "hooks";

import { Link, LinkProps } from "./Link";

interface StyleProps {
  $tv: boolean;
}

export const StyledLink = styled(Link)<StyleProps>`
  display: block;
  font-weight: unset;

  & > div {
    transition: box-shadow 0.2s, border-color 0.2s;
  }

  :hover {
    & > div {
    }
  }

  ${({ $tv }) =>
    $tv &&
    css`
      & > div {
        border: 2px solid ${Colors.gray.dark};

        :focus,
        :hover {
          border-color: ${Colors.primary};
        }
      }
    `}
`;

export function CardLink({ to, ...props }: LinkProps) {
  const location = useLocation();
  const { isTv } = usePlatformContext();

  return <StyledLink {...props} to={`${to}${location.search}`} $tv={isTv} />;
}
