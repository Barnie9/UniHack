import styled, { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';
import { ColorsX } from 'environment';
import { Breakpoints } from 'components/UI/Grid';

export const Input = styled.input`
	/* TYPOGRAPHY SETTER */
	${getTypographyCSS(t => t.Paragraph)}

	/* REMOVE AUTOFIL BACKGROUND COLOR */
	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus,
	:-webkit-autofill:active {
		box-shadow: 0 0 0px 100rem white inset !important;
	}

	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	padding: 0;
	color: ${ColorsX.text.main};

	::placeholder {
		color: ${ColorsX.text.caption};
	}
`;

interface ContainerProps {
	disabled?: boolean;
	usedInHeader?: boolean;
	focused?: boolean;
}

export const Container = styled.div<ContainerProps>`
	${({ disabled }) => css`
		width: 100%;
		height: 4rem;
		min-height: 4rem;
		padding: 0.8rem;
		display: flex;
		align-items: center;
		border: 0.1rem solid ${ColorsX.text.disabled};
		border-radius: 0.4rem;
		transition: all 0.2s;

		${!disabled &&
		css`
			:focus-within {
				border: 0.1rem solid ${ColorsX.primary.normal};
			}
		`}

		${disabled &&
		css`
			border: 0.1rem solid ${ColorsX.transparent};
			cursor: not-allowed;
			background-color: ${ColorsX.background.disabled};

			${Input} {
				cursor: not-allowed;
				pointer-events: none;
				background-color: ${ColorsX.background.disabled};
			}
		`};
	`}

	${({ usedInHeader, focused }) =>
		usedInHeader &&
		css`
			@media (max-width: ${Breakpoints.TABLET_PORTRAIT}) {
				justify-content: flex-end;

				${focused
					? css`
							position: absolute;
							z-index: 99;

							transition: background-color 0s;
							background-color: ${ColorsX.white};

							/* SPACING LIKE GRID SYSTEM */
							left: 4%;
							width: 92vw;
					  `
					: css`
							border: none;

							${Input} {
								opacity: 0;
								width: 0;
							}
					  `}
			}
		`};
`;
