import styled, { css } from 'styled-components/macro';

interface WrapperProps {
	stacked?: boolean;
}
export const Wrapper = styled.div<WrapperProps>`
	display: flex;
	width: 100%;

	${({ stacked }) =>
		stacked &&
		css`
			flex-direction: column;
		`}
`;

export const Row = styled.div`
	display: flex;
`;

export const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
`;
