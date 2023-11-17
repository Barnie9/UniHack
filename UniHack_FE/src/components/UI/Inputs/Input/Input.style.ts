import styled, { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';
import { Colors, ColorsX } from 'environment';
import { Disabled, generateSpacingOffsets } from 'helpers';
import { SpacingOffsets } from 'types';

export const Container = styled.div<SpacingOffsets>`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;

	/* SPACING OFFSETS */
	${({ marginOffset, paddingOffset }) => css`
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;

export const Row = styled.div`
	display: flex;
`;

interface InputProps extends Disabled {
	readOnly?: boolean;
	error?: boolean;
	center?: boolean;
}

export const RegularInput = styled.input<InputProps>`
	/* REMOVE AUTOFIL BACKGROUND COLOR */
	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus,
	:-webkit-autofill:active {
		box-shadow: 0 0 0px 100rem white inset !important;
	}

	@media print {
		background-color: ${Colors.gray.lightest};
	}

	${({ disabled, readOnly, error, center }) => css`
		/* TYPOGRAPHY SETTER */
		${getTypographyCSS(t => t.Paragraph)}

		height: 4rem;
		padding: 0.9rem 0.8rem;
		border-radius: 0.4rem;
		border: 0.12rem solid ${error ? ColorsX.text.error : ColorsX.text.disabled};
		background-color: ${ColorsX.white};
		width: 100%;
		text-align: ${center ? 'center' : 'left'};
		transition: 0.1s;

		:focus {
			border-color: ${error ? ColorsX.text.error : ColorsX.primary.normal};
			background-color: ${ColorsX.white};
			outline: unset;
			outline-offset: 0;
		}

		::placeholder,
		::-webkit-input-placeholder {
			color: ${ColorsX.text.caption};
		}

		${readOnly &&
		css`
			background-color: ${ColorsX.background.disabled};

			:focus {
				border-color: ${ColorsX.text.disabled};
				background-color: ${ColorsX.background.disabled};
			}
		`};

		${disabled &&
		css`
			pointer-events: none;
			background-color: ${ColorsX.background.disabled};
			border: 0.12rem solid ${ColorsX.background.disabled};

			color: ${ColorsX.text.disabled};

			::placeholder,
			::-webkit-input-placeholder {
				color: ${ColorsX.text.disabled};
			}
		`};
	`}
`;
