import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';

interface ContainerProps {
	stickyTop?: boolean;
}
export const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: flex-start;
	justify-content: center;

	width: 100%;
	min-height: 4.8rem;
	padding: 1.2rem 1.6rem;

	background: ${ColorsX.pale};

	z-index: 1000;

	${({ stickyTop }) =>
		stickyTop &&
		css`
			position: sticky;
			top: 0;
		`}
`;
