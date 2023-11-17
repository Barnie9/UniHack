import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { Disabled, generateSpacingOffsets } from 'helpers';
import { SpacingOffsets } from 'types';

interface ContainerProps extends Disabled, SpacingOffsets {
	reverse?: boolean;
}

export const Container = styled.div<ContainerProps>`
	display: flex;
	user-select: none;
	cursor: pointer;

	.switch-label-container {
		margin-left: 1.4rem;
	}

	${({ reverse }) =>
		reverse &&
		css`
			flex-direction: row-reverse;

			.switch-label-container {
				margin-left: unset;
				margin-right: 1.4rem;
				align-items: flex-end;
			}
		`}

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
		`}

	/* SPACING OFFSETS */
	${({ marginOffset, paddingOffset }) => css`
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;

interface SliderContainerProps {
	size: number;
}
export const SliderContainer = styled.div<SliderContainerProps>`
	position: relative;
	display: flex;
	align-items: center;

	height: ${({ size }) => `${size}rem`};
	width: ${({ size }) => `${size * 1.7}rem`};
	min-width: ${({ size }) => `${size * 1.7}rem`};
`;

interface SliderProps extends SliderContainerProps {
	checked?: boolean;
	disabled?: boolean;
}
export const Slider = styled.span<SliderProps>`
	cursor: pointer;
	background-color: ${ColorsX.text.disabled};
	transition: background-color 0.15s;
	transition-delay: 0.1s;
	border-radius: ${({ size }) => `${size / 2}rem`};
	height: 0.8rem;
	width: 3.6rem;

	${({ checked, disabled }) => {
		if (checked) {
			if (disabled) {
				return css`
					background-color: ${ColorsX.primary.disabled};
				`;
			}

			return css`
				background-color: ${ColorsX.primary.normal};
			`;
		} else {
			if (disabled) {
				return css`
					background-color: ${ColorsX.background.disabled};
				`;
			}

			return css`
				background-color: ${ColorsX.text.disabled};
			`;
		}
	}}
	::before {
		${({ checked }) =>
			checked &&
			css`
				transform: translateX(80%);
			`}

		position: absolute;
		left: 0;
		bottom: 10%;
		width: 2rem;
		height: 2rem;
		background-color: white;
		transition: transform ease-in 0.15s;
		border-radius: 50%;
		box-shadow: 0 1px 2px 0 rgba(37, 37, 58, 0.1), 0 2px 4px 0 rgba(37, 37, 58, 0.15),
			0 -1px 2px 0 rgba(37, 37, 58, 0.05);
		content: '';
	}
`;
