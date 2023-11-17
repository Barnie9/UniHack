import styled, { css } from 'styled-components/macro';

import { ColorsX, ScrollBarStyle, Shadows } from 'environment';
import { Disabled } from 'helpers';
import { getTypographyCSS, FontWeights } from 'components/UI/Typography';

export const Container = styled.div`
	width: 100%;
	position: relative;
`;

export const AutoScrollWrapper = styled.div``;

export const SearchValueContainer = styled.div`
	display: flex;
	align-items: center;
	overflow: hidden;
`;

interface SelectContainerProps extends Disabled {
	error?: boolean;
	hasValue?: boolean;
	allowCreate?: boolean;
	readOnly?: boolean;
}
export const SelectContainer = styled.div<SelectContainerProps>`
	width: 100%;
	background-color: ${ColorsX.white};

	.select-container {
		/* TYPOGRAPHY SETTER */
		${getTypographyCSS(t => t.Paragraph)}

		min-height: 4rem;
	}

	.select__option--is-focused {
		background-color: unset;
	}

	.select__option--is-disabled {
		cursor: default !important;
		color: ${ColorsX.text.disabled} !important;
	}

	.select__menu {
		margin-top: 0.4rem;
		box-shadow: ${Shadows.hover};
	}

	.select__menu-list {
		padding: 0.8rem 0;
		overflow-y: auto;
		overflow-y: overlay;

		scrollbar-width: thin;
		scrollbar-color: #748394 transparent;

		> :first-child {
			margin-top: 0;
		}
		> :last-child {
			margin-bottom: 0;
		}

		${ScrollBarStyle}
	}

	.select__control {
		box-shadow: unset;
		min-height: 4rem;
		border: 0.12rem solid ${({ error }) => (error ? ColorsX.text.error : ColorsX.text.disabled)};
		background-color: ${ColorsX.white};
		cursor: ${({ allowCreate }) => (allowCreate ? 'text' : 'pointer')};
	}

	.select__dropdown-indicator {
		padding: 0;
		margin-right: 0.8rem;
		color: ${ColorsX.text.main};
		transition: transform 0.25s;

		:hover {
			color: ${ColorsX.text.main};
		}

		svg {
			:hover {
				color: ${ColorsX.text.main};
			}
		}
	}

	.select__clear-indicator {
		padding: 0;
		margin-right: 0.8rem;
		color: ${ColorsX.text.disabled};
		transition: transform 0.25s;

		:hover {
			color: ${ColorsX.text.main};
		}

		svg {
			height: 1.6rem;
			width: 1.6rem;

			:hover {
				color: ${ColorsX.text.main};
			}
		}
	}

	.select__indicators,
	.select__menu,
	.select__menu-list,
	.select__option,
	.select__multi-value__remove {
		cursor: pointer;
	}

	.select__multi-value__remove:hover {
		background-color: unset;
		color: unset;
	}

	.select__option {
		/* enable next 3 lines if we want options to be displayed on a single line */
		/* white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
		padding: 0.4rem 0.8rem;

		:active {
			background: ${ColorsX.primary.normal};
			color: ${ColorsX.white};
		}
	}

	.select__option--is-selected {
		background: ${ColorsX.white};
		color: ${ColorsX.primary.normal};
	}

	.select__option {
		:hover {
			background: ${ColorsX.primary.normal};
			color: ${ColorsX.white};
		}
	}

	.select__control--is-focused {
		border: 0.12rem solid ${ColorsX.primary.normal};

		.select__dropdown-indicator {
			transform: rotate(180deg);
		}

		:hover {
			border: 0.12rem solid ${ColorsX.primary.normal};
		}
	}

	.select__placeholder {
		color: ${ColorsX.text.caption};
	}

	.select__multi-value {
		border-radius: 0.4rem;
		color: ${ColorsX.primary.normal};
		background-color: ${ColorsX.primary.disabled};

		.select__multi-value__label {
			${getTypographyCSS(t => t.Caption)}
			color: ${ColorsX.primary.normal};
			font-weight: ${FontWeights.medium};
			padding: 0.1rem 0;
			padding-left: 0.8rem;
		}
	}

	.select__indicator-separator {
		display: none;
	}

	.select__group {
		padding: 0;
		margin: 0.8rem 0;

		.select__group-heading {
			${getTypographyCSS(t => t.Hint)}

			margin: 0;
			padding: 0 0.8rem;
			color: ${ColorsX.text.disabled};
		}
	}

	${({ readOnly }) =>
		readOnly &&
		css`
			pointer-events: none;

			.select__control {
				border-color: ${ColorsX.text.disabled};
				background-color: ${ColorsX.background.disabled};
			}

			.select__placeholder {
				color: ${ColorsX.text.disabled};
			}

			.select__clear-indicator {
				display: none;
			}
		`};

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;

			.select__control {
				border-color: ${ColorsX.background.disabled};
				background-color: ${ColorsX.background.disabled};
			}

			.select__placeholder,
			.select__value-container,
			.select__single-value {
				color: ${ColorsX.text.disabled};
			}

			.select__indicators {
				display: none;
			}
		`};

	${({ error }) =>
		error &&
		css`
			.select__control--is-focused,
			.select__control--is-focused:hover,
			.select__control:hover,
			.select__control:active {
				border: 0.12rem solid ${ColorsX.text.error};
			}
		`}
`;
