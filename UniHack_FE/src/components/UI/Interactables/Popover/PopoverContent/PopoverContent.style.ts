import styled from 'styled-components/macro';

import { Colors, Shadows } from 'environment';
import { Bounds } from 'types';

interface Props {
	bounds?: Bounds;
	width?: number;
}

export const Container = styled.div<Props>`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: ${({ width }) => (width ? `${width}rem` : 'auto')};
	padding: 1.5rem;
	border-radius: 0.4rem;
	background-color: ${Colors.white};
	z-index: 999;
	box-shadow: ${Shadows.normal};
`;
