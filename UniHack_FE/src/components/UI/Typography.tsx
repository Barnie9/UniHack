import styled, { css } from "styled-components/macro";

import { ColorsX } from "environment/theme/ColorsX";
import { generateSpacingOffsets } from "helpers";
import { SpacingOffsets } from "types";

export enum FontWeights {
  thin = 100,
  extraLight = 200,
  light = 300,
  normal = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
  extraBold = 800,
  black = 900,
  extraBlack = 950,
}

export enum TypographyTypes {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",

  Paragraph = "Paragraph",
  Caption = "Caption",
  Hint = "Hint",
  Notification = "Notification",
  Tooltip = "Tooltip",
  Error = "Error",
}

const typographyStyles = {
  [TypographyTypes.H1]: {
    fontSize: 4.2,
    lineHeight: 1.19,
    fontWeight: FontWeights.bold,
    color: ColorsX.text.main,
  },
  [TypographyTypes.H2]: {
    fontSize: 3.6,
    lineHeight: 1.22,
    fontWeight: FontWeights.medium,
    color: ColorsX.text.main,
  },
  [TypographyTypes.H3]: {
    fontSize: 2.8,
    lineHeight: 1.43,
    fontWeight: FontWeights.bold,
    color: ColorsX.text.main,
  },
  [TypographyTypes.H4]: {
    fontSize: 2.2,
    lineHeight: 1.64,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.main,
  },
  [TypographyTypes.H5]: {
    fontSize: 2,
    lineHeight: 1.6,
    fontWeight: FontWeights.bold,
    color: ColorsX.text.main,
  },
  [TypographyTypes.H6]: {
    fontSize: 1.8,
    lineHeight: 1.56,
    fontWeight: FontWeights.medium,
    color: ColorsX.text.main,
  },

  [TypographyTypes.Paragraph]: {
    fontSize: 1.4,
    lineHeight: 1.57,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.main,
  },
  [TypographyTypes.Caption]: {
    fontSize: 1.2,
    lineHeight: 1.67,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.caption,
  },
  [TypographyTypes.Hint]: {
    fontSize: 1,
    lineHeight: 1.6,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.hint,
  },
  [TypographyTypes.Notification]: {
    fontSize: 1.2,
    lineHeight: 1.4,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.main,
  },
  [TypographyTypes.Tooltip]: {
    fontSize: 1.2,
    lineHeight: 1.33,
    fontWeight: FontWeights.normal,
    color: ColorsX.background.disabled,
  },
  [TypographyTypes.Error]: {
    fontSize: 1,
    lineHeight: 1.6,
    fontWeight: FontWeights.normal,
    color: ColorsX.text.error,
  },
};

export function getTypographyCSS(
  typography: (type: typeof TypographyTypes) => TypographyTypes
) {
  const type = typography(TypographyTypes);

  const { fontSize, lineHeight, fontWeight, color } = typographyStyles[type];

  return css`
    font-size: ${fontSize}rem;
    line-height: ${lineHeight};
    font-weight: ${fontWeight};
    color: ${color};
  `;
}

function generateFontWeight(fontWeight?: FontWeightFn) {
  if (fontWeight) {
    const weight = fontWeight(FontWeights);

    return css`
      font-weight: ${weight};
    `;
  }
}

type FontWeightFn = ((weight: typeof FontWeights) => FontWeights) | false;

interface TypographyProps extends SpacingOffsets {
  color?: string;
  multiline?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  alignCenter?: boolean;
  ellipsis?: boolean;
  breakWord?: boolean;
  fontweight?: FontWeightFn;
  clickable?: boolean;
  primaryColor?: boolean;
  //
  css?: string;
}

const Default = css<TypographyProps>`
  margin: 0;
  display: block;

  ${({
    color,
    multiline,
    lowercase,
    uppercase,
    alignCenter,
    ellipsis,
    breakWord,
    fontweight,
    clickable,
    primaryColor,
    css: _css,
    /////////////
    paddingOffset,
    marginOffset,
  }) => css`
    ${generateFontWeight(fontweight)}
    ${generateSpacingOffsets({ paddingOffset, marginOffset })}

		color: ${color};
    white-space: ${multiline && "pre-line"};
    text-transform: ${lowercase && "lowercase"};
    text-transform: ${uppercase && "uppercase"};
    text-align: ${alignCenter && "center"};

    ${ellipsis &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `}

    ${breakWord &&
    css`
      word-break: break-word;
    `}

		${clickable &&
    css`
      cursor: pointer;
    `}

		${primaryColor &&
    css`
      color: ${ColorsX.primary.normal};
    `}

		/* CUSTOM CSS */
		${_css}
  `}
`;

const H1 = styled.h1<TypographyProps>`
  ${getTypographyCSS((t) => t.H1)}
  ${Default};
`;

const H2 = styled.h2<TypographyProps>`
  ${getTypographyCSS((t) => t.H2)}
  ${Default};
`;

const H3 = styled.h3<TypographyProps>`
  ${getTypographyCSS((t) => t.H3)}
  ${Default};
`;

const H4 = styled.h4<TypographyProps>`
  ${getTypographyCSS((t) => t.H4)}
  ${Default};
`;

const H5 = styled.h5<TypographyProps>`
  ${getTypographyCSS((t) => t.H5)}
  ${Default};
`;

const H6 = styled.h6<TypographyProps>`
  ${getTypographyCSS((t) => t.H6)}
  ${Default};
`;

const Paragraph = styled.p<TypographyProps>`
  ${getTypographyCSS((t) => t.Paragraph)}
  ${Default};
`;

const Caption = styled.span<TypographyProps>`
  ${getTypographyCSS((t) => t.Caption)}
  ${Default};
`;

const Hint = styled.span<TypographyProps>`
  ${getTypographyCSS((t) => t.Hint)}
  ${Default};
`;

const Notification = styled.span<TypographyProps>`
  ${getTypographyCSS((t) => t.Notification)}
  ${Default};
`;

const Tooltip = styled.span<TypographyProps>`
  ${getTypographyCSS((t) => t.Tooltip)}
  ${Default};
`;

const Error = styled.span<TypographyProps>`
  ${getTypographyCSS((t) => t.Error)}
  ${Default};
`;

export function Typography() {
  return null;
}

Typography.H1 = H1;
Typography.H2 = H2;
Typography.H3 = H3;
Typography.H4 = H4;
Typography.H5 = H5;
Typography.H6 = H6;

Typography.Paragraph = Paragraph;
Typography.Caption = Caption;
Typography.Hint = Hint;
Typography.Notification = Notification;
Typography.Tooltip = Tooltip;
Typography.Error = Error;
