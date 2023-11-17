import styled, { css } from 'styled-components/macro';

import { Colors, ColorsX } from 'environment';
import { Typography } from 'components/UI/Typography';

interface ContainerProps {
	small?: boolean;
	smallPadding?: boolean;
	disabled?: boolean;
}

export const Paragraph = styled(Typography.Paragraph)``;

export const Container = styled.div<ContainerProps>`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	background-color: ${Colors.white};

	min-height: 3rem;
	padding: 0.4rem 0.8rem;
	cursor: pointer;

	${({ disabled }) =>
		disabled
			? css`
					> p,
					> svg {
						opacity: 0.5;
					}
			  `
			: css`
					:hover {
						background-color: ${ColorsX.primary.normal};

						${Paragraph} {
							color: ${Colors.white};
						}
					}
			  `}
`;
