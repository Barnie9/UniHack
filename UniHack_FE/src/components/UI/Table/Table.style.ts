import styled, { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';
import { ColorsX } from 'environment';

import { TableProps } from './Table';

export const Table = styled.table<TableProps>`
	${({
		noDesign,
		hoverEffect,
		fullWidth,
		width,
		minWidth,
		maxWidth,
		stickyHead,
		paddingX,
		paddingY
	}) => css`
		${noDesign &&
		css`
			/* HANDLE THEAD COLUMN SPACING WITHOUT BORDERS */
			thead tr th {
				padding: 1.3rem 1.6rem 0.6rem 0.8rem;
			}
		`}

		${!noDesign &&
		css`
			/* TABLE OUTLINE BORDER - SQUARE */
			border: 0.1rem solid ${ColorsX.background.disabled};
			/* HIDE BORDER TOP FOR STICKY HEADER BEHAVIOUR */
			border-top: none;

			/* SET THEAD COLUMN BORDER TOP FOR STICKY HEADER BEHAVIOUR */
			thead tr th {
				border-top: 0.1rem solid ${ColorsX.background.disabled};
				border-bottom: 0.1rem solid ${ColorsX.background.disabled};
			}

			/* CELL BORDER */
			tr td:not(:last-child),
			tr th:not(:last-child) {
				border-right: 0.1rem solid ${ColorsX.background.disabled};
			}

			/* APPLY STRIPES  */
			tbody tr:nth-child(odd) {
				background-color: ${ColorsX.background.disabled};
			}

			/* TABLE BODY ROW HOVER EFFECT */
			${hoverEffect &&
			css`
				tbody tr:hover {
					background-color: ${ColorsX.primary.disabled};

					td:not(:last-child) {
						border-right: 0.1rem solid ${ColorsX.primary.disabled};
					}
				}
			`}

			/* HANDLE THEAD COLUMN SPACING WITH BORDERS */
				thead tr th {
				padding: 1.2rem 1.6rem 0.6rem 0.8rem;
			}
		`}

		${fullWidth &&
		css`
			width: 100%;
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
		${stickyHead &&
		css`
			thead th {
				background-color: white;
				position: sticky;
				top: 0;
			}
		`}
		${paddingX &&
		css`
			padding: 0 ${paddingX}rem;
		`}
		${paddingY &&
		css`
			padding: ${paddingY}rem 0;
		`}
	`}
`;

export const Head = styled.thead``;
export const Body = styled.tbody``;

interface RowProps {
	css?: string;
	clickable?: boolean;
	active?: boolean;
	hasError?: boolean;
	disabled?: boolean;
}
export const Row = styled.tr<RowProps>`
	${({ clickable }) =>
		clickable &&
		css`
			cursor: pointer;
		`}

	${({ hasError }) =>
		hasError &&
		css`
			/* ColorsX.text.error, 10% */
			background-color: rgba(255, 88, 93, 0.1) !important;
		`}	
		${({ active }) =>
		active &&
		css`
			background-color: ${ColorsX.primary.disabled} !important;

			td:not(:last-child) {
				border-right: 0.1rem solid ${ColorsX.primary.disabled} !important;
			}
		`}
		${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
			opacity: 0.6;
		`}	

	/* CUSTOM CSS */
	${({ css: _css }) => _css}
`;

interface CellProps {
	textCenter?: boolean;
	textRight?: boolean;
	bold?: boolean;
	width?: number;
	height?: number;
	minWidth?: number;
	maxWidth?: number;
	noWrap?: boolean;
	alignTop?: boolean;
	alignMiddle?: boolean;
	alignBottom?: boolean;
	paddingLeft?: number;
	paddingRight?: number;
	opacity?: number;
	color?: string;
}

export const Cell = styled.td<CellProps>`
	${({
		textCenter,
		textRight,
		bold,
		width,
		height,
		minWidth,
		maxWidth,
		noWrap,
		alignTop,
		alignMiddle,
		alignBottom,
		paddingLeft,
		paddingRight,
		opacity,
		color
	}) => css`
		/* TYPOGRAPHY SETTER */
		${getTypographyCSS(t => t.Paragraph)}

		padding: 0.6rem 0.8rem;

		${bold &&
		css`
			font-weight: bold;
		`}

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
		${height &&
		css`
			height: ${height}rem;
		`}
		${minWidth &&
		css`
			min-width: ${minWidth}rem;
		`}
		${maxWidth &&
		css`
			max-width: ${maxWidth}rem;
		`}
		${noWrap &&
		css`
			overflow-x: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		`}
		${alignTop &&
		css`
			vertical-align: top;
		`}
		${alignMiddle &&
		css`
			vertical-align: middle;
		`}
		${alignBottom &&
		css`
			vertical-align: bottom;
		`}
		${paddingLeft !== undefined &&
		css`
			padding-left: ${paddingLeft}rem;
		`}
		${paddingRight !== undefined &&
		css`
			padding-right: ${paddingRight}rem;
		`}
		${opacity &&
		css`
			opacity: ${opacity};
		`}
		${color &&
		css`
			color: ${color};
		`}
	`}
`;

interface ResponsiveContainerProps {
	noDesign?: boolean;
	fullWidth?: boolean;
	fullHeight?: boolean;
	disableScroll?: boolean;
}

export const ResponsiveContainer = styled.div<ResponsiveContainerProps>`
	overflow: auto;
	overflow-x: ${({ disableScroll }) => (disableScroll ? `hidden` : `auto`)};

	${({ noDesign }) =>
		!noDesign &&
		css`
			/* 
				CANCEL TABLE BORDER TO SET OVERFLOW WRAPPER BORDER 
				=> HORIZONTAL BORDER NOT VISIBLE WHEN SCROLLED 
			*/
			table {
				border: none;
			}

			/* TABLE OUTLINE BORDER - SQUARE */
			border: 0.1rem solid ${ColorsX.background.disabled};
			/* HIDE BORDER TOP FOR STICKY HEADER BEHAVIOUR */
			border-top: none;
		`}

	${({ fullHeight }) =>
		fullHeight &&
		css`
			height: 100%;
		`}

	${({ fullWidth = true }) =>
		fullWidth
			? css`
					width: 100%;
			  `
			: css`
					max-width: 100%;
					width: fit-content;
			  `}
`;
