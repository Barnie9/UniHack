import styled from 'styled-components/macro';

import { Input as DefaultIpnut } from 'components/UI/Inputs/Input';

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const Input = styled(DefaultIpnut)`
	margin-right: 1rem;
	padding-top: 0.5rem;
`;
