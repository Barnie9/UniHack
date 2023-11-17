import styled, { css } from 'styled-components/macro';

import { ColorsX, ScrollBarStyle, Shadows } from 'environment';
import { Bounds } from 'types';

interface Props {
	bounds?: Bounds;
	width?: number;
	maxHeight?: number;
	detached?: boolean;
}

export const RegularMenu = styled.div<Props>`
	position: absolute;
	min-width: fit-content;
	max-width: ${({ width }) => (width ? `${width}rem` : 'auto')};
	width: ${({ width }) => (width ? `${width}rem` : 'auto')};
	border-radius: 0.4rem;
	margin-bottom: 2rem;
	padding: 0.8rem 0;
	background-color: ${ColorsX.white};
	box-shadow: ${Shadows.hover};
	z-index: 999;

	${({ maxHeight }) =>
		maxHeight !== undefined &&
		css`
			max-height: ${maxHeight}px;
			min-height: 5rem;
			overflow-y: auto;
			overflow-y: overlay;

			${ScrollBarStyle}
		`}
`;

export const ButtonMenu = styled.div<Props>`
	top: ${({ bounds }) => `calc(${bounds && bounds.height ? bounds.height + 2 : 0}px)`};
	position: absolute;
	left: 0;
	width: 100%;
	border-radius: 0.4rem;
	margin-bottom: 2rem;
	padding: 0.8rem 0;
	background-color: ${ColorsX.white};
	box-shadow: ${Shadows.hover};
	z-index: 999;

	${({ maxHeight }) =>
		maxHeight !== undefined &&
		css`
			max-height: ${maxHeight}px;
			min-height: 5rem;
			overflow-y: auto;
			overflow-y: overlay;

			${ScrollBarStyle}
		`}
`;
