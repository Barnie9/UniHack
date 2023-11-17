import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { generateSpacingOffsets } from 'helpers';
import { Dropdown as DefaultDropdown } from 'components/UI/Dropdown';
import { Button as DefaultButton } from 'components/UI/Interactables/Button';
import { SpacingOffsets } from 'types';

import { ButtonVariants } from './SplitButton';

type ToggleIconContainerProps = {
	variant: ButtonVariants;
	disabled?: boolean;
	clickable?: boolean;
};
export const ToggleIconContainer = styled.div<ToggleIconContainerProps>`
	width: 4rem;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border: ${({ variant }) =>
		variant === ButtonVariants.outline && `0.1rem solid ${ColorsX.primary.normal}`};
	border-left: ${({ variant }) =>
		variant === ButtonVariants.primary ? `0.1rem solid ${ColorsX.white}` : 'none'};
	border-top-right-radius: 0.4rem;
	border-bottom-right-radius: 0.4rem;
	cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

	${({ variant, disabled }) =>
		variant &&
		css`
			background-color: ${variant === ButtonVariants.outline
				? ColorsX.transparent
				: ColorsX.primary.normal};
			${!disabled &&
			css`
				:hover {
					background-color: ${variant === ButtonVariants.outline
						? ColorsX.primary.disabled
						: ColorsX.primary.hover};
				}
			`}

			${disabled &&
			css`
				border: ${variant === ButtonVariants.outline &&
				`0.1rem solid ${ColorsX.text.disabled}`};
				border-left: ${variant === ButtonVariants.primary
					? `0.1rem solid ${ColorsX.white}`
					: 'none'};
				background-color: ${variant === ButtonVariants.primary &&
				ColorsX.background.disabled};
			`}
		`}
`;

type ContainerProps = SpacingOffsets & {
	height?: number;
	minHeight: number;
};
export const Container = styled.div<ContainerProps>`
	${({ marginOffset, paddingOffset, height, minHeight }) => css`
		display: flex;
		height: ${height}rem;
		min-height: ${minHeight}rem;
		align-items: center;

		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;

export const Dropdown = styled(DefaultDropdown)<ContainerProps>`
	${({ height, minHeight }) => css`
		height: ${height ?? 4}rem;
		min-height: ${minHeight}rem;
		width: 4rem;
	`}
`;

export const Button = styled(DefaultButton)`
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
`;
