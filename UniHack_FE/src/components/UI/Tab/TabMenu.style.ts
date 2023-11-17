import styled, { css } from 'styled-components/macro';

interface Props {
	vertical?: boolean;
}

export const Container = styled.div<Props>`
	display: flex;
	flex-direction: ${({ vertical }) => (vertical ? css`column` : css`row`)};
`;
