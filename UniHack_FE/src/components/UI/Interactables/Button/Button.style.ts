import styled, { css } from 'styled-components/macro';

import { getTypographyCSS, FontWeights } from 'components/UI/Typography';
import { ColorsX, MediaQueries } from 'environment';
import { generateSpacingOffsets } from 'helpers';

import { ButtonVariants, ButtonStyleProps } from './Button';

interface Props extends ButtonStyleProps {
	variant: string;
	clickable: boolean;
	isLoading?: boolean;
}

export const Container = styled.button.attrs<Props>(() => ({
	className: 'textRegular'
}))<Props>`
	${({
		variant,
		width,
		minWidth,
		maxWidth,
		minHeight,
		marginOffset,
		paddingOffset,
		hasFullWidth,
		isLoading,
		disabled,
		clickable,
		smallerOnMobile,
		hasPointer
	}) => css`
		/* TYPOGRAPHY SETTER */
		${getTypographyCSS(t => t.Paragraph)}
		font-weight: ${FontWeights.medium};

		/* SETTERS */
		padding: 0.8rem 1.6rem;
		min-width: ${minWidth ?? 14}rem;
		min-height: ${minHeight ?? 4}rem;
		transition: opacity 0.1s, background-color 0.1s;
		cursor: ${clickable || hasPointer ? 'pointer' : 'default'};
		border-radius: 0.4rem;

		/* LOADING SPINNER */
		position: relative;
		/* MAKE THE LOADING SPINNER CENTERED */
		> div {
			position: absolute;
			/* 
				KEEP FOR SAFARI SUPPORT AS WELL
				'inset: 0;' does not work
			*/
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}

		/* RESETTERS */
		border: none;
		user-select: none;
		text-decoration: none;
		
		&:focus {
			outline: none;
			box-shadow: none;
			outline: -webkit-focus-ring-color auto 0px;
		}

		/* 
			=============
			BUTTON TYPES
			=============
		*/

		/* PRIMARY */
		${
			variant === ButtonVariants.primary &&
			css`
				color: ${ColorsX.white};
				background-color: ${ColorsX.primary.normal};

				:hover {
					background-color: ${ColorsX.primary.hover};
				}

				${disabled &&
				css`
					color: ${ColorsX.text.disabled};
					background-color: ${ColorsX.background.disabled};
				`}
			`
		}

		/* SECONDARY */
		${
			variant === ButtonVariants.secondary &&
			css`
				color: ${ColorsX.text.main};
				background-color: ${ColorsX.background.disabled};

				:hover {
					color: ${ColorsX.primary.normal};
				}

				${disabled &&
				css`
					color: ${ColorsX.text.disabled};
					background-color: transparent;
				`}
			`
		}

		/* OUTLINE */
		${
			variant === ButtonVariants.outline &&
			css`
				color: ${ColorsX.primary.normal};
				border: 1px solid ${ColorsX.primary.normal};
				background-color: ${ColorsX.transparent};
				/* 
					SINCE BORDER INCREASES THE HEIGHT WITH 2PX
					WE NEED TO DECREASE THE INNER PADDING WITH 2PX - 0.7REM Y-AXIS
					SO THE HEIGHT OF THE BUTTON REMAINS THE SAME
				*/
				padding: 0.7rem 1.6rem;

				:hover {
					color: ${ColorsX.primary.hover};
					border: 1px solid ${ColorsX.primary.hover};
					background-color: ${ColorsX.primary.disabled};
				}

				${disabled &&
				css`
					color: ${ColorsX.text.disabled};
					border: 1px solid ${ColorsX.text.disabled};
				`}
			`
		}

			
		/* WARNING */
		${
			variant === ButtonVariants.warning &&
			css`
				color: ${ColorsX.white};
				background-color: ${ColorsX.text.error};

				:hover {
					background-color: ${ColorsX.text.errorHover};
				}

				${disabled &&
				css`
					background-color: ${ColorsX.background.disabled};
					color: ${ColorsX.text.disabled};
				`}
			`
		}

			/* DANGER LINK */
			${
				variant === ButtonVariants.link &&
				css`
					color: ${ColorsX.primary.normal};
					background-color: unset;
					min-width: ${minWidth ?? 0}rem;
					padding: 0 0.5rem;
					min-height: unset;

					${disabled &&
					css`
						color: ${ColorsX.text.disabled};
					`}
				`
			}

				/* UPGRADE */
				${
					variant === ButtonVariants.upgrade &&
					css`
						color: ${ColorsX.seriesGreen};
						border: 1px solid ${ColorsX.seriesGreen};
						background-color: ${ColorsX.transparent};
						min-height: unset;
						min-width: unset;

						padding: 0.2rem 0.8rem;

						:hover {
							color: ${ColorsX.seriesGreen};
							border: 1px solid ${ColorsX.seriesGreen};
							background-color: ${ColorsX.transparent};
						}

						${disabled &&
						css`
							color: ${ColorsX.text.disabled};
							border: 1px solid ${ColorsX.text.disabled};
						`}
					`
				}

		${
			width !== undefined &&
			css`
				width: ${width}rem;
			`
		}

		${
			maxWidth !== undefined &&
			css`
				max-width: ${maxWidth}rem;
			`
		}

		${
			hasFullWidth &&
			css`
				width: 100%;
			`
		}

		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}

		${
			disabled &&
			css`
				pointer-events: none;
			`
		}

		${
			isLoading &&
			css`
				color: transparent !important;
			`
		};

		${
			smallerOnMobile &&
			css`
				@media ${MediaQueries.maxWidth.md} {
					font-size: 1.4rem;
				}
				@media ${MediaQueries.maxWidth.sm} {
					font-size: 1.2rem;
				}
			`
		}
	}
	`}
`;
