import styled, { css } from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import { ColorsX } from 'environment';

export const Label = styled(NavLink)`
	display: flex;
	align-items: center;
	min-width: 12rem;
	min-height: 4rem;
	text-decoration: none;
	font-size: 1.4rem;
	line-height: 1.57;
	font-weight: 400;
`;

interface Props {
	active?: boolean;
	vertical?: boolean;
}

export const Container = styled.div<Props>`
	display: flex;
	align-items: center;
	${({ vertical }) =>
		vertical
			? css`
					justify-content: flex-start;
					padding-left: 2.6rem;
			  `
			: css`
					justify-content: center;
			  `};
	position: relative;
	cursor: pointer;
	& ${Label} {
		${({ vertical }) =>
			vertical
				? css`
						justify-content: flex-start;
				  `
				: css`
						justify-content: center;
				  `};
		color: ${({ active }) =>
			active
				? css`
						${ColorsX.primary.normal}
				  `
				: css`
						${ColorsX.text.main}
				  `};
	}

	&::after {
		content: '';
		display: block;
		position: absolute;
		border-radius: 4px;
		${({ vertical, active }) =>
			vertical
				? css`
						width: 4px;
						height: 100%;
						left: -2px;
						bottom: 0;
						top: 0;
						${active
							? css`
									background: linear-gradient(
										to left,
										${ColorsX.primary.normal} 0%,
										${ColorsX.primary.normal} 49.99%,
										transparent 50%,
										transparent 100%
									);
							  `
							: css`
									background: unset;
							  `}
				  `
				: css`
						width: 100%;
						max-width: 4.8rem;
						height: 4px;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						${active
							? css`
									background: linear-gradient(
										to top,
										${ColorsX.primary.normal} 0%,
										${ColorsX.primary.normal} 49.99%,
										transparent 50%,
										transparent 100%
									);
							  `
							: css`
									background: unset;
							  `}
				  `};
	}
`;
