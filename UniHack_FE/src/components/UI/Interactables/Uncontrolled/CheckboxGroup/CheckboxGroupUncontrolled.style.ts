import styled, { css } from 'styled-components/macro';

import { CheckboxUncontrolled as DefaultCheckboxUncontrolled } from 'components/UI/Interactables/Uncontrolled/Checkbox';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	/* show tooltip on hover */
	:hover .tooltip__icon {
		visibility: visible;
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

			> div {
				margin-bottom: 0.8rem;
			}
		`};
`;

export const CheckboxUncontrolled = styled(DefaultCheckboxUncontrolled)`
	width: auto;
	max-width: 100%;
	margin-right: 2.4rem;
`;

export const Wrapper = styled.div`
	display: flex;
	max-width: 100%;
`;

export const NewValueWrapper = styled.div`
	display: flex;
	max-width: 22rem;
	align-items: flex-start;
`;
