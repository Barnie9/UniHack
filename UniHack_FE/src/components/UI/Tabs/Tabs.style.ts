import styled, { css } from 'styled-components/macro';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

interface ItemProps {
	maxWidth?: number;
}
export const Items = styled.div<ItemProps>`
	display: flex;
	width: 100%;
	user-select: none;

	${({ maxWidth }) =>
		maxWidth &&
		css`
			max-width: ${maxWidth}rem;
		`}

	&& .tabs__navigation__item {
		padding: 0.9rem 0;

		::after {
			width: 11.2rem;
		}
	}
`;
