import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { getTypographyCSS } from 'components/UI/Typography';

interface WrapperProps {
	small?: boolean;
	meridian?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
}
export const Wrapper = styled.div<WrapperProps>`
	${({ small, meridian, disabled, readOnly }) => css`
		display: flex;
		justify-content: space-between;

		margin-top: ${(small || meridian) && 0.4}rem;
		margin-left: ${small || meridian ? '0' : '0.8rem'};

		height: ${small ? 2.64 : 4}rem;

		${meridian &&
		css`
			> :nth-child(n) {
				width: calc(50% - 0.2rem);
			}
		`}

		${readOnly &&
		css`
			pointer-events: none;

			${TimeSelect} {
				cursor: unset;
				border-color: ${ColorsX.text.disabled};
				background-color: ${ColorsX.background.disabled};

				input {
					background-color: ${ColorsX.background.disabled};

					::placeholder,
					::-webkit-input-placeholder {
						background-color: ${ColorsX.background.disabled};
					}
				}
			}
		`};

		${disabled &&
		css`
			pointer-events: none;

			${TimeSelect} {
				cursor: unset;
				border-color: ${ColorsX.background.disabled};
				background-color: ${ColorsX.background.disabled};

				input {
					color: ${ColorsX.text.disabled};
					background-color: ${ColorsX.background.disabled};

					::placeholder,
					::-webkit-input-placeholder {
						background-color: ${ColorsX.text.disabled};
					}
				}

				.time-input__toggle-icon,
				.time-input__hour-divider {
					color: ${ColorsX.text.disabled};
				}
			}
		`};
	`}

	/* TODO: make this global */
	.creatable-select-small {
		.select-container {
			min-height: 2.4rem;
		}

		.select__control {
			min-height: 2.4rem;
		}

		.select__value-container {
			height: 2.4rem;
			min-height: 2.4rem;
			align-items: center;

			> :last-child {
				height: 2rem;
				margin: 0;
				padding: 0;

				.select__input[style] {
					display: flex !important;
				}

				input,
				.select__input {
					height: 2rem;
				}
			}
		}

		.select__single-value {
			${getTypographyCSS(t => t.Caption)}

			color: ${ColorsX.text.main};
			height: 2rem;
			margin: 0;
		}

		.select__placeholder {
			${getTypographyCSS(t => t.Caption)}

			color: ${ColorsX.text.disabled};
			margin: 0;
			padding: 0;
		}

		input[style] {
			${getTypographyCSS(t => t.Caption)}

			color: ${ColorsX.text.main};
		}

		input {
			${getTypographyCSS(t => t.Caption)}

			color: ${ColorsX.text.main};
			font-size: 1.2rem !important;
		}
	}
`;

interface TimeSelectProps {
	open: boolean;
	meridian?: boolean;
	error?: boolean;
}
export const TimeSelect = styled.div<TimeSelectProps>`
	display: flex;
	position: relative;
	cursor: pointer;
	padding: 0 0.8rem;
	border-radius: 0.4rem;
	border: solid 0.12rem
		${({ open, error }) =>
			open ? ColorsX.primary.normal : error ? ColorsX.text.error : ColorsX.text.disabled};
	background-color: ${ColorsX.white};
	transition: 0.1s;
	width: ${({ meridian }) => (meridian ? '100%' : '9.6rem')};
`;

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

	height: 100%;
	border: none;
	outline: none;
	padding: 0;
	color: ${ColorsX.text.main};

	::placeholder,
	::-webkit-input-placeholder {
		color: ${ColorsX.text.caption};
	}
`;
