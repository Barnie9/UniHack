import styled from 'styled-components/macro';
import { LayoutFlexProps } from 'types';

export interface FormStyleProps extends LayoutFlexProps {
	maxWidth?: string | number;
	width?: string | number;
}

export const _Form = styled.form<FormStyleProps>`
	display: flex;
	flex-direction: column;
	flex: ${({ flex }) => flex};
	justify-content: ${({ justify = 'space-between' }) => justify};
	align-items: ${({ align = 'stretch' }) => align};
	max-width: ${({ maxWidth }) =>
		maxWidth ? (typeof maxWidth === 'string' ? maxWidth : `${maxWidth}rem`) : undefined};
	width: ${({ width = '100%' }) => (typeof width === 'string' ? width : `${width}rem`)};
`;

interface OptionalFieldProps {
	visible: boolean;
	height?: string | number;
}

export const OptionalField = styled.div<OptionalFieldProps>`
	display: flex;
	justify-content: center;
	height: ${({ visible, height }) =>
		visible ? (height ? (typeof height === 'string' ? height : `${height}rem`) : '12rem') : 0};
	opacity: ${({ visible }) => (visible ? 1 : 0)};
	transition: opacity 0.2s ease-in-out, height 0.2s ease-in-out;
	width: 100%;
	z-index: ${({ visible }) => (visible ? 'auto' : -1)};

	& > div {
		width: 100%;
	}
`;
