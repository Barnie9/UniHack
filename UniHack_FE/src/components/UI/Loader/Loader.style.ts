import styled, { css } from 'styled-components/macro';

import { generateSpacingOffsets } from 'helpers';
import { SpacingOffsets } from 'types';

interface WrapperProps extends SpacingOffsets {
	center?: boolean;
}
export const Wrapper = styled.div<WrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	${({ center }) =>
		center &&
		css`
			width: 100%;
			height: 100%;
		`}

	/* SPACING OFFSETS */
	${({ marginOffset, paddingOffset }) => css`
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;

interface ContainerProps {
	offset?: number;
}
export const Container = styled.div<ContainerProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: ${({ offset = 0 }) => `calc(100vh - ${offset}rem)`};
`;

export const PageLoader = styled.div`
	height: 10rem;
	width: 10rem;
`;

interface BasicLoaderProps {
	size?: number;
}
export const BasicLoader = styled.div<BasicLoaderProps>`
	width: ${({ size }) => `${size}rem`};
	height: ${({ size }) => `${size}rem`};
`;
