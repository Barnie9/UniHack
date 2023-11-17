import styled, { css } from 'styled-components/macro';

import { Colors, MediaQueries } from 'environment';

interface FooterProps {
	shadow: boolean;
	marginTop: number;
}

export const Footer = styled.div<FooterProps>`
	display: flex;
	justify-content: center;
	min-height: 8rem;
	margin-top: ${({ marginTop }) => marginTop}px;
	align-items: center;
	position: sticky;
	width: 100%;
	padding: 2rem;
	z-index: 999;
	bottom: 0;
	background: ${Colors.white};
	transition: box-shadow 0.05s;

	${({ shadow }) =>
		shadow &&
		css`
			box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);
			z-index: 1001;
		`};

	@media ${MediaQueries.maxWidth.sm} {
		padding: 1rem;
		width: 100%;
	}

	@media ${MediaQueries.maxHeight.sm} {
		padding: 1rem;
	}

	@media print {
		display: none;
	}
`;

export const IntersectRefDiv = styled.div`
	width: 100%;
	height: 1px;
	margin-bottom: 0.2rem;
	opacity: 0;

	@media print {
		display: none;
	}
`;

interface ContainerProps {
	maxWidth: number;
}

export const Container = styled.div<ContainerProps>`
	width: 100%;
	max-width: ${({ maxWidth }) => maxWidth}rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	@media ${MediaQueries.maxWidth.sm} {
		flex-direction: column;

		button {
			margin: 0.5rem 0rem;
			font-size: 1.4rem;
		}
	}
`;

interface GroupProps {
	alignLeft: boolean;
}

export const Group = styled.div<GroupProps>`
	flex: 1;
	display: flex;
	justify-content: ${({ alignLeft }) => (alignLeft ? `flex-start` : `flex-end`)};

	@media ${MediaQueries.maxWidth.sm} {
		flex-direction: column;
		width: 100%;

		button {
			margin: 0.5rem 0rem;
		}
	}
`;
