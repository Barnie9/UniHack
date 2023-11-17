import styled, { css } from 'styled-components/macro';
import { animated } from 'react-spring';

import { Colors, ColorsX, MediaQueries } from 'environment';

const StyledDrawerContainer = styled.div`
	position: relative;
	width: 37.1rem;
	top: 0;
	height: 100%;
	right: 1rem;
	background-color: ${Colors.white};
	overflow: auto;
	display: flex;
	flex-direction: column;

	@media ${MediaQueries.maxWidth.sm} {
		width: 100%;
		margin-left: 2rem;
	}
`;

export const DrawerContainer = animated(StyledDrawerContainer);

export const TopBar = styled.div`
	height: 2.8rem;
	width: 100%;
	background: ${ColorsX.white};
	display: flex;
	align-items: center;
	padding: 0 2.4rem;
	flex-direction: row;
	z-index: 10;
	justify-content: space-between;
`;

export const LeftTopSection = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const BarIcon = styled.div<{ visible: boolean }>`
	cursor: pointer;
	line-height: 0;
	width: 0;
	opacity: 0;
	font-size: 1.6rem;
	color: ${Colors.gray.medium};
	visibility: hidden;
	transition: 0.2s;

	${({ visible }) =>
		visible &&
		css`
			width: 1.6rem;
			margin-right: 1.6rem;
			opacity: 1;
			visibility: visible;
		`}
`;

export const ChildrenContainer = styled.div`
	position: relative;
	flex: 1;
`;
