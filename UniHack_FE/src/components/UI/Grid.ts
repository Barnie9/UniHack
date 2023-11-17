import styled, { css } from "styled-components/macro";

export function Grid() {
  return null;
}

export enum Breakpoints {
  PHONE = "375px",
  TABLET_PORTRAIT = "768px",
  TABLET_LANDSCAPE = "1024px",
  SMALL_LAPTOP = "1440px",
  FHD_MONITOR = "1920px",
  TWO_K_MONITOR = "2560px",
  FOUR_K_MONITOR = "3840px",
}

interface ColProps {
  animateOffsets?: boolean;
  sizes: {
    xl: number;
    l: number;
    m: number;
  };
  offsets?: {
    xl?: number;
    l?: number;
    m?: number;
  };
}

enum Position {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
}

interface ColumnWidth {
  numberOfColumns: number;
  includeLeftContainer?: boolean;
  includeRightContainer?: boolean;
  numberOfGutters?: number;
  asMargin?: { left?: boolean; right?: boolean };
  asPadding?: { left?: boolean; right?: boolean };
  asPosition?: { position: Position; negative?: boolean };
}

export function getColumnsWidth({
  numberOfColumns,
  includeLeftContainer,
  includeRightContainer,
  numberOfGutters = 0,
  asMargin,
  asPadding,
  asPosition,
}: ColumnWidth) {
  return css`
    @media (max-width: ${Breakpoints.FOUR_K_MONITOR}) {
      --width: calc(${numberOfColumns} * 5.8575vw);
      --gutters: calc(${numberOfGutters} * 2rem);
      --left: ${includeLeftContainer ? " 3.645vw" : "0vw"};
      --right: ${includeRightContainer ? " 3.645vw" : "0vw"};
    }

    @media (max-width: ${Breakpoints.TWO_K_MONITOR}),
      (max-width: ${Breakpoints.FHD_MONITOR}),
      (max-width: ${Breakpoints.SMALL_LAPTOP}),
      (max-width: ${Breakpoints.TABLET_LANDSCAPE}) {
      --width: calc(${numberOfColumns} * (((2 * 6.25vw + 1.5625vw) / 2)));
      --gutters: calc(${numberOfGutters} * 1.5625vw);
      --left: ${includeLeftContainer ? " 3.9vw" : "0vw"};
      --right: ${includeRightContainer ? " 3.9vw" : "0vw"};
    }

    @media (max-width: ${Breakpoints.TABLET_PORTRAIT}) {
      --width: calc(${numberOfColumns} * (((2 * 12.5vw + 3.125vw) / 2)));
      --gutters: calc(${numberOfGutters} * 3.125vw);
      --left: ${includeLeftContainer ? " 4.6875vw" : "0vw"};
      --right: ${includeRightContainer ? " 4.6875vw" : "0vw"};
    }

    ${asMargin &&
    asMargin.left &&
    css`
      margin-left: calc(
        var(--width) + var(--right) + var(--left) + var(--gutters)
      );
    `}

    ${asMargin &&
    asMargin.right &&
    css`
      margin-right: calc(
        var(--width) + var(--right) + var(--left) + var(--gutters)
      );
    `}

		${asPadding &&
    asPadding.left &&
    css`
      padding-left: calc(
        var(--width) + var(--right) + var(--left) + var(--gutters)
      );
    `}

		${asPadding &&
    asPadding.right &&
    css`
      padding-right: calc(
        var(--width) + var(--right) + var(--left) + var(--gutters)
      );
    `}

		${asPosition &&
    asPosition &&
    css`
      --init: calc(var(--width) + var(--right) + var(--left) + var(--gutters));
      --negative: ${asPosition.negative ? "0px - " : ""};
      ${asPosition.position}: calc(var(--negative) var(--init));
    `}

		${!asMargin &&
    !asPadding &&
    css`
      width: calc(var(--width) + var(--right) + var(--left) + var(--gutters));
    `}
  `;
}

