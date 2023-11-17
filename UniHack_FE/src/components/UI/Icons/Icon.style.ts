import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { generateSpacingOffsets } from 'helpers';
import { StyleColors, SpacingOffsets } from 'types';

import { IconVariants, IconSizes } from './Icon';

interface Props extends SpacingOffsets {
	variant: IconVariants;
	size: IconSizes;
	customSize?: number;
	colors?: StyleColors;
	rotate?: number;
	disabled?: boolean;
	active?: boolean;
	cursor?: string;
}

export const Container = styled.div<Props>`
	${({
		variant,
		size,
		customSize,
		paddingOffset,
		marginOffset,
		colors,
		rotate = 0,
		disabled,
		active,
		cursor = 'pointer'
	}) => css`
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: fit-content;
		user-select: none;

		/* default color */
		color: ${ColorsX.text.main};
		background-color: unset;

		transition: transform 0.2s, background-color 0.1s, color 0.1s, fill 0.1s;
		cursor: ${cursor};

		/* ICON SIZES */

		${size === IconSizes.m &&
		css`
			font-size: ${IconSizes.m}rem;
			padding: 0.4rem;
		`}

		${size === IconSizes.l &&
		css`
			font-size: ${IconSizes.l}rem;
			padding: 0.8rem;
		`}


		${customSize &&
		css`
			font-size: ${customSize}rem;
		`}


		/* ICON VARIANTS */

		${variant === IconVariants.simple &&
		css`
			padding: unset;

			:hover {
				${!active &&
				css`
					color: ${ColorsX.text.main};
				`}
			}

			${active &&
			css`
				color: ${ColorsX.primary.normal};
			`}
		`}

		${variant === IconVariants.button &&
		css`
			${!active &&
			css`
				:hover {
					color: ${ColorsX.text.main};
					background-color: ${ColorsX.background.disabled};
				}
			`}

			${active &&
			css`
				color: ${ColorsX.primary.normal};
				background-color: ${ColorsX.primary.disabled};
			`}
		`}

		${variant === IconVariants.buttonActive &&
		css`
			${!active &&
			css`
				:hover {
					color: ${ColorsX.primary.normal};
					background-color: ${ColorsX.primary.disabled};
				}
			`}

			${active &&
			css`
				color: ${ColorsX.primary.normal};
				background-color: ${ColorsX.primary.disabled};
			`}
		`}


		/* ICON CUSTOM COLORS */

		${colors &&
		css`
			color: ${colors.color};
			background: ${colors.background};

			:hover {
				color: ${colors.hover ? colors.hover : colors.color};
				background: ${colors.hoverBackground};
			}

			${active &&
			css`
				color: ${colors.active ? colors.active : colors.color};
				background: ${colors.activeBackground};
			`}

			${disabled &&
			css`
				color: ${colors.disabled};
				background: ${colors.disabledBackground};
			`}
		`}

			/* SPACING OFFSETS */
			${generateSpacingOffsets({ paddingOffset, marginOffset })}


		/* OTHER PROPS */
		${disabled &&
		css`
			color: ${ColorsX.text.disabled};
			background-color: unset;
			pointer-events: none;
		`}

		${rotate &&
		css`
			transform: rotate(${rotate}deg);
		`}
	`}
`;
