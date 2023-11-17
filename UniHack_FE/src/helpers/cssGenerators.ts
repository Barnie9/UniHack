import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { StyleOffsets, SpacingOffsets } from 'types';

export interface Disabled {
	disabled?: boolean;
}

export function disableableComponent({ disabled }: Disabled) {
	if (!disabled) return '';

	return css`
		opacity: 0.5;
		transition: opacity 0.1s ease-out;
		pointer-events: none;
	`;
}

export const DisableableContainer = styled.div<Disabled>`
	${({ disabled }) => disableableComponent({ disabled })}
`;

export function getPaddingOffset(paddingOffset?: StyleOffsets) {
	if (!paddingOffset) return;

	return css`
		padding-top: ${paddingOffset.top !== undefined && `${paddingOffset.top}rem`};
		padding-right: ${paddingOffset.right !== undefined && `${paddingOffset.right}rem`};
		padding-bottom: ${paddingOffset.bottom !== undefined && `${paddingOffset.bottom}rem`};
		padding-left: ${paddingOffset.left !== undefined && `${paddingOffset.left}rem`};

		${paddingOffset.x !== undefined &&
		paddingOffset.y !== undefined &&
		css`
			padding: ${paddingOffset.y}rem ${paddingOffset.x}rem;
		`}
		${paddingOffset.x !== undefined &&
		paddingOffset.y === undefined &&
		css`
			padding-left: ${paddingOffset.x}rem;
			padding-right: ${paddingOffset.x}rem;
		`}
		${paddingOffset.y !== undefined &&
		paddingOffset.x === undefined &&
		css`
			padding-top: ${paddingOffset.y}rem;
			padding-bottom: ${paddingOffset.y}rem;
		`}
		${paddingOffset.all !== undefined &&
		css`
			padding: ${paddingOffset.all}rem;
		`}
		${paddingOffset.custom !== undefined &&
		css`
			padding: ${paddingOffset.custom};
		`}
	`;
}

export function getMarginOffset(marginOffset?: StyleOffsets) {
	if (!marginOffset) return;

	return css`
		margin-top: ${marginOffset.top !== undefined && `${marginOffset.top}rem`};
		margin-right: ${marginOffset.right !== undefined && `${marginOffset.right}rem`};
		margin-bottom: ${marginOffset.bottom !== undefined && `${marginOffset.bottom}rem`};
		margin-left: ${marginOffset.left !== undefined && `${marginOffset.left}rem`};

		${marginOffset.x !== undefined &&
		marginOffset.y !== undefined &&
		css`
			margin: ${marginOffset.y}rem ${marginOffset.x}rem;
		`}
		${marginOffset.x !== undefined &&
		marginOffset.y === undefined &&
		css`
			margin-left: ${marginOffset.x}rem;
			margin-right: ${marginOffset.x}rem;
		`}
		${marginOffset.y !== undefined &&
		marginOffset.x === undefined &&
		css`
			margin-top: ${marginOffset.y}rem;
			margin-bottom: ${marginOffset.y}rem;
		`}
		${marginOffset.all !== undefined &&
		css`
			margin: ${marginOffset.all}rem;
		`}
		${marginOffset.custom !== undefined &&
		css`
			margin: ${marginOffset.custom};
		`}
	`;
}

export function generateSpacingOffsets({ paddingOffset, marginOffset }: SpacingOffsets) {
	return css`
		/* MARGIN OFFSET */
		${getMarginOffset(marginOffset)}
		/* PADDING OFFSET */
		${getPaddingOffset(paddingOffset)}
	`;
}

// BORDERS //

export const borderDefault = css`
	border: solid 2px ${ColorsX.text.caption};
`;
export const borderDisabled = css`
	border: solid 2px ${ColorsX.text.disabled};
`;
export const borderActive = css`
	border: solid 2px ${ColorsX.primary.normal};
`;
export const borderActiveDisabled = css`
	border: solid 2px ${ColorsX.primary.disabled};
`;

// BORDERS //

/**
 * Concatenates the hex transparency value to the hex string.
 * @param hexColor ex. #aabbcc
 * @param transparency ex. 0.3
 */
export function transparentHex(hexColor: string, transparency: number) {
	const transparencyPercentage = transparency * 100;
	const decimal = Math.round((transparencyPercentage * 255) / 100);
	return hexColor + decimal.toString(16);
}

export function getMultilineEllipsisCSS(lines: number) {
	return css`
		display: -webkit-box;
		-webkit-line-clamp: ${lines};
		-webkit-box-orient: vertical;
		overflow: hidden;
	`;
}
