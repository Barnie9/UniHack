import styled, { css } from 'styled-components/macro';

import { Typography } from 'components/UI/Typography';
import { Colors, Shadows } from 'environment';
import { SpacingOffsets } from 'types';
import { generateSpacingOffsets } from 'helpers';

export const Container = styled.div<SpacingOffsets>`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.8rem;
	margin-bottom: 1rem;
	border-radius: 0.4rem;
	background-color: ${Colors.white};
	position: relative;

	${({ marginOffset, paddingOffset }) => css`
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		z-index: -1;
		box-shadow: ${Shadows.normal};
	}
`;

interface HeaderProps {
	disabled?: boolean;
}

export const Header = styled.div<HeaderProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	cursor: ${({ disabled }) => !disabled && 'pointer'};
`;

export const Title = styled(Typography.Paragraph)`
	display: flex;
	flex: 1;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	user-select: none;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin: 0.8rem 0;
	text-align: left;
`;

export const IconWrapper = styled.div`
	position: relative;
	min-width: 2.4rem;
	min-height: 2.4rem;
`;
