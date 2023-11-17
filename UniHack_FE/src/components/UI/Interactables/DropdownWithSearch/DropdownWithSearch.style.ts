import styled from 'styled-components/macro';

import { Shadows } from 'environment';

export const Menu = styled.div`
	width: 100%;
	background-color: white;
	border-radius: 0.4rem;
	box-shadow: ${Shadows.normal};
	margin-top: 0.2rem;
	position: absolute;
	z-index: 5;
`;

export const Container = styled.div`
	position: relative;
`;
