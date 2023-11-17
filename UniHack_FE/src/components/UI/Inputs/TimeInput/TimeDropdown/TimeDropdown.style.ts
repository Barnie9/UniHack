import styled from 'styled-components/macro';

import { ColorsX, Shadows } from 'environment';
import { getTypographyCSS } from 'components/UI/Typography';

interface WrapperProps {
	small?: boolean;
	openUpwards?: boolean;
}
export const Wrapper = styled.div<WrapperProps>`
	position: absolute;
	top: ${({ small }) => (small ? 2.66 : 4.2)}rem;
	left: 0;
	width: 9.6rem;
	height: 22.9rem;
	padding: 0.8rem 0.8rem 1.1rem;
	overflow: hidden;
	border-radius: 0.4rem;
	box-shadow: ${Shadows.hover};
	background-color: ${ColorsX.white};
	z-index: 1;

	${({ openUpwards }) => openUpwards && 'top: -23.5rem;'}
`;

export const Column = styled.div`
	display: inline-block;
	width: 4rem;
	height: 22.9rem;
	overflow-y: auto;
	padding-bottom: 0.8rem;

	::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: Make scrollbar invisible */
	}
`;

interface ButtonProps {
	active: boolean;
}
export const Button = styled.div<ButtonProps>`
	${getTypographyCSS(t => t.Paragraph)}

	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.4rem;
	width: 3.6rem;
	height: 3rem;
	text-align: center;
	color: ${props => (props.active ? ColorsX.background.disabled : ColorsX.text.main)};
	background-color: ${props => (props.active ? ColorsX.primary.normal : ColorsX.white)};

	:hover {
		border: solid 0.1rem ${ColorsX.primary.normal};
		cursor: pointer;
		margin: 0;
	}
`;
