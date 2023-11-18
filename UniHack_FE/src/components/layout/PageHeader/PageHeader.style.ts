import styled from "styled-components/macro";
import { Icon } from "components/UI/Icons";
import { MediaQueriesDevices } from "environment/theme/Sizes";
import { PlacementProps } from "types";
import { Typography } from "components/UI/Typography";
import { Layout } from "components/UI/Layout";

interface ContainerProps {
  margin?: PlacementProps;
}

export const Container = styled.header<ContainerProps>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ margin }) =>
    margin?.bottom !== undefined ? margin.bottom : 4.8}rem;
  margin-top: ${({ margin }) =>
    margin?.top !== undefined ? margin.top : 0}rem;
  width: 100%;
  flex-wrap: wrap;

  @media ${MediaQueriesDevices.phone} {
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 2rem;
  }
`;

export const Count = styled(Typography.Caption)`
  margin-left: 0.8rem;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  p {
    margin-top: 0.8rem;
  }

  @media ${MediaQueriesDevices.phone} {
    margin-right: 0;
    margin-bottom: 2rem;
    width: 100%;

    h3 {
      font-size: 3.2rem;
      line-height: 4.1rem;
    }
  }
`;

export const BackIcon = styled(Icon)`
  align-items: flex-start;
  margin-right: 2.4rem;

  @media ${MediaQueriesDevices.phone} {
    margin-right: 1rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 1rem;

  & > button:not(:last-child) {
    margin-right: 2.4rem;
  }

  @media ${MediaQueriesDevices.phone} {
    margin-left: 0;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const Row = styled(Layout.Row)`
  position: relative;
`;

export const H6 = styled(Typography.H6)``;
