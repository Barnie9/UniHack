import styled, { css } from 'styled-components/macro';

export * from 'components/UI/Interactables/RadioGroup/RadioGroup.style';

interface AlignmentProps {
	isVertical?: boolean;
}

export const Alignment = styled.div<AlignmentProps>`
	display: flex;
	flex-wrap: wrap;
	min-height: 4.4rem;
	align-items: center;

	${({ isVertical }) =>
		isVertical &&
		css`
			flex-direction: column;
			align-items: flex-start;

			/* ADD GAP BETWEEN CHECKBOX BUTTONS */
			> div {
				margin-bottom: 0.8rem;
			}
		`};
`;