const Col = styled.div<ColProps>`
  @media (max-width: ${Breakpoints.FOUR_K_MONITOR}) {
    width: calc(${({ sizes: { xl } }) => xl} * 5.8575vw);
    padding-left: 2rem;
    padding-right: 2rem;
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.xl !== undefined &&
      css`
        margin-left: calc(${offsets.xl} * 5.8575vw);
      `}
  }
  @media (max-width: ${Breakpoints.TWO_K_MONITOR}) {
    width: calc(${({ sizes: { l } }) => l} * (6.25vw + 1.5625vw));
    padding-left: calc(1.5625vw / 2);
    padding-right: calc(1.5625vw / 2);
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.l !== undefined &&
      css`
        margin-left: calc(${offsets.l} * (6.25vw + 1.5625vw));
      `};
  }
  @media (max-width: ${Breakpoints.FHD_MONITOR}) {
    width: calc(${({ sizes: { l } }) => l} * (6.25vw + 1.5625vw));
    padding-left: calc(1.5625vw / 2);
    padding-right: calc(1.5625vw / 2);
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.l !== undefined &&
      css`
        margin-left: calc(${offsets.l} * (6.25vw + 1.5625vw));
      `};
  }
  @media (max-width: ${Breakpoints.SMALL_LAPTOP}) {
    width: calc(${({ sizes: { l } }) => l} * (6.25vw + 1.5625vw));
    padding-left: calc(1.5625vw / 2);
    padding-right: calc(1.5625vw / 2);
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.l !== undefined &&
      css`
        margin-left: calc(${offsets.l} * (6.25vw + 1.5625vw));
      `};
  }
  @media (max-width: ${Breakpoints.TABLET_LANDSCAPE}) {
    width: calc(${({ sizes: { l } }) => l} * (6.25vw + 1.5625vw));
    padding-left: calc(1.5625vw / 2);
    padding-right: calc(1.5625vw / 2);
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.l !== undefined &&
      css`
        margin-left: calc(${offsets.l} * (6.25vw + 1.5625vw));
      `};
  }
  @media (max-width: ${Breakpoints.TABLET_PORTRAIT}) {
    width: calc(${({ sizes: { m } }) => m} * (12.5vw + 3.125vw));
    padding-left: calc(3.125vw / 2);
    padding-right: calc(3.125vw / 2);
    ${({ offsets }) =>
      offsets !== undefined &&
      offsets.m !== undefined &&
      css`
        margin-left: calc(${offsets.m} * (12.5vw + 3.125vw));
      `};
  }
  @media (max-width: ${Breakpoints.PHONE}) {
    width: 100%;
    padding-left: 5.6vw;
    padding-right: 5.6vw;
    margin-left: 0;
  }

  ${({ animateOffsets }) =>
    animateOffsets &&
    css`
      transition: margin-left 0.15s;
    `};
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: ${Breakpoints.FOUR_K_MONITOR}) {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-right: -2rem;
  }
  @media (max-width: ${Breakpoints.TWO_K_MONITOR}) {
    width: calc(100% + 1.5625vw);
    margin-left: -0.78125vw;
    margin-right: -0.78125vw;
  }
  @media (max-width: ${Breakpoints.FHD_MONITOR}) {
    width: calc(100% + 1.5625vw);
    margin-left: -0.78125vw;
    margin-right: -0.78125vw;
  }
  @media (max-width: ${Breakpoints.SMALL_LAPTOP}) {
    width: calc(100% + 1.5625vw);
    margin-left: -0.78125vw;
    margin-right: -0.78125vw;
  }
  @media (max-width: ${Breakpoints.TABLET_LANDSCAPE}) {
    width: calc(100% + 1.5625vw);
    margin-left: -0.78125vw;
    margin-right: -0.78125vw;
  }
  @media (max-width: ${Breakpoints.TABLET_PORTRAIT}) {
    width: calc(100% + 3.125vw);
    margin-left: calc(-3.125vw / 2);
    margin-right: calc(-3.125vw / 2);
  }
  @media (max-width: ${Breakpoints.PHONE}) {
    width: calc(100% + 11.2vw);
    margin-left: -5.6vw;
    margin-right: -5.6vw;
  }
`;

interface ContainerProps {
  debug?: boolean;
}
const Container = styled.div<ContainerProps>`
  @media (max-width: ${Breakpoints.FOUR_K_MONITOR}) {
    max-width: calc(100vw - ((3.645vw - 2rem) * 2));
    margin-left: calc(3.645vw - 2rem);
    margin-right: calc(3.465vw - 2rem);
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media (max-width: ${Breakpoints.TWO_K_MONITOR}) {
    max-width: calc(100vw - (3.9vw - 0.78125vw) * 2);
    margin-left: calc(3.9vw - 0.78125vw);
    margin-right: calc(3.9vw - 0.78125vw);
    padding-left: 0.78125vw;
    padding-right: 0.78125vw;
  }
  @media (max-width: ${Breakpoints.FHD_MONITOR}) {
    max-width: calc(100vw - (3.9vw - 0.78125vw) * 2);
    margin-left: calc(3.9vw - 0.78125vw);
    margin-right: calc(3.9vw - 0.78125vw);
    padding-left: 0.78125vw;
    padding-right: 0.78125vw;
  }
  @media (max-width: ${Breakpoints.SMALL_LAPTOP}) {
    max-width: calc(100vw - (3.645vw - 0.78125vw) * 2);
    margin-left: calc(3.9vw - 0.78125vw);
    margin-right: calc(3.9vw - 0.78125vw);
    padding-left: 0.78125vw;
    padding-right: 0.78125vw;
  }
  @media (max-width: ${Breakpoints.TABLET_LANDSCAPE}) {
    max-width: calc(100vw - (3.645vw - 0.8rem) * 2);
    margin-left: calc(3.9vw - 0.78125vw);
    margin-right: calc(3.9vw - 0.78125vw);
    padding-left: 0.78125vw;
    padding-right: 0.78125vw;
  }
  @media (max-width: ${Breakpoints.TABLET_PORTRAIT}) {
    max-width: calc(100vw - (3.645vw - 1.5625vw) * 2);
    margin-left: calc(4.6875vw - 1.5625vw);
    margin-right: calc(4.6875vw - 1.5625vw);
    padding-left: 1.5625vw;
    padding-right: 1.5625vw;
  }
  @media (max-width: ${Breakpoints.PHONE}) {
    max-width: 100vw;
    padding-left: 5.6vw;
    padding-right: 5.6vw;
  }

  ${({ debug }) =>
    debug &&
    css`
      & ${Col} {
        border: 1px solid red;
      }
    `}
`;

Grid.Container = Container;
Grid.Row = Row;
Grid.Col = Col;
