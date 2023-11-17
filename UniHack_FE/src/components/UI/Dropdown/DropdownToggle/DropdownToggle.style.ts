import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { Icon as DefaultIcon } from 'components/UI/Icons/Icon';
import { Disabled } from 'helpers';
import { Typography } from 'components/UI/Typography';

interface ButtonProps extends Disabled {
	open: boolean;
	error?: string;
}

export const Title = styled(Typography.Paragraph)`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const Icon = styled(DefaultIcon)<IconProps>`
	transition: transform 0.25s;
	transform: ${({ open }) => open && 'rotate(180deg)'};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	user-select: none;
`;

export const Button = styled.div<ButtonProps>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.8rem;
	height: 4rem;
	border-radius: 0.4rem;
	cursor: pointer;
	transition: all 0.2s;

	${({ open }) =>
		open
			? css`
					border: 0.12rem solid ${ColorsX.primary.normal};
			  `
			: css`
					border: 0.12rem solid ${ColorsX.text.disabled};
			  `}

	${({ error }) =>
		error &&
		css`
			border: 0.12rem solid ${ColorsX.text.error};
		`}

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
			border: 0.12rem solid ${ColorsX.background.disabled};
			background-color: ${ColorsX.background.disabled};

			${Title} {
				color: ${ColorsX.text.disabled};
			}
		`}
`;

interface IconProps {
	open: boolean;
}
