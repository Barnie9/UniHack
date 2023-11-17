import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { getTypographyCSS } from '../Typography';
import { StyledProps } from './Column';

export const ColumnComponent = styled.th<StyledProps>`
	${({
		css: _css,
		textCenter,
		textRight,
		empty,
		width,
		minWidth,
		maxWidth,
		height,
		noWrap,
		paddingLeft,
		paddingRight,
		clickable
	}) => css`
		/* TYPOGRAPHY SETTER */
		${getTypographyCSS(t => t.Caption)}
		color: ${ColorsX.primary.normal};

		text-align: start;

		${textCenter &&
		css`
			text-align: center;
		`}
		${textRight &&
		css`
			text-align: right;
		`}
		${width &&
		css`
			width: ${width}rem;
		`}
		${maxWidth &&
		css`
			max-width: ${maxWidth}rem;
		`}
		${minWidth &&
		css`
			min-width: ${minWidth}rem;
		`}
		${height &&
		css`
			height: ${height}rem;
		`}
		${empty &&
		css`
			height: ${height ? height : 4}rem;
		`}
		${noWrap &&
		css`
			overflow-x: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		`}
		${paddingLeft !== undefined &&
		css`
			padding-left: ${paddingLeft}rem;
		`}
		${paddingRight !== undefined &&
		css`
			padding-right: ${paddingRight}rem;
		`}

		${clickable &&
		css`
			cursor: pointer;
		`}

		:hover .column-filter {
			visibility: visible;
		}

		/* CUSTOM CSS */
		${_css}
	`}
`;

interface FilterWrapperProps {
	visible?: boolean;
}

export const FilterWrapper = styled.div<FilterWrapperProps>`
	padding: 0;
	width: auto;
	display: flex;
	margin-left: auto;
	visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
