import styled from 'styled-components/macro';

import { ColorsX } from 'environment';

import { Disabled, disableableComponent } from 'helpers';

export const Container = styled.div<Disabled>`
	width: 100%;
	background: ${ColorsX.white};

	${({ disabled }) => disableableComponent({ disabled })}
`;

interface ItemsContainerProps {
	maxHeight?: number;
}
export const ItemsContainer = styled.div<ItemsContainerProps>`
	overflow-y: auto;
	max-height: ${({ maxHeight }) => (maxHeight !== undefined ? maxHeight : '24')}rem;
`;
