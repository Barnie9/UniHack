import styled, { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';
import { ColorsX } from 'environment';
import { generateSpacingOffsets } from 'helpers';
import { SpacingOffsets } from 'types';

export const ClearInput = styled.input`
	/* TYPOGRAPHY SETTER */
	${getTypographyCSS(t => t.Paragraph)}

	/* REMOVE AUTOFIL BACKGROUND COLOR */
	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus,
	:-webkit-autofill:active {
		box-shadow: 0 0 0px 100rem white inset !important;
	}

	border: none;
	outline: none;
	padding: 0;
	flex: 1;

	::placeholder,
	::-webkit-input-placeholder {
		color: ${ColorsX.text.caption};
	}
`;

interface ContainerProps extends SpacingOffsets {
	disabled?: boolean;
	hasError?: boolean;
}
export const Container = styled.div<ContainerProps>`
	${({ paddingOffset, marginOffset, disabled, hasError }) => css`
		display: flex;
		flex-wrap: wrap;
		border: 0.1rem solid ${ColorsX.text.disabled};
		border-radius: 0.4rem;
		width: 100%;
		padding: 0.8rem;
		transition: all 0.2s;
		min-height: 4rem;
		gap: 0.8rem;

		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}

		${!hasError &&
		css`
			:focus-within {
				border: 0.1rem solid ${ColorsX.primary.normal};
			}
		`}


		${hasError &&
		css`
			border: 0.1rem solid ${ColorsX.text.error};
		`}
		${disabled &&
		css`
			cursor: not-allowed;
			background-color: ${ColorsX.background.disabled};
			border: 0;

			:focus-within {
				border: 0;
			}

			${ClearInput} {
				background-color: ${ColorsX.background.disabled};
				cursor: not-allowed;
				pointer-events: none;
			}
		`};
	`}
`;
