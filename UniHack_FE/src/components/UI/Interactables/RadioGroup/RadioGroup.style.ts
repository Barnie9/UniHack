import styled, { css } from 'styled-components/macro';

import { RadioButton as DefaultRadioButton } from 'components/UI/Interactables/RadioButton';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	/* show tooltip on hover */
	:hover .tooltip__icon {
		visibility: visible;
	}

	/* fix radio group spacing */
	.radio-group-button > :first-child {
		padding-left: 0;
	}
`;

interface AlignmentProps {
	isVertical?: boolean;
}
export const Alignment = styled.div<AlignmentProps>`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;

	${({ isVertical }) =>
		isVertical &&
		css`
			flex-direction: column;

			/* ADD GAP BETWEEN RADIO BUTTONS */
			> div {
				margin-bottom: 0.8rem;
			}
		`};
`;

export const RadioButton = styled(DefaultRadioButton)`
	width: auto;
	max-width: 100%;
	margin-right: 2.4rem;
`;

export const Wrapper = styled.div`
	display: flex;
	max-width: 100%;
`;
