import styled, { css } from 'styled-components/macro';

import { ColorsX, MediaQueries } from 'environment';
import { Typography } from '../Typography';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	@media ${MediaQueries.maxWidth.md} {
		flex-direction: column-reverse;
	}
`;

export const PageSizeAndCounts = styled.div`
	display: flex;
	align-items: center;

	@media ${MediaQueries.maxWidth.md} {
		margin-top: 1rem;
	}
`;
export const PageSize = styled.div`
	display: flex;
	align-items: center;
`;

export const Wrapper = styled.div`
	margin: 0 0.8rem;
`;

export const Counts = styled.div`
	display: flex;
	min-width: 12rem;
`;

export const Controls = styled.div`
	display: flex;
	align-items: center;

	> div:not(:last-child) {
		margin-right: 0.4rem;
		width: unset;
	}
`;

export const Caption = styled(Typography.Caption)`
	padding: 0 1rem;
	font-weight: 500;
	color: ${ColorsX.text.main};
`;

interface ControlProps {
	active?: boolean;
	disabled?: boolean;
}

export const Control = styled.div<ControlProps>`
	display: flex;
	align-items: center;
	min-width: 2.4rem;
	min-height: 2.4rem;
	border-radius: 1.2rem;
	user-select: none;

	${({ active, disabled }) => {
		if (active) {
			return css`
				background-color: ${ColorsX.primary.disabled};

				${Caption} {
					color: ${ColorsX.primary.normal};
				}
			`;
		}

		if (!active && !disabled) {
			return css`
				cursor: pointer;

				:hover {
					background-color: ${ColorsX.background.disabled};
				}
			`;
		}
	}}
`;
