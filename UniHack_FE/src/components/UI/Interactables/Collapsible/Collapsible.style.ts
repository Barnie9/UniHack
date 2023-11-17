import styled from 'styled-components/macro';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1rem 0;
	border-radius: 0.4rem;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	align-self: flex-start;
	cursor: pointer;
	width: 100%;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 1rem;
	padding-left: 1rem;
`;
