import { animated } from 'react-spring';
import styled, { css } from 'styled-components/macro';

import { Input as DefaultInput } from 'components/UI/Inputs/Input';
import { Colors, Shadows, MediaQueries } from 'environment';
import { Nullable, Offset, SpacingOffsets } from 'types';
import { Typography } from 'components/UI/Typography';
import { generateSpacingOffsets, showOnTouchDevices } from 'helpers';

interface ContainerProps {
	inline: boolean;
}

interface PositionProps {
	left?: number;
	bottom?: Nullable<boolean>;
	hide?: boolean;
	offset?: Offset;
}

interface TokenTipProps {
	tokenCode?: boolean;
	iconVisible?: boolean;
}

export const Container = styled.div<ContainerProps>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	min-width: 2rem;
	height: 2rem;

	@media print {
		display: none;
	}
`;

export const IconWrapper = styled.div.attrs(() => ({
	className: showOnTouchDevices('tooltip__icon')
}))<TokenTipProps & SpacingOffsets>`
	position: absolute;
	align-items: center;
	visibility: hidden;

	@media ${MediaQueries.maxWidth.sm} {
		position: relative;
		display: flex;
		flex: 1;
	}

	${({ marginOffset, paddingOffset }) =>
		css`
			${generateSpacingOffsets({ paddingOffset, marginOffset })}
		`}

	${({ iconVisible }) =>
		iconVisible &&
		css`
			visibility: visible;
		`}

	${({ tokenCode }) =>
		tokenCode &&
		css`
			top: 6rem;
			right: 3.5rem;
		`}
`;

interface WrapperProps {
	zIndex: number;
	width: number;
}

const StyledTooltipWrapper = styled.div<WrapperProps & PositionProps & TokenTipProps>`
	transition: opacity 0.2s;
	z-index: 12;
	position: absolute;
	${({ zIndex }) =>
		zIndex &&
		css`
			z-index: ${zIndex};
		`};

	${({ width, left = 0, bottom, hide = false, offset }) =>
		css`
			width: 40rem;
			opacity: ${hide && 0};
			left: ${`calc(-${width / 2}px + 1.3rem - ${left}px)`};
			bottom: ${bottom ? 'auto' : offset?.bottom ? `${offset.bottom}rem` : '3rem'};
			top: ${bottom ? '5rem' : 'auto'};
			margin-top: ${'0'};
		`}
	${({ tokenCode }) =>
		tokenCode &&
		css`
			transition: opacity 0.2s;
			z-index: 12;
			position: relative;
			width: 104%;
			bottom: 0rem;
			margin-top: 4rem;
			left: 0;
			padding-left: 9.9rem;
		`};
`;
export const TooltipWrapper = animated(StyledTooltipWrapper);

export const Tooltip = styled.div<PositionProps & TokenTipProps>`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.4rem;
	background-color: ${Colors.white};
	box-shadow: ${Shadows.normal};

	${({ bottom, left = 0 }) =>
		!bottom
			? css`
					bottom: 0.6rem;

					&::after {
						content: '';
						position: absolute;
						top: 100%;
						left: calc(50% + ${left + 10}px);
						margin-left: -1.6rem;
						border-width: 1rem;
						border-style: solid;
						border-color: ${Colors.white} transparent transparent transparent;

						@media ${MediaQueries.maxWidth.sm} {
							left: calc(50% + 20px);
						}
					}
			  `
			: css`
					&::after {
						content: '';
						position: absolute;
						top: unset;
						bottom: 100%;
						left: calc(50% + ${left + 10}px);
						margin-left: -1rem;
						border-width: 1rem;
						border-style: solid;
						border-color: transparent transparent ${Colors.white} transparent;
					}
			  `}
	p {
		max-height: 20rem;
		overflow-y: auto;
		padding: 0.8rem;
	}
`;

export const Text = styled(Typography.Paragraph)`
	white-space: pre-line;
`;

export const TokenText = styled(DefaultInput)`
	input {
		border: none;
		outline: none;
	}
`;
