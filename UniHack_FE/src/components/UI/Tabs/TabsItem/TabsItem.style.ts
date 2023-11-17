import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { getMarginOffset } from 'helpers';
import { Typography, FontWeights } from 'components/UI/Typography';
import { StyleOffset } from 'types';

export const Text = styled(Typography.Paragraph)``;

interface ContainerProps {
	active: boolean;
	marginOffset?: StyleOffset;
}
export const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	min-width: 10.8rem;
	padding: 2.5rem 0;
	cursor: pointer;
	position: relative;
	user-select: none;

	::after {
		display: block;
		content: '';
		width: 3.6rem;
		height: 0.2rem;
		border-radius: 0 0 0.4rem 0.4rem;
		background-color: ${ColorsX.primary.normal};
		position: absolute;
		bottom: 0;
		opacity: 0;
	}

	:hover {
		${Text} {
			color: ${ColorsX.primary.normal};
		}
	}

	${({ active }) =>
		active &&
		css`
			::after {
				opacity: 1;
			}

			${Text} {
				color: ${ColorsX.primary.normal};
				font-weight: ${FontWeights.medium};
			}
		`}

	${({ marginOffset }) => marginOffset && getMarginOffset(marginOffset)}
`;
