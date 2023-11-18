import styled from "styled-components/macro";
import { Colors } from "environment";
import { PlacementProps } from "types";
import { Layout } from "components/UI/Layout";
import { Typography } from "components/UI/Typography";

interface MarginProps {
  margin?: PlacementProps;
}

export const Email = styled.p`
  color: ${Colors.gray.light};
  height: 2.4rem;
  margin-top: 1rem;
`;

export const Avatar = styled.div`
  flex: 1;
  margin-bottom: 2.4rem;
  img {
    height: 100%;
  }
`;

export const Separator = styled.div<MarginProps>`
  width: 100%;
  height: 1px;
  margin-top: ${({ margin }) => (margin?.top ? `${margin.top}rem` : undefined)};
  margin-bottom: ${({ margin }) =>
    margin?.bottom ? `${margin.bottom}rem` : undefined};
  margin-left: ${({ margin }) =>
    margin?.left ? `${margin.left}rem` : undefined};
  margin-right: ${({ margin }) =>
    margin?.right ? `${margin.right}rem` : undefined};
`;

export const Description = styled.span`
  font-weight: bold;
  margin-top: 4rem;
`;

export const Wrapper = styled(Layout.Column)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  height: 47.6rem;
  border-top: 1px solid ${Colors.gray.darkest};
`;

export const H6 = styled(Typography.H6)``;
